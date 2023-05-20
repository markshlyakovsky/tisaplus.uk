const express = require('express');
const fetch = require('node-fetch');
const app = express();
const PORT = process.env.PORT || 3000;

// Duffel API credentials
const duffelAPIKey = 'duffel_live_A_AejrqBDQkcTyEphMq1ajdy04OeuCHFbcDDN7wRKfk';

// Serve static files
app.use(express.static('public'));

// Flight search API endpoint specific to your website
app.get('/flights', async (req, res) => {
  const origin = req.query.origin;
  const destination = req.query.destination;
  const departureDate = req.query.departureDate;

  const apiUrl = `https://api.duffel.com/air/offer_requests?return_offers=false&supplier_timeout=10000`;

  const requestBody = {
    passengers: {
      adults: 1,
    },
    slices: [
      {
        origin,
        destination,
        departure_date: departureDate,
      },
    ],
  };

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${duffelAPIKey}`,
        'Duffel-Version': '1',
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
