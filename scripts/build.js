import CONFIG from '../config.js';
import { makeDir, readFile, writeFile } from './common.js';
import buildHtmlFiles from './html.js';
import buildContentFiles from './markdown.js';

const { build: {
    dist: DIST,
}} = CONFIG;

const build = () => {
    makeDir(DIST);

    const style = readFile('style/style.css');

    writeFile(`${DIST}/style.css`, style);

    buildHtmlFiles();

    buildContentFiles();
};

build();