import { createStore } from 'redux'

import reducers from './app/redux/index'

export const store = createStore(reducers)
