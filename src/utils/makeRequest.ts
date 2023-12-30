const makeRequest = async (endpoint: string | URL | Request) => {
  try {
    const response = await fetch(endpoint, {
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
    return { data: result.data };
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

export default makeRequest;
