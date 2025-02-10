import fs from 'fs';

const makeDir = (src) => fs.mkdirSync(src);

const readDir = (src) => fs.readdirSync(src);

const readFile = (src) => fs.readFileSync(src);

const writeFile = (src, file) => fs.writeFileSync(src, file);

export { makeDir, readDir, readFile, writeFile };