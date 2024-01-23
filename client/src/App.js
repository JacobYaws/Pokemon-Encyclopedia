// import logo from './logo.svg';
// import './App.css';

import React from 'react';
import "./index.scss";
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';

import { setContext } from '@apollo/client/link/context'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/Home'

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {


  return (
    <ApolloProvider client={client}>
    <Router>
      <>
      <Switch>
        <Route exact path="/" component={Home} />
        </Switch>
      </>
    </Router>
    </ApolloProvider>

  );
}

export default App;
