
import React from 'react';
import { store } from '../store'
import { Provider } from 'react-redux'
import { Router } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import Routes from '../routes'

export const history = createBrowserHistory()

export default function App() {
  return (
    <Provider store={store}>
      <Router history={history}>
          <Routes/>
      </Router>
    </Provider>
  )
}