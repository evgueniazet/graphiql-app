const fetchData = async () => {
  try {
    const response = await fetch('https://spacex-production.up.railway.app/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `
            query {
                company {
                    founder
                    founded
                    employees
                    cto
                  }
                  coresPast {
                    asds_landings
                  }
            }
          `,
      }),
    });

    const result = await response.json();
    console.log('Data:', result.data);
  } catch (error) {
    console.error('Error:', error);
  }
};

export default fetchData;
