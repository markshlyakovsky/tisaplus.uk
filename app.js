// Add an event listener for the form submission
  const searchForm = document.getElementById('search-form');
  searchForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    // Retrieve form field values
    const origin = document.getElementById('origin').value;
    const destination = document.getElementById('destination').value;
    const departureDate = document.getElementById('departure-date').value;
    const returnDate = document.getElementById('return-date').value;
    const adults = parseInt(document.getElementById('adult').value);
    const children = parseInt(document.getElementById('children').value);
    const infants = parseInt(document.getElementById('infants').value);

    // Create the request body
    const requestBody = {
      passengers: {
        adults: adults,
        children: children,
        infants: infants,
      },
      slices: [
        {
          origin: origin,
          destination: destination,
          departure_date: departureDate,
        },
        {
          origin: destination,
          destination: origin,
          departure_date: returnDate,
        },
      ],
    };

    // Show the loader
    const loader = document.querySelector('.custom-loader');
    loader.style.visibility = 'visible';

    // Make the API request
    const token = 'duffel_live_A_AejrqBDQkcTyEphMq1ajdy04OeuCHFbcDDN7wRKfk';
    fetch('https://api.duffel.com/air/offer_requests?return_offers=false&supplier_timeout=10000', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Duffel-Version': '1',
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    })
      .then(response => response.json()) // Parse the response as JSON
      .then(data => {
        // Handle the response data
        console.log('Response:', data);
      })
      .catch(error => {
        console.error('Error:', error);
        // Handle the error
      })
      .finally(() => {
        // Hide the loader
        loader.style.visibility = 'hidden';
      });
  });
