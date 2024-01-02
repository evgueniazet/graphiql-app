const makeRequest = async (
  endpoint: string | URL | Request,
  query: string,
  variables: Record<string, any> = {},
  headers: Record<string, string> = {}
) => {
  try {
    const requestBody = {
      query,
      variables,
    };

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
      body: JSON.stringify(requestBody),
    });

    const result = await response.json();
    return { data: result.data };
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

export default makeRequest;
