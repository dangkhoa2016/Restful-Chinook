
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

// export const endpoint = 'http://localhost:4000';
export const endpoint = '/';


const instance = axios.create({ baseURL: endpoint });
const mock = new MockAdapter(instance);

mock.onPost('/graphql').reply(config => {
  if (endpoint.length > 1) {
    // pass through to the real server
    return mock.axiosInstanceWithoutInterceptors(config);
  }

  // const requestData = JSON.parse(config.data);
  // console.log('Mock for /graphql is set up. Request config:', config, requestData);

  // If the query doesn't match the second one, return an empty response or handle accordingly
  return [200, {}];
});

mock.onAny().passThrough();


export default instance;
