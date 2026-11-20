import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import yaml from 'js-yaml';
const root = join(process.cwd(), 'content');
const ids = new Set<string>();
function files(dir:string):string[] { return readdirSync(dir,{withFileTypes:true}).flatMap(e => e.isDirectory()?files(join(dir,e.name)):[join(dir,e.name)]); }
for (const file of files(root)) {
  const raw = readFileSync(file,'utf8');
  let data:any;
  try { data = file.endsWith('.json') ? JSON.parse(raw) : yaml.load(raw.split('---')[1] ?? ''); } catch (e) { throw new Error(`${file}: invalid data (${e})`); }
  if (!data?.id || !data?.title) throw new Error(`${file}: id and title are required`);
  if (ids.has(data.id)) throw new Error(`${file}: duplicate id ${data.id}`); ids.add(data.id);
  if (file.includes('/tests/')) { if (!data.questions?.length) throw new Error(`${file}: questions are required`); for (const q of data.questions) { if (!q.id || !q.prompt || !q.options?.length || !q.options.some((o:any)=>o.id===q.correctOptionId)) throw new Error(`${file}: invalid question ${q.id}`); } }
}
console.log(`Validated ${ids.size} content files.`);
