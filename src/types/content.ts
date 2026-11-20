export type VocabularyItem = { id:string; term:string; translation:string; example:string; note?:string; tags:string[] };
export type VocabularySet = { id:string; title:string; description:string; items:VocabularyItem[] };
export type DocumentMeta = { id:string; title:string; level:string; category:string; tags:string[]; description?:string };
export type DocumentContent = DocumentMeta & { body:string };
export type TestQuestion = { id:string; prompt:string; options:{id:string;text:string}[]; correctOptionId:string; explanation:string };
export type TestContent = { id:string; title:string; description:string; level:string; tags:string[]; questions:TestQuestion[] };
