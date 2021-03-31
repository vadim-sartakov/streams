const express = require('express');

const PORT = 8080;
const app = express();

const sleep = duration => new Promise(resolve => setTimeout(resolve, duration));

app.get('/stream', async (req, res) => {
  console.log('Got request from %s', req.ip);

  let closed = false;
  req.on('close', () => {
    console.log('Closed');
    closed = true;
  });

  for (let i = 0; i < 10; i++) {
    if (closed) break;
    const data = `Test ${i}`;
    console.log('Sending data %s', data);
    res.write(data);
    await sleep(2000);
  }

  res.end();
});

app.listen(PORT, () => {
  console.log('Server started at port %s', PORT);
});
