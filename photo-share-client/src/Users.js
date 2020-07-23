import React from "react";
import { Query } from "react-apollo";
import { ROOT_QUERY } from "./App";

const Users = () => {
  //!the Query component is sending the ROOT_QUERY to our GraphQL service and caching the result locally
  return (
    <Query query={ROOT_QUERY}>
      {/* destructure result */}
      {({ data, loading }) =>
        loading ? (
          <p>loading users...</p>
        ) : (
          <UserList count={data.totalUsers} users={data.allUsers} />
        )
      }
    </Query>
    
  );
};

const UserList = ({ count, users }) => {
  return (
    <div>
      <p>{count} Users</p>
      <ul>
        {users.map((user) => (
          <UserListItem
            key={user.githubLogin}
            name={user.name}
            avatar={user.avatar}
          />
        ))}
      </ul>
    </div>
  );
};

const UserListItem = ({ name, avatar }) => {
  return (
    <li>
      <img src={avatar} width={48} height={48} alt="" />
      {name}
    </li>
  );
};

export default Users;

//https://www.apollographql.com/docs/react/v2.5/essentials/queries/#the-query-component

//1. When the Query component mounts, Apollo Client creates an observable for our query. Our component subscribes to the result of the query via the Apollo Client cache.
//2.First, we try to load the query result from the Apollo cache. If it's not in there, we send the request to the server.
//3.Once the data comes back, we normalize it and store it in the Apollo cache. Since the Query component subscribes to the result, it updates with the data reactively.

// the result data :
//the reesults object also has several utility functions for pagination, refetching, and polling :

// {(result) => console.log(results)}
// called: true
// client: DefaultClient {defaultOptions: {…}, resetStoreCallbacks: Array(0), clearStoreCallbacks: Array(0), link: ApolloLink, cache: InMemoryCache, …}
// data: undefined
// error: undefined
// fetchMore: ƒ (fetchMoreOptions)
// loading: true
// networkStatus: 1
// refetch: ƒ (variables)
// startPolling: ƒ (pollInterval) ***
// stopPolling: ƒ ()
// subscribeToMore: ƒ (options)
// updateQuery: ƒ (mapFn)
// variables: {}
// __proto__: Object
