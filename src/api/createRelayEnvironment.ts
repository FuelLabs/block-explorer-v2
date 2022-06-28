import { Environment, Network, RecordSource, Store } from 'relay-runtime';

export default function createRelayEnvironment(url: string) {
  async function fetchGraphQL(text: any, variables: any) {
    const REACT_APP_GITHUB_AUTH_TOKEN = process.env.REACT_APP_GITHUB_AUTH_TOKEN;

    // Fetch data from GitHub's GraphQL API:
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `bearer ${REACT_APP_GITHUB_AUTH_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: text,
        variables,
      }),
    });

    // Get the response as JSON
    return response.json();
  }

  // Relay passes a "params" object with the query name and text. So we define a helper function
  // to call our fetchGraphQL utility with params.text.
  async function fetchRelay(params: any, variables: any) {
    console.log(`fetching query ${params.name} with ${JSON.stringify(variables)}`);
    return fetchGraphQL(params.text, variables);
  }

  // Export a singleton instance of Relay Environment configured with our network function:
  return new Environment({
    network: Network.create(fetchRelay),
    store: new Store(new RecordSource()),
  });
}
