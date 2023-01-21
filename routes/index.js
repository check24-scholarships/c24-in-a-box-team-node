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

  let test = [{
    "id": 1,
    "name": "Refectocil Lash & Brow Booster Wachstumsfördernd, frei von Prostamid und synthetischen Hormonen 6 ml",
    "price": 4079,
    "image": "https://cdn2.beauty.check24.de/product/eyJrZXkiOiI5YS85YTAxNzRjMS1kNThjLTVmOTUtYjZiNS1mMjliNWE2OTI4YWIuanBlZyIsImVkaXRzIjp7InJlc2l6ZSI6eyJ3aWR0aCI6MzAwLCJoZWlnaHQiOjMwMCwiZml0IjoiaW5zaWRlIn0sInRyaW0iOjF9fQ=="
  },
    {
      "id": 2,

      "name": "Hörmann Handsender HSE4 868-BS Kunststoff schwarz Struktur SW-Eu (4511736)",
      "price": 4189,
      "image": "https://cdn2.baumarkt.check24.de/product/eyJrZXkiOiJwcm9kdWN0L3E3Yy9nNGwvZHh4Lzl4bHFkZzdoYWhjOC5qcGciLCJlZGl0cyI6eyJyZXNpemUiOnsid2lkdGgiOjMwMCwiaGVpZ2h0IjozMDAsImZpdCI6Imluc2lkZSJ9LCJ0cmltIjoxfX0="
    },
    {
      "id": 3,

      "name": "Tonies 'Toniebox Starterset' beere mit Kreativ-Tonie",
      "price": 7940,
      "image": "https://m.c24toys.de/resize/200_200/d5f/d5ffa2a2e26211aea34e8050adb7c408e308e627_0ca93a4176a1ddfd8f4eca731d4db3e8c49c6979.jpg"
    },
    {
      "id": 4,

      "name": "De'Longhi Nespresso Vertuo Next ENV120.WAE Kapselmaschine Bundle weiß inkl. Aeroccino Milchaufschäumer",
      "price": 8938,
      "image": "https://cdn2.haushalt.check24.de/product/eyJrZXkiOiJwcm9kdWN0LzU0NS82NDUvYzM2cnluLmpwZyIsImVkaXRzIjp7InJlc2l6ZSI6eyJ3aWR0aCI6MzAwLCJoZWlnaHQiOjMwMCwiZml0IjoiaW5zaWRlIn0sInRyaW0iOjF9fQ=="
    },]

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

  res.render('search', {data: test});

})

module.exports = router;
