const https = require('https');
const fs = require('fs');

const url = "https://example.com/file.ext";
const filePath = "local_file.ext";

https.get(url, response => {
  const fileStream = fs.createWriteStream(filePath);
  response.pipe(fileStream);
  fileStream.on('finish', () => {
    fileStream.close(); // Не забывайте закрывать ледник! 😄
    console.log('Файл успешно загружен!');
  });
});