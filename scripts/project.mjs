import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
export const load = () => JSON.parse(fs.readFileSync(path.join(root, 'docs/backlog/backlog.json'), 'utf8'));
const states = new Set(['todo', 'in_progress', 'in_review', 'done', 'blocked']);
export function validate(data, checkFiles = true) {
  const errors = [];
  const tasks = data.tasks ?? [];
  const ids = new Map();
  for (const t of tasks) {
    if (!/^JUV-\d{3}$/.test(t.id)) errors.push(`Invalid ID: ${t.id}`);
    if (ids.has(t.id)) errors.push(`Duplicate: ${t.id}`);
    ids.set(t.id, t);
    if (!data.milestones.includes(t.milestone)) errors.push(`${t.id}: unknown milestone`);
    if (!states.has(t.status)) errors.push(`${t.id}: unknown status`);
    for (const key of ['title', 'epic', 'role', 'updated_at']) if (!t[key]) errors.push(`${t.id}: missing ${key}`);
    for (const key of ['steps', 'acceptance', 'verification', 'references']) if (!Array.isArray(t[key]) || !t[key].length || t[key].some(v => typeof v !== 'string' || !v.trim())) errors.push(`${t.id}: empty ${key}`);
    if (!Array.isArray(t.depends_on)) errors.push(`${t.id}: missing dependencies`);
    if (!Array.isArray(t.estimate_days) || t.estimate_days.length !== 2 || t.estimate_days.some(v => !Number.isFinite(v) || v < 0) || t.estimate_days[0] > t.estimate_days[1]) errors.push(`${t.id}: invalid estimate`);
    if (t.status === 'done' && !t.evidence?.length) errors.push(`${t.id}: done without evidence`);
    if (['in_progress', 'in_review'].includes(t.status) && (!t.owner || !t.branch)) errors.push(`${t.id}: active work without owner/branch`);
    if (t.status === 'blocked' && !t.blocker) errors.push(`${t.id}: unexplained blocker`);
    if (checkFiles) for (const ref of t.references ?? []) if (!fs.existsSync(path.join(root, ref))) errors.push(`${t.id}: missing reference ${ref}`);
  }
  for (const t of tasks) for (const id of t.depends_on ?? []) {
    const dep = ids.get(id);
    if (!dep) errors.push(`${t.id}: unknown dependency ${id}`);
    else {
      if (data.milestones.indexOf(dep.milestone) > data.milestones.indexOf(t.milestone)) errors.push(`${t.id}: dependency in a future milestone ${id}`);
      if (['in_progress', 'in_review', 'done'].includes(t.status) && dep.status !== 'done') errors.push(`${t.id}: incomplete dependency ${id}`);
    }
  }
  const visiting = new Set(), visited = new Set();
  function visit(id) {
    if (visiting.has(id)) { errors.push(`Cycle: ${id}`); return; }
    if (visited.has(id) || !ids.has(id)) return;
    visiting.add(id);
    for (const dep of ids.get(id).depends_on ?? []) visit(dep);
    visiting.delete(id); visited.add(id);
  }
  for (const id of ids.keys()) visit(id);
  for (const req of data.required_requirements ?? []) if (!tasks.some(t => t.requirements?.includes(req))) errors.push(`Uncovered requirement: ${req}`);
  return errors;
}
export function ready(data) {
  const byId = new Map(data.tasks.map(t => [t.id, t]));
  return data.tasks.filter(t => t.status === 'todo' && t.depends_on.every(id => byId.get(id)?.status === 'done'));
}
const esc = value => String(value ?? '').replaceAll('|', '\\|').replaceAll('\n', ' ');
const csv = value => `"${String(value ?? '').replaceAll('"', '""')}"`;
export function renderTask(t, full = false) {
  return `<a id="${t.id.toLowerCase()}"></a>\n\n## ${t.id} — ${t.title}\n\nMilestone **${t.milestone}** · ${t.role} · ${t.estimate_days.join('–')} person-days · status **${t.status}**\n\nDependencies: ${t.depends_on.join(', ') || 'none'}.\n\n### Work\n\n${t.steps.map(x=>`- ${x}`).join('\n')}\n\n### Acceptance criteria\n\n${t.acceptance.map(x=>`- [ ] ${x}`).join('\n')}\n\n### Verification\n\n${t.verification.map(x=>`- ${x}`).join('\n')}\n\nRequirements: ${t.requirements.join(', ') || 'cross-cutting'}.\n\nReferences: ${t.references.map(x=> full ? `[${x}](../../../${x})` : x).join(' ; ')}.\n\nOwner: ${t.owner || 'unassigned'} ; branch: ${t.branch || '—'}.\n\nEvidence: ${t.evidence.join(' ; ') || 'none — task not delivered'}.${t.blocker ? `\n\nBlocker: ${t.blocker}` : ''}\n`;
}
export function generated(data) {
  const out = new Map();
  const epics = [...new Set(data.tasks.map(t=>t.epic))];
  let index = '# Juvanga backlog\n\nGenerated from `backlog.json`. Edit the source, then run `npm run backlog:generate`. Do not edit this view.\n\n';
  index += `${data.tasks.length} tasks. Estimates are indicative person-days, excluding waiting, validation and provider costs. An estimate is not a delivery date.\n\n`;
  index += 'Usage: `npm run next` for ready tasks; `npm run task -- JUV-101` for a ticket. Status and owner are in JSON. `done` requires evidence; an unchecked box in this generated view is a reference criterion, not a second tracker.\n\n';
  index += '| Milestone | Tasks | Total estimated person-days |\n| --- | ---: | ---: |\n';
  for (const m of data.milestones) {
    const ts=data.tasks.filter(t=>t.milestone===m);
    index += `| ${m} | ${ts.length} | ${ts.reduce((s,t)=>s+t.estimate_days[0],0)}–${ts.reduce((s,t)=>s+t.estimate_days[1],0)} |\n`;
  }
  index += '\n## Epics\n\n'+epics.map(e=>`- [${e}](epics/${e}.md)`).join('\n');
  index += '\n\n## Order and dependencies\n\n| Ticket | Milestone | Task | Dependencies | Status |\n| --- | --- | --- | --- | --- |\n';
  for(const t of data.tasks) index += `| [${t.id}](epics/${t.epic}.md#${t.id.toLowerCase()}) | ${t.milestone} | ${esc(t.title)} | ${t.depends_on.join(', ') || '—'} | ${t.status} |\n`;
  index += '\n## Tracking\n\n[Traceability](TRACEABILITY.md) · [Roadmap](../delivery/ROADMAP.md) · [Contribution](../../CONTRIBUTING.md).\n';
  out.set('docs/backlog/README.md',index);
  for(const e of epics) out.set(`docs/backlog/epics/${e}.md`, `# Epic ${e}\n\nGenerated view. Source: ../backlog.json. Indicative estimates; verify criteria before delivery.\n\n`+data.tasks.filter(t=>t.epic===e).map(t=>renderTask(t,true)).join('\n---\n\n'));
  out.set('docs/backlog/backlog.csv',['id,milestone,epic,title,status,role,owner,min_days,max_days,depends_on,acceptance,verification',...data.tasks.map(t=>[t.id,t.milestone,t.epic,t.title,t.status,t.role,t.owner,...t.estimate_days,t.depends_on.join(';'),t.acceptance.join(' | '),t.verification.join(' | ')].map(csv).join(','))].join('\n')+'\n');
  let trace='# Requirements traceability\n\nGenerated view. Numbered V1.3 dossier requirements and user needs dated 2026-11-06. Unnumbered families are detailed in tasks (support, organizations, presentation, notifications, AI and performance). Planning coverage ≠ implemented functionality.\n\n';
  trace+='USR-01 team; USR-02 continuity; USR-03 tokens; USR-04 speed/free release; USR-05 palette; USR-06 logo; USR-07 animations; USR-08 international differentiation.\n\n';
  trace+='| Requirement | Tasks |\n| --- | --- |\n';
  for(const req of data.required_requirements) trace+=`| ${req} | ${data.tasks.filter(t=>t.requirements.includes(req)).map(t=>t.id).join(', ')} |\n`;
  out.set('docs/backlog/TRACEABILITY.md',trace);
  return out;
}
function markdownFiles(dir) {
  return fs.readdirSync(dir,{withFileTypes:true}).flatMap(e=>{
    if (['node_modules','.git','dist','test-results','playwright-report'].includes(e.name)) return [];
    const p=path.join(dir,e.name);
    return e.isDirectory()?markdownFiles(p):e.name.endsWith('.md')?[p]:[];
  });
}
function checkLinks() {
  const errors=[];
  for(const p of markdownFiles(root)) {
    const text=fs.readFileSync(p,'utf8');
    for(const match of text.matchAll(/\[[^\]]*\]\(([^)]+)\)/g)) {
      let ref=match[1].replace(/^<|>$/g,'').split('#')[0];
      if(!ref || /^[a-z]+:/i.test(ref)) continue;
      ref=decodeURIComponent(ref);
      if(!fs.existsSync(path.resolve(path.dirname(p),ref))) errors.push(`${path.relative(root,p)}: broken link ${ref}`);
    }
  }
  return errors;
}
function main() {
  const data=load(); const command=process.argv[2]??'context';
  if(command==='context') {
    process.stdout.write(fs.readFileSync(path.join(root,'docs/STATUS.md'),'utf8'));
    console.log('\nNext ready tasks:');
    for(const t of ready(data).slice(0,6)) console.log(`${t.id} [${t.milestone}] ${t.title}`);
  } else if(command==='next') {
    const scope=process.argv[3];
    for(const t of ready(data).filter(t=>!scope || t.milestone===scope)) console.log(`${t.id} [${t.milestone}] ${t.title} (${t.estimate_days.join('–')} person-days ; ${t.role})`);
  } else if(command==='task') {
    const t=data.tasks.find(t=>t.id===process.argv[3]);
    if(!t) throw new Error('Unknown ticket. Usage: npm run task -- JUV-101');
    console.log(renderTask(t));
  } else if(command==='generate') {
    const errors=validate(data,false); if(errors.length) throw new Error(errors.join('\n'));
    for(const [name,content] of generated(data)){const p=path.join(root,name);fs.mkdirSync(path.dirname(p),{recursive:true});fs.writeFileSync(p,content);}
    console.log(`${data.tasks.length} tickets: Markdown/CSV views and traceability generated.`);
  } else if(command==='check') {
    const errors=[...validate(data),...checkLinks()];
    for(const [name,content] of generated(data)) if(!fs.existsSync(path.join(root,name)) || fs.readFileSync(path.join(root,name),'utf8')!==content) errors.push(`Stale view: ${name}`);
    if(errors.length) throw new Error(errors.join('\n'));
    console.log(`${data.tasks.length} valid tickets, acyclic graph, covered requirements, consistent views and links.`);
  } else throw new Error(`Unknown command: ${command}`);
}
if(process.argv[1] && path.resolve(process.argv[1])===fileURLToPath(import.meta.url)) {
  try{main();}catch(error){console.error(error.message);process.exitCode=1;}
}
