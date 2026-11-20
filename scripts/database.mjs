import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const cli = path.join(root, 'node_modules/supabase/dist/supabase.js');
const [action, ...extra] = process.argv.slice(2);
const commands = {
  start: ['start'],
  stop: ['stop'],
  reset: ['db', 'reset', '--local', '--yes'],
};

// Fixed commands deliberately expose no remote URL, linked project or extra flags.
if (extra.length || (!Object.hasOwn(commands, action ?? '') && action !== 'verify')) {
  console.error('Usage: node scripts/database.mjs start|stop|reset|verify (local only; no extra arguments)');
  process.exit(1);
}

function redact(value) {
  return value
    .replace(/^.*(?:JWT_SECRET|SERVICE_ROLE_KEY|ANON_KEY|PUBLISHABLE_KEY|SECRET_KEY|DB_URL).*$/gmi, '[credential line redacted]')
    .replace(/postgres(?:ql)?:\/\/[^\s"']+/gi, '[database connection redacted]')
    .replace(/eyJ[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+/g, '[JWT redacted]')
    .replace(/sb_(?:secret|publishable)_[A-Za-z0-9_-]+/g, '[API key redacted]');
}

function run(args, { quiet = false } = {}) {
  console.log(`Local Supabase: ${args.join(' ')}`);
  const result = spawnSync(process.execPath, [cli, ...args], {
    cwd: root,
    env: {
      ...process.env,
      SUPABASE_HOME: path.join(root, 'supabase/.temp/cli'),
      SUPABASE_TELEMETRY_DISABLED: 'true',
    },
    encoding: 'utf8',
    timeout: 15 * 60 * 1000,
    maxBuffer: 20 * 1024 * 1024,
  });
  if (result.error || result.status !== 0) {
    throw new Error(redact(result.error?.message ?? `${result.stderr}\n${result.stdout}`).slice(-8000));
  }
  if (!quiet && result.stdout) process.stdout.write(redact(result.stdout));
  return result.stdout;
}

async function checkAnonymousApi() {
  const status = JSON.parse(run(['status', '--output', 'json'], { quiet: true }));
  const origin = new URL(status.API_URL);
  assert.ok(['127.0.0.1', 'localhost'].includes(origin.hostname), 'The database smoke must target loopback');
  assert.equal(origin.port, '56321', 'The database smoke must target the Juvanga local port');
  assert.ok(typeof status.ANON_KEY === 'string' && status.ANON_KEY.length > 10, 'Local anonymous API key is available');
  const response = await fetch(new URL('/rest/v1/profiles?select=user_id', origin), {
    headers: { apikey: status.ANON_KEY, Authorization: `Bearer ${status.ANON_KEY}`, 'Accept-Profile': 'app' },
    redirect: 'error',
    signal: AbortSignal.timeout(15_000),
  });
  assert.ok([401, 403].includes(response.status), `Anonymous profile access must be denied (received ${response.status})`);
  const body = await response.json();
  assert.equal(body.code, '42501', 'The request reached PostgreSQL and was denied by privileges');
  console.log('Anonymous Data API access: denied by PostgreSQL.');
}

try {
  if (action === 'verify') {
    for (let pass = 1; pass <= 2; pass += 1) {
      console.log(`Disposable local reset and permission check ${pass}/2`);
      run(commands.reset, { quiet: true });
      // The non-idempotent CREATE statements would fail if history replayed them.
      run(['migration', 'up', '--local']);
      run(['test', 'db', '--local']);
      await checkAnonymousApi();
    }
    console.log('Local database reset, migration history, SQL permissions and anonymous API checks passed.');
  } else {
    run(commands[action], { quiet: true });
    console.log(`Local database ${action} completed. No hosted project was changed.`);
  }
} catch (error) {
  console.error(redact(error.message));
  process.exitCode = 1;
}
