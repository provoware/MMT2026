import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import vm from 'node:vm';
const root=new URL('./',import.meta.url).pathname;
const code=readFileSync(join(root,'assets/provoware-core.js'),'utf8')+String.fromCharCode(10)+readFileSync(join(root,'modules/_registry.js'),'utf8');
const context={console,window:{},document:{},localStorage:{m:new Map(),setItem(k,v){this.m.set(k,v)},getItem(k){return this.m.get(k)||null},removeItem(k){this.m.delete(k)}},navigator:{clipboard:{writeText(){}}},history:{replaceState(){}},location:{hash:''},setTimeout,clearTimeout,Blob,URL};
context.window=context; context.document={getElementById(){return null},querySelectorAll(){return[]},querySelector(){return null},createElement(){return{className:'',dataset:{},style:{},append(){},remove(){},addEventListener(){},querySelector(){return null},querySelectorAll(){return[]}}},addEventListener(){},body:{append(){},className:''}};
vm.createContext(context); vm.runInContext(code,context);
if(!context.PV||!context.PV_REGISTRY?.length) throw new Error('PV runtime fehlt');
if(!context.PV_REGISTRY.find(m=>m.id==='songwriter')) throw new Error('Songwriter fehlt');
context.PV.Data.seed();
if(context.PV.Data.all('genres').length<10) throw new Error('Defaults fehlen');

// Importregression: fremde Speicherschlüssel dürfen weder Daten noch Sicherungen ändern.
const prefix='pv.mmt2026.';
context.PV.Store.set('theme','light');
context.PV.Exporter.importText(JSON.stringify({store:{[prefix+'notes']:[{id:'safe',title:'Behalten'}]}}));
if(context.PV.Data.all('notes')[0]?.id!=='safe') throw new Error('Gültiger Import fehlgeschlagen');
const backupBefore=JSON.stringify(context.PV.Store.get('backup.beforeImport'));
for(const store of [
  {theme:'contrast'},
  {[prefix+'notes']:[],theme:'contrast'},
  ['ungültig'],
  null,
  {[prefix]:'ungültig'}
]){
  let rejected=false;
  try{context.PV.Exporter.importText(JSON.stringify({store}))}catch(e){rejected=true}
  if(!rejected) throw new Error('Ungültiger Import angenommen');
  if(context.PV.Store.get('theme')!=='light'||context.PV.Data.all('notes')[0]?.id!=='safe'||JSON.stringify(context.PV.Store.get('backup.beforeImport'))!==backupBefore) throw new Error('Ungültiger Import hat Daten verändert');
}
console.log('BROWSER_SMOKE_PASS');
