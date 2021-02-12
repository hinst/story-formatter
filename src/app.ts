import process from 'process'
import fs from 'fs';

function main() {
    const filePath = process.argv[2];
    const content = fs.readFileSync(filePath).toString();
    const dotPosition = filePath.lastIndexOf('.');
    let formattedFilePath = filePath;
    if (dotPosition >= 0) {
        const filePathBeforeExtension = filePath.slice(0, dotPosition);
        const fileExtension = filePath.slice(dotPosition);
        formattedFilePath = filePathBeforeExtension + '.fmt' + fileExtension;
    } else {
        formattedFilePath = filePath + '.fmt';
    }
    console.log(filePath, '->', formattedFilePath);

    const lines = content.split('\n').map(line => line.trim());
    let output = '';
    let wordCount = 0;
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        wordCount += line.length > 0 ? line.split(' ').length : 0;
        const needBreak = i < lines.length - 1 && lines[i + 1].length == 0 || line.length == 0;
        output += line + (needBreak ? '\n' : ' ');
    }
    console.log('Word count: ' + wordCount);
    fs.writeFileSync(formattedFilePath, output);
}

main();