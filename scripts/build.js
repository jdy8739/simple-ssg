import fs from 'fs';
import Mustache from 'mustache';
import CONFIG from '../config.js';

const { build: { dist: DIST, pages: PAGES, contents } } = CONFIG;

const makeDistDir = (src) => fs.mkdirSync(src);

const fillHtml = (src) => {
    const file = fs.readFileSync(src);

    const filledFile = Mustache.render(file.toString(), CONFIG);

    return filledFile;
};

const writeHtmlFiles = ({ dest, file }) => {
    // make dir if it is not root page.
    if (dest !== 'dist/index.html') {
        const path = dest.replace('/index.html', '');
        makeDistDir(path);
    }

    fs.writeFileSync(dest, file);
};

const completeHtmlFiles = (files) => {
    return files.reduce((acc, file) => {
        const src = `${PAGES}/${file}`;

        if (file === 'index.html') {
            acc.push({ dest: `${DIST}/${file}`, file: fillHtml(src) })
        } else {
            const dirName = file.split('.')[0];

            const path = `${DIST}/${dirName}`;

            acc.push({ dest: `${path}/index.html`, file: fillHtml(src) });
        }

        return acc;
    }, []);
};

const buildCompleteHtmls = () => {
    makeDistDir(DIST);

    const htmlFiles = fs.readdirSync(PAGES);

    const completeHtmls = completeHtmlFiles(htmlFiles);

    completeHtmls.forEach(writeHtmlFiles);
};

const build = () => {
    buildCompleteHtmls();
};

build();