const http = require('http');
const fs = require('fs');
const childProcess = require('child_process');
const PORT = process.env.PORT || 4000;

const server = http.createServer((req, res) => {
  if (req.url === '/') {
    const file = 'index.html';
    fs.readFile(file, (err, data) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Ошибка чтения файла');
        return;
      }

      res.writeHead(200, {
        'Content-Type': 'application/x-sh',
  'Content-Disposition': 'attachment; filename="hello.sh"',
  'Access-Control-Allow-Origin': 'https://poetic-kheer-7479c0.netlify.app',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization'
      });
      res.end(data);
    });
  }

  else if (req.url === '/url') {
    const file = './hello.sh';
    childProcess.exec(`chmod +x ${file} && ./${file}`, (err, stdout, stderr) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Ошибка выполнения скрипта');
        return;
      }

      res.writeHead(200, {
     'Content-Type': 'application/x-sh',
  'Content-Disposition': 'attachment; filename="hello.sh"',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization'
      });
      res.end('Скрипт выполнен');
    });
  }

  else {
    
    res.end('Not found');
  }
});

server.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
