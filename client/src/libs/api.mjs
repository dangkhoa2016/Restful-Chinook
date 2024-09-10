
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

  for (const [query, file] of Object.entries(queryToFileMap)) {
    if (requestData.query.includes(query)) {
      const { data } = await mock.axiosInstanceWithoutInterceptors.get(`/src/sample-data/${file}`);
      return [200, data];
    }
   }

  if (requestData.query.includes('updateLike') && requestData.query.includes('like: true)')) {
    if (requestData.query.includes('photoId')) {
      const { data } = await mock.axiosInstanceWithoutInterceptors.get('/src/sample-data/like-photo.json');
      return [200, data];
    } else if (requestData.query.includes('catId')) {
      const { data } = await mock.axiosInstanceWithoutInterceptors.get('/src/sample-data/like-cat.json');
      return [200, data];
    }
  } else if (requestData.query.includes('updateLike') && requestData.query.includes('like: false)')) {
    if (requestData.query.includes('photoId')) {
      const { data } = await mock.axiosInstanceWithoutInterceptors.get('/src/sample-data/unlike-photo.json');
      return [200, data];
    } else if (requestData.query.includes('catId')) {
      const { data } = await mock.axiosInstanceWithoutInterceptors.get('/src/sample-data/unlike-cat.json');
      return [200, data];
    }
  } else if (requestData.query.includes('toggleStatus') && requestData.query.includes('active: false)')) {
    if (requestData.query.includes('photoId')) {
      const { data } = await mock.axiosInstanceWithoutInterceptors.get('/src/sample-data/disable-photo.json');
      return [200, data];
    } else if (requestData.query.includes('catId')) {
      const { data } = await mock.axiosInstanceWithoutInterceptors.get('/src/sample-data/disable-cat.json');
      return [200, data];
    } else if (requestData.query.includes('userId')) {
      const { data } = await mock.axiosInstanceWithoutInterceptors.get('/src/sample-data/disable-user.json');
      return [200, data];
    }
  } else if (requestData.query.includes('toggleStatus') && requestData.query.includes('active: true)')) {
    if (requestData.query.includes('photoId')) {
      const { data } = await mock.axiosInstanceWithoutInterceptors.get('/src/sample-data/enable-photo.json');
      return [200, data];
    } else if (requestData.query.includes('catId')) {
      const { data } = await mock.axiosInstanceWithoutInterceptors.get('/src/sample-data/enable-cat.json');
      return [200, data];
    } else if (requestData.query.includes('userId')) {
      const { data } = await mock.axiosInstanceWithoutInterceptors.get('/src/sample-data/enable-user.json');
      return [200, data];
    }
  }

  if (requestData.query.includes('userFields')) {
    return [200, {
      data: {
        userFields: [
          'name', 'email', 'phone', 'address', 'city', 'state', 'zip', 'country', 'role', 'status'
        ]
      }
    }];
  }

  // If the query doesn't match the second one, return an empty response or handle accordingly
  return [200, {}];

});

mock.onAny().passThrough();


export default instance;
