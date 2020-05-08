import { reducer as user } from './UserRedux'
import { reducer as mailMenu } from './MailMenuRedux'
import { combineReducers } from 'redux'

const reducers = combineReducers({
    user,
    mailMenu
})

export default reducers;
