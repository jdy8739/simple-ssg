import fs from 'fs';

fs.mkdirSync('dist');

const files = fs.readdirSync('pages');

for (const file of files) {
    const fileName = `pages/${file}`;

    if (file === 'index.html') {
        fs.copyFileSync(fileName, `dist/${file}`);
    } else {
        const dirName = file.split('.')[0];

        const path = `dist/${dirName}`;

        fs.mkdirSync(path);

        fs.copyFileSync(fileName, `${path}/index.html`);
    }
}