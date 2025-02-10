import fs from 'fs';
import Mustache from 'mustache';
import frontMatter from 'front-matter';
import Showdown from 'showdown';
import CONFIG from '../config.js';

const { build: {
    dist: DIST,
    pages: PAGES,
    contents: CONTENTS,
    contentsSlug: CONTESTS_SLUG
}} = CONFIG;

const makeDir = (src) => fs.mkdirSync(src);

const readDir = (src) => fs.readdirSync(src);

const readFile = (src) => fs.readFileSync(src);

const fillHtml = (src) => {
    const file = readFile(src);

    const filledFile = Mustache.render(file.toString(), CONFIG);

    return filledFile;
};

const writeHtmlFile = ({ dest, file }) => {
    // make dir if it is not root page.
    if (dest !== 'dist/index.html') {
        const path = dest.replace('/index.html', '');
        makeDir(path);
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

const buildHtmlFiles = () => {
    const htmlFiles = readDir(PAGES);

    const completeHtmls = completeHtmlFiles(htmlFiles);

    completeHtmls.forEach(writeHtmlFile);
};

const buildContentFiles = () => {
    const contentFiles = readDir(CONTENTS);

    const path = `${DIST}/${CONTESTS_SLUG}`;

    makeDir(path);

    for (const file of contentFiles) {
        const src = `${CONTENTS}/${file}/index.md`;

        const content = readFile(src);

        const template = readFile('template/post.html');

        const { body, attributes } = frontMatter(content.toString());

        const bodyContent = new Showdown.Converter().makeHtml(body);

        const html = Mustache.render(template.toString(), { ...CONFIG, post: { ...attributes, body: bodyContent } });

        const dirName = `${path}/${file}`;

        makeDir(dirName);

        fs.writeFileSync(`${dirName}/index.html`, html);
    }
};

const build = () => {
    makeDir(DIST);

    buildHtmlFiles();

    buildContentFiles();
};

build();