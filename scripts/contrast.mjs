import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { root } from './project.mjs';
export function luminance(hex) {
  const values=hex.replace('#','').match(/../g).map(x=>parseInt(x,16)/255).map(x=>x<=0.04045?x/12.92:((x+0.055)/1.055)**2.4);
  return values[0]*0.2126+values[1]*0.7152+values[2]*0.0722;
}
export function ratio(a,b){const x=luminance(a),y=luminance(b);return (Math.max(x,y)+0.05)/(Math.min(x,y)+0.05);}
if(process.argv[1] && path.resolve(process.argv[1])===fileURLToPath(import.meta.url)) {
  const css=fs.readFileSync(path.join(root,'packages/design/tokens.css'),'utf8');
  const colors=Object.fromEntries([...css.matchAll(/--color-([a-z]+):\s*(#[\da-f]{6})/gi)].map(m=>[m[1],m[2]]));
  const pairs=JSON.parse(fs.readFileSync(path.join(root,'packages/design/contrast.json'),'utf8'));
  let failures=0;
  for(const p of pairs){
    if(!colors[p.foreground] || !colors[p.background]) throw new Error('Unknown color token');
    const value=ratio(colors[p.foreground],colors[p.background]);
    console.log(`${p.foreground}/${p.background}: ${value.toFixed(2)}:1 (minimum ${p.minimum})`);
    if(value<p.minimum) failures++;
  }
  if(failures) process.exitCode=1;
}
