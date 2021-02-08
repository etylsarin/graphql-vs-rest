import React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { Users } from './components/Users';
import { AddUser } from './components/AddUser';
import logo from './graphql-demo.svg';
import './App.css';

const client = new ApolloClient({
  uri: 'http://localhost:8000/api/gql',
  cache: new InMemoryCache()
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <h1>GraphQL demo</h1>
        <img src={logo} className="App-logo" alt="logo" />
        <Users />
        <AddUser />
      </div>
    </ApolloProvider>
  );
}

export default App;
