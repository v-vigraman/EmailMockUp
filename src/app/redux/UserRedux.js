import { createActions, createReducer } from 'reduxsauce'
import Doodle from '../../assets/images/doodle.png'
import Normal from '../../assets/images/normal.jpg'
/* ------------- Types & Action Creators ------------- */

const { Types, Creators } = createActions({
    addUser: ['payload'],
    setInitialState: null,
    setCurrentUser: ['payload']
})

export const UserTypes = Types
export default Creators

/* ------------- Initial State -------------*/

export const INITIAL_STATE = {
    userList:  [
        {
          "fName": "Vigraman",
          "lName": "V",
          "email": "vigramanmoorthy@gmail.com",
          "profilePic": Normal
        },
        {
          "fName": "Doodle",
          "lName": "Blue",
          "email": "doodle@doodleblue.com",
          "profilePic": Doodle
        }
      ],
    isAlreadyRegistered: false,
    successfullyRegistered: false,
    onSubmitError: false,
    currentUser: {
        "fName": "Doodle",
        "lName": "Blue",
        "email": "doodle@doodleblue.com",
        "profilePic": Doodle
      }
}

/* ------------- Reducers ------------- */

export const addUser = (state, {payload}) => {
    const list = [...state.userList]
    if(payload.fName !== '' && payload.lName !== '' && payload.email !== '' && payload.profilePic !== null) {
        const userList = list.filter(user => user.email === payload.email);
        if(userList.length === 0) {
            list.push(payload);
            return {...state, userList: list, isAlreadyRegistered: false, successfullyRegistered: true, currentUser: payload}
        } else {
            return {...state, isAlreadyRegistered: true, onSubmitError: true}
        }
    } else {
        return {...state, onSubmitError: true}
    }
}

export const setCurrentUser = (state, {payload}) => {
    return {...state, currentUser: payload}
}

export const setInitialState = (state) => {
    return {...state, successfullyRegistered: false, onSubmitError: false}
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
    [Types.ADD_USER]: addUser,
    [Types.SET_INITIAL_STATE]: setInitialState,
    [Types.SET_CURRENT_USER]: setCurrentUser
})