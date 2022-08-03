const cacheableResponse = require('cacheable-response')
const express = require('express')
const next = require('next')

const port = process.env.NODE_ENV === 'production' ? 80 : 3002;
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })

const handle = app.getRequestHandler()

const ssrCache = cacheableResponse({
  ttl: 1000 * 60 * 60, // 1hour
  get: async ({req, res, pagePath, queryParams}) => {
      try {
          return {data: await app.renderToHTML(req, res, pagePath, queryParams)}
      } catch (e) {
          return {data: "error: " + e}
      }
  },
  send: ({data, res}) => {
      res.send(data);
  }
});

app.prepare().then(() => {
  const server = express()
  /*
  server.get('/', (req, res) => ssrCache({ req, res }))

  server.get('/DealerDetailInfo', (req, res) => ssrCache({ req, res }))

  server.get('/DealerMaterialInfo', (req, res) => ssrCache({ req, res }))
*/

  server.get('/_next/*', (req, res) => {
    handle(req, res);
  });




  server.get('*', (req, res) => {

    if (req.query.noCache) {
      res.setHeader('X-Cache-Status', 'DISABLED');
      handle(req, res);
  } else {
    ssrCache({req, res, pagePath: req.path, queryParams: req.query});
  }
  })

  server.listen(port, (err) => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})