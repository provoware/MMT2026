import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const root = new URL('./', import.meta.url).pathname;
const changed = [];
const warnings = [];
const requiredDirs = ['assets', 'modules', 'daten/defaults', 'logs', 'sicherungen'];
const requiredFiles = [
  'index.html',
  'assets/provoware-core.css',
  'assets/provoware-core.js',
  'modules/_registry.js',
  'modules/modules.manifest.json',
  'start_linux.sh'
];

function pathOf(file) {
  return join(root, file);
}

function readText(file) {
  return readFileSync(pathOf(file), 'utf8');
}

function writeText(file, text) {
  writeFileSync(pathOf(file), text);
  changed.push(file);
}

function ensureDir(dir) {
  if (!existsSync(pathOf(dir))) {
    mkdirSync(pathOf(dir), { recursive: true });
    changed.push(dir + '/');
  }
}

function ensureFile(file) {
  if (!existsSync(pathOf(file))) throw new Error('Pflichtdatei fehlt: ' + file);
}

function normalizeJson(file) {
  const parsed = JSON.parse(readText(file));
  const next = JSON.stringify(parsed, null, 2) + '\n';
  if (readText(file) !== next) writeText(file, next);
  return parsed;
}

function ensureTrailingNewline(file) {
  const text = readText(file);
  if (text && !text.endsWith('\n')) writeText(file, text + '\n');
}

function assertManifestFiles(manifest) {
  if (!Array.isArray(manifest.modules)) throw new Error('Manifest ohne modules-Liste');
  for (const mod of manifest.modules) {
    if (!mod.id || !mod.file) throw new Error('Manifest-Modul ohne id/file');
    ensureFile('modules/' + mod.file);
  }
}

function warnRegistryAliases(manifest) {
  const registry = readText('modules/_registry.js');
  const missing = manifest.modules.filter((mod) => !registry.includes("id:'" + mod.id + "'") && !registry.includes('id:"' + mod.id + '"'));
  if (missing.length) warnings.push('Registry nutzt abweichende Kurz-IDs: ' + missing.map((mod) => mod.id).join(', '));
}

function assertNoRemoteAssets() {
  const index = readText('index.html');
  if (/https?:\/\//i.test(index)) throw new Error('index.html enthält externe URL');
  for (const asset of ['assets/provoware-core.css', 'assets/provoware-core.js']) {
    if (/https?:\/\//i.test(readText(asset))) throw new Error(asset + ' enthält externe URL');
  }
}

function ensureDefaultPackShape(file) {
  const pack = normalizeJson(file);
  if (!pack.schemaVersion || !pack.packId || !Array.isArray(pack.items)) {
    throw new Error('Default-Pack unvollständig: ' + file);
  }
}

for (const dir of requiredDirs) ensureDir(dir);
for (const file of requiredFiles) ensureFile(file);
for (const file of requiredFiles) ensureTrailingNewline(file);

const manifest = normalizeJson('modules/modules.manifest.json');
assertManifestFiles(manifest);
warnRegistryAliases(manifest);
assertNoRemoteAssets();

for (const file of ['genres.default.json', 'moods.default.json', 'styles.default.json', 'prompt_templates.default.json', 'textblocks.default.json', 'song_structures.default.json', 'hashtags.default.json', 'calendar_colors.default.json', 'todo_categories.default.json', 'help_tips.default.json']) {
  ensureDefaultPackShape('daten/defaults/' + file);
}

for (const warning of warnings) console.warn('SELF_HEAL_WARN ' + warning);
console.log(changed.length ? 'SELF_HEAL_CHANGED ' + changed.join(', ') : 'SELF_HEAL_OK');
