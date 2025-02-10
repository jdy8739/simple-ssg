import CONFIG from '../config.js';
import { makeDir } from './common.js';
import buildHtmlFiles from './html.js';
import buildContentFiles from './markdown.js';

const { build: {
    dist: DIST,
}} = CONFIG;

const build = () => {
    makeDir(DIST);

    buildHtmlFiles();

    buildContentFiles();
};

build();