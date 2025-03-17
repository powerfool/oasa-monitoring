const express = require('express');
const fetch = require('node-fetch');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/stop/:code', async (req, res) => {
  const code = req.params.code;
  if (!/^[0-9]{6}$/.test(code)) {
    return res.status(400).json({ error: 'Invalid stop code' });
  }

  try {
    const response = await fetch(`https://telematics.oasa.gr/api/?act=webGetRoutesForStop&stopCode=${code}`);
    const data = await response.json();
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch data from OASA' });
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
