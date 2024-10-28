// import { ApolloClient, InMemoryCache, from, HttpLink } from '@apollo/client';
// import { onError } from '@apollo/client/link/error';
// import { setContext } from '@apollo/client/link/context';
// import { getAccessToken } from './recoil/atoms'; // Access Token 가져오는 함수

// // 에러 처리용 미들웨어
// const errorLink = onError(({ graphQLErrors, networkError }) => {
//   if (graphQLErrors) {
//     graphQLErrors.forEach(({ message }) => {
//       console.error(`[GraphQL error]: Message: ${message}`);
//     });
//   }

//   if (networkError) {
//     console.error(`[Network error]: ${networkError}`);
//   }
// });

// // Authorization 헤더 추가를 위한 authLink 설정
// const authLink = setContext((_, { headers }) => {
//   // Recoil의 전역 변수에서 Access Token 가져오기
//   const accessToken = getAccessToken();
//   console.log(accessToken);
//   return {
//     headers: {
//       ...headers,
//       Authorization: accessToken ? `Bearer ${accessToken}` : '',
//     },
//   };
// });

// // GraphQL 서버와 통신하기 위한 HttpLink
// const httpLink = new HttpLink({
//   uri: 'http://localhost:8080/graphql', // GraphQL 엔드포인트를 여기에 입력하세요
//   credentials: 'include', // 쿠키를 포함한 요청
// });

// // Apollo Client 설정
// const client = new ApolloClient({
//   link: from([errorLink, authLink.concat(httpLink)]), // authLink를 httpLink 앞에 추가
//   cache: new InMemoryCache(),
// });

export default {};
