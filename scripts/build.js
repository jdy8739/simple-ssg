import fs from 'fs';
import Mustache from 'mustache';
import CONFIG from '../config.js';

const { build: { dist: DIST, pages: PAGES, contents } } = CONFIG;

const makeDistDir = () => fs.mkdirSync(DIST);

const readFiles = () => fs.readdirSync(PAGES);

const renderFiles = (src, dest) => {
    const file = fs.readFileSync(src);

    const renderedFile = Mustache.render(file.toString(), CONFIG);

    fs.writeFileSync(dest, renderedFile);
};

const copyFiles = (files) => {
    for (const file of files) {
        const src = `${PAGES}/${file}`;

        if (file === 'index.html') {
            renderFiles(src, `${DIST}/${file}`);
        } else {
            const dirName = file.split('.')[0];

            const path = `${DIST}/${dirName}`;

            fs.mkdirSync(path);

            renderFiles(src, `${path}/index.html`);
        }
    }
};

const build = () => {
    makeDistDir();

    const files = readFiles();

    copyFiles(files);
};

build();