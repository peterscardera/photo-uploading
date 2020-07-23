import React from "react";
import { useQuery } from "@apollo/client";
import { ROOT_QUERY } from "./App";

const Users = () => {
const { data, loading, error, refetch } = useQuery(ROOT_QUERY);

  if (loading) return "Loading users...";
  if (error) return `Error! ${error.message}`;

  return (
    <UserList
      count={data.totalUsers}
      users={data.allUsers}
      refetchUsers={refetch}
    />
  );
};

const UserList = ({ count, users, refetchUsers }) => {
  return (
    <div>
      <p>{count} Users</p>
      <button onClick={() => refetchUsers()}>Refetch</button>
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



//! ------ Query component to useQuery hook-----

//=============================== Apollo v2 - 2.5 =========================

//!the Query component is sending the ROOT_QUERY to our GraphQL service and caching the result locally
//root query would have import { gql } from "apollo-boost";

//  -----package json
// "apollo-boost": "^0.4.9",
// "react-apollo": "^3.1.5",
// import { Query } from "react-apollo";
// import { ROOT_QUERY } from "./App";
// <Query query={ROOT_QUERY} >
//       {/* destructure result */}

//       {({ data, loading, refetch}) =>
//         loading ? (
//           <p>loading users...</p>
//         ) : (
//           <UserList count={data.totalUsers} users={data.allUsers} refetchUsers={refetch} />
//         )
//       }
//     </Query>

//the query hook is recommended over the Query component


//! ******No matter which way the result object has data and other utility functions below:


//1. When the Query component mounts, Apollo Client creates an observable for our query. Our component subscribes to the result of the query via the Apollo Client cache.
//2.First, we try to load the query result from the Apollo cache. If it's not in there, we send the request to the server.
//3.Once the data comes back, we normalize it and store it in the Apollo cache. Since the Query component subscribes to the result, it updates with the data reactively.

// the result data :
//the reesults object also has several utility functions for pagination, refetching, and polling :

// !{(result) => console.log(results)}  OR const 'theresultobject = useQuery(ROOT_QUERY);

// called: true
// client: DefaultClient {defaultOptions: {…}, resetStoreCallbacks: Array(0), clearStoreCallbacks: Array(0), link: ApolloLink, cache: InMemoryCache, …}
// data: undefined
// error: undefined
// fetchMore: ƒ (fetchMoreOptions)
// loading: true
// networkStatus: 1
// refetch: ƒ (variables) => ANOTHER QUERY WILL BE SENT TO THE GRAPHQL ENDPOINT TO REFETCH ANY DATA CHANGES**
// startPolling: ƒ (pollInterval) ***
// stopPolling: ƒ ()
// subscribeToMore: ƒ (options)
// updateQuery: ƒ (mapFn)
// variables: {}
// __proto__: Object