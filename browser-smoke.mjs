import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import vm from 'node:vm';
const root=new URL('./',import.meta.url).pathname;
const code=readFileSync(join(root,'assets/provoware-core.js'),'utf8')+String.fromCharCode(10)+readFileSync(join(root,'modules/_registry.js'),'utf8');
const context={console,window:{},document:{},localStorage:{m:new Map(),failOnce:null,get length(){return this.m.size},key(i){return [...this.m.keys()][i]??null},setItem(k,v){if(this.failOnce===k){this.failOnce=null;throw Error('QuotaExceededError')}this.m.set(k,String(v))},getItem(k){return this.m.get(k)??null},removeItem(k){this.m.delete(k)}},navigator:{clipboard:{writeText(){}}},history:{replaceState(){}},location:{hash:''},setTimeout,clearTimeout,Blob,URL};
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

const storage=context.localStorage, notesKey=prefix+'notes', themeKey=prefix+'theme';
const backupKey=prefix+'backup.beforeImport', extraKey=prefix+'new-from-import';
const baseline=[storage.getItem(notesKey),storage.getItem(themeKey),storage.getItem(backupKey)];
const exported=context.PV.Exporter.all();
if(!exported.store[notesKey]||backupKey in exported.store)throw Error('Export enthält keine Nutzdaten oder rekursive Sicherung');
context.PV.Exporter.importText(JSON.stringify({store:{[notesKey]:[{id:'updated'}],[extraKey]:{value:1}}}));
if(!storage.getItem(extraKey))throw Error('Import eines neuen Schlüssels fehlgeschlagen');
context.PV.Exporter.restoreBackup();
if(storage.getItem(extraKey)!==null||storage.getItem(notesKey)!==baseline[0])throw Error('Wiederherstellung hat zusätzliche Daten nicht entfernt');
storage.failOnce=themeKey;
let quotaRejected=false;
try{context.PV.Exporter.importText(JSON.stringify({store:{[notesKey]:[{id:'broken'}],[themeKey]:'contrast'}}))}catch(e){quotaRejected=/wiederhergestellt/.test(e.message)}
if(!quotaRejected||storage.getItem(notesKey)!==baseline[0]||storage.getItem(themeKey)!==baseline[1])throw Error('Teilfehler hat Daten verändert');
const beforeBackupFailure=[storage.getItem(notesKey),storage.getItem(backupKey)];
storage.failOnce=backupKey;
let backupRejected=false;
try{context.PV.Exporter.importText(JSON.stringify({store:{[notesKey]:[]}}))}catch(e){backupRejected=/Sicherung/.test(e.message)}
if(!backupRejected||storage.getItem(notesKey)!==beforeBackupFailure[0]||storage.getItem(backupKey)!==beforeBackupFailure[1])throw Error('Import ohne Sicherung nicht gestoppt');
context.PV.Exporter.importText(JSON.stringify({store:{[notesKey]:[{id:'legacy'}],[backupKey]:{store:{}}}}));
if(context.PV.Data.all('notes')[0]?.id!=='legacy')throw Error('Alt-Export mit internem Sicherungsschlüssel abgewiesen');
console.log('BROWSER_SMOKE_PASS');
