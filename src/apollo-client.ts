import { ApolloClient, InMemoryCache, from, HttpLink } from '@apollo/client';
import { onError } from '@apollo/client/link/error';

// 에러 처리용 미들웨어
const errorLink = onError(({ graphQLErrors, networkError }) => {
  // GraphQL 에러를 콘솔에 기록
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) => {
      console.error(`[GraphQL error]: Message: ${message}`);
    });
  }

  // 네트워크 에러를 콘솔에 기록
  if (networkError) {
    console.error(`[Network error]: ${networkError}`);
  }

  // 화면에 에러를 표시하지 않도록 UI 에러 처리 부분 제외
});

const httpLink = new HttpLink({
  uri: 'http://localhost:8080/api/graphql',
});

// Apollo Client 설정
const client = new ApolloClient({
  link: from([errorLink, httpLink]),
  cache: new InMemoryCache(),
});

export default client;
