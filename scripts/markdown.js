import CONFIG from '../config.js';
import { makeDir, readDir, readFile, writeFile, getHtmlWithPico } from './common.js';
import frontMatter from 'front-matter';
import Mustache from 'mustache';
import Showdown from 'showdown';

const { build: {
    dist: DIST,
    contents: CONTENTS,
    contentsSlug: CONTESTS_SLUG
}} = CONFIG;

const createPathDir = (path) => {
    makeDir(path);

    return path;
};

const writeHtmlFils = ({ dest, file }) => {
    makeDir(dest);

    writeFile(`${dest}/index.html`, file);
};

const getFilledHtmlFile = (content, template) => {
    // get meta tags and body content from markdown files.
    const { body, attributes } = frontMatter(content.toString());

    // make html elements that will be inserted into body of the html.
    const bodyContent = new Showdown.Converter().makeHtml(body);

    // render the full contents html using Mustache which fills the blanks for data.
    const html = Mustache.render(template.toString(),
        { ...CONFIG, post: CONFIG.updatePost({ ...attributes, body: bodyContent }) }
    );

    return html;
};

const convertMarkdownIntoHtml = (path, files, template) => {
    return files.reduce((acc, file) => {
        const src = `${CONTENTS}/${file}/index.md`;

        const markdownFile = readFile(src);

        const html = getHtmlWithPico(getFilledHtmlFile(markdownFile, template));

        acc.push({ dest: `${path}/${file}`, file: html });

        return acc;
    }, []);
};

const buildContentFiles = () => {
    const markdownFiles = readDir(CONTENTS);

    const template = readFile('template/post.html');

    const path = createPathDir(`${DIST}/${CONTESTS_SLUG}`);

    const htmlFilesFromMarkdown = convertMarkdownIntoHtml(path, markdownFiles, template);

    htmlFilesFromMarkdown.forEach(writeHtmlFils);
};

export default buildContentFiles;