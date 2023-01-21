var express = require('express');
const { Client } = require('pg')
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  let time = new Date()
  let time2 = time.toLocaleTimeString()
  res.render('index', { time: time2 });
});

router.get('/search', async function (req, res, next) {

  const query = req.query['q']

  if (query === '' || typeof query == "undefined") {
    res.render('search', {data: test});
    return
  }

  let data

  try {
    const client = new Client({
      user: 'justin',
      host: '127.0.0.1',
      database: 'productdatabase',
      password: 'password',
      port: 5432,
    })
    await client.connect()

    const dbRes = await client.query(`SELECT * FROM cproducts WHERE name LIKE '%${query}%';`)
    data = dbRes.rows
    await client.end()
  } catch (e) {
    console.log(e)
  }

  res.render('search', {data: data});

})

module.exports = router;
