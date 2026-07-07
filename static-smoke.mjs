import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
const root=new URL('./',import.meta.url).pathname;
for (const p of ['index.html','assets/provoware-core.css','assets/provoware-core.js','modules/_registry.js','modules/modules.manifest.json','start_linux.sh']) readFileSync(join(root,p),'utf8');
const reg=readFileSync(join(root,'modules/_registry.js'),'utf8');
for (const id of ['songwriter','generator','todo','export']) if(!reg.includes(id)) throw new Error('Modul fehlt: '+id);
for (const f of readdirSync(join(root,'daten/defaults'))) if(f.endsWith('.json')) JSON.parse(readFileSync(join(root,'daten/defaults',f),'utf8'));
console.log('STATIC_SMOKE_PASS');
