const fetch = require('node-fetch');
const AbortController = require('abort-controller');

const abortController = new AbortController();

const run = async () => {
  const result = await fetch(
    'http://localhost:8080/stream',
    { signal: abortController.signal }
  );
  console.log('response = %o', result);
  for await (chunk of result.body) {
    console.log(chunk.toString());
  }
}

setTimeout(() => abortController.abort(), 3000);

run().catch(e => console.log(e));