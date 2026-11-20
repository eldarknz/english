import yaml from 'js-yaml';
import type { DocumentContent, TestContent, VocabularySet } from '../types/content';

const vocabFiles = import.meta.glob('/content/vocabulary/*.json', { eager:true, query:'?raw', import:'default' }) as Record<string,string>;
const materialFiles = import.meta.glob('/content/materials/**/*.md', { eager:true, query:'?raw', import:'default' }) as Record<string,string>;
const textFiles = import.meta.glob('/content/texts/**/*.md', { eager:true, query:'?raw', import:'default' }) as Record<string,string>;
const testFiles = import.meta.glob('/content/tests/*.json', { eager:true, query:'?raw', import:'default' }) as Record<string,string>;
const parseJson = <T>(raw:string) => JSON.parse(raw) as T;
const parseDocs = (files:Record<string,string>):DocumentContent[] => Object.entries(files).map(([path, raw]) => {
  const match = raw.match(/^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/);
  if (!match) throw new Error(`${path}: YAML front matter is required`);
  const metadata = yaml.load(match[1]);
  if (!metadata || typeof metadata !== 'object') throw new Error(`${path}: invalid YAML front matter`);
  return {...metadata, body:match[2], source:path} as unknown as DocumentContent;
});
export const vocabulary = Object.values(vocabFiles).map(raw => parseJson<VocabularySet>(raw));
export const materials = parseDocs(materialFiles);
export const texts = parseDocs(textFiles);
export const tests = Object.values(testFiles).map(raw => parseJson<TestContent>(raw));
export const findById = <T extends {id:string}>(items:T[], id?:string) => items.find(item => item.id === id);
