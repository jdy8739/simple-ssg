import fs from 'fs';

const makeDir = (src) => fs.mkdirSync(src);

const readDir = (src) => fs.readdirSync(src);

const readFile = (src) => fs.readFileSync(src);

const writeFile = (src, file) => fs.writeFileSync(src, file);

const getHtmlWithStyle = (html) => {
    const split = html.split('</title>');

    split.splice(1, 0,
        '</title>\n' +
        '<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@picocss/pico@2/css/pico.min.css">\n' +
        '<link rel="stylesheet" href="/style.css">\n'
    );

    return split.join('');
};

export { makeDir, readDir, readFile, writeFile, getHtmlWithStyle };