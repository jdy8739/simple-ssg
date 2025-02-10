import Mustache from 'mustache';
import CONFIG from '../config.js';
import { makeDir, readDir, readFile, writeFile } from './common.js';
import frontMatter from 'front-matter';

const { build: {
    dist: DIST,
    pages: PAGES,
    contents: CONTENTS,
    contentsSlug: CONTESTS_SLUG
}} = CONFIG;

const fillHtml = (src, recentPosts) => {
    const file = readFile(src);

    const filledFile = Mustache.render(file.toString(), { ...CONFIG, recentPosts });

    return filledFile;
};

const writeHtmlFile = ({ dest, file }) => {
    // make dir if it is not root page.
    if (dest !== 'dist/index.html') {
        const path = dest.replace('/index.html', '');
        makeDir(path);
    }

    writeFile(dest, file);
};

const completeHtmlFiles = (files, recentPosts) => {
    return files.reduce((acc, file) => {
        const src = `${PAGES}/${file}`;

        if (file === 'index.html') {
            acc.push({ dest: `${DIST}/${file}`, file: fillHtml(src, recentPosts) })
        } else {
            const dirName = file.split('.')[0];

            const path = `${DIST}/${dirName}`;

            acc.push({ dest: `${path}/index.html`, file: fillHtml(src, recentPosts) });
        }

        return acc;
    }, []);
};

const getRecentPosts = (src) => {
    const contentFiles = readDir(src);

    return contentFiles.reduce((acc, file) => {
        const contentSrc = `${CONTENTS}/${file}/index.md`;

        const content = readFile(contentSrc);

        const { attributes } = frontMatter(content.toString());

        acc.push({ ...attributes, path: `/${CONTESTS_SLUG}/${attributes.slug}` });

        return acc;
    }, []);
};

const buildHtmlFiles = () => {
    const htmlFiles = readDir(PAGES);

    const recentPosts = getRecentPosts(CONTENTS);

    const completeHtmls = completeHtmlFiles(htmlFiles, recentPosts);

    completeHtmls.forEach(writeHtmlFile);
};

export default buildHtmlFiles;