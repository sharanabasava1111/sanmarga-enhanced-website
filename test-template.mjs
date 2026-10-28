import { readFile } from 'node:fs/promises';

const pages = ['index.html', 'about.html', 'education.html', 'health.html', 'awareness.html', 'contact.html', 'donate.html', 'work-with-us.html'];
for (const name of pages) {
  const source = await readFile(new URL(`./${name}`, import.meta.url), 'utf8');
  if (!source.includes('<header id="siteHeader">') || !source.includes('script.js')) throw new Error(`${name} is missing the shared navigation.`);
}
const js = await readFile(new URL('./script.js', import.meta.url), 'utf8');
new Function(js);
const home = await readFile(new URL('./index.html', import.meta.url), 'utf8');
for (const target of ['education.html', 'health.html', 'awareness.html', 'contact.html']) {
  if (!home.includes(`href="${target}"`)) throw new Error(`Home page does not link to ${target}.`);
}
const work = await readFile(new URL('./work-with-us.html', import.meta.url), 'utf8');
for (const expected of ['<meta name="keywords"', 'GMAIL', 'Google Form link coming soon']) {
  if (!work.includes(expected)) throw new Error(`Work With Us page is missing ${expected}.`);
}
console.log('Passed: all pages, programme links, Work With Us essentials and shared JavaScript syntax are present.');
