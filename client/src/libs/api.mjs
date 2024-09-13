
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

// export const endpoint = 'http://localhost:4000';
export const endpoint = '/';


const instance = axios.create({ baseURL: endpoint });
const mock = new MockAdapter(instance);

const queryToFileMap = {
  'topUsersByLikeCount(pageSize': 'top-users.json',
  'user(id:': 'user.json',
  'users(pageIndex:': 'users-list.json',
  'login(email:': 'login.json',
  'decryptUserToken(userToken:': 'decrypt-user-token.json',
  'cat(id:': 'cat.json',
  'cats(pageIndex:': 'cats-list.json',
  'catsByUserId(userId:': 'cats-by-user.json',
  'photosByCatId(catId:': 'photos-by-cat.json',
  'photosByUserId(userId:': 'photos-by-user.json',
  'follow(userId:': 'follow.json',
  'unfollow(userId:': 'unfollow.json',
};


mock.onPost('/graphql').reply(async config => {
  if (endpoint.length > 1) {
    // pass through to the real server
    return mock.axiosInstanceWithoutInterceptors(config);
  }

  const requestData = JSON.parse(config.data);
  // console.log('Mock for /graphql is set up. Request config:', config, requestData);

  // If the query doesn't match the second one, return an empty response or handle accordingly
  return [200, {}];
});

mock.onAny().passThrough();


export default instance;
