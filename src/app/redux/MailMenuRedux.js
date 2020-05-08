import { createActions, createReducer } from 'reduxsauce'

/* ------------- Types & Action Creators ------------- */

const { Types, Creators } = createActions({
    selectMenu: ['payload'],
    composeNewMail: ['payload'],
    selectMailList: ['payload'],
    setComposeMailData: ['payload'],
    closeComposeMail: null,
    setToMailId: ['payload'],
    sendMail: ['payload']
})

export const UserTypes = Types
export default Creators

/* ------------- Initial State -------------*/

export const INITIAL_STATE = {
    selectedMenu: "00",
    isComposeOpen: false,
    selectedMailList: 0,
    composeMailData: {},
    composeNewMail: {
        id: "",
        seen: false,
        from: "",
        to: "",
        userName: "",
        subject: "",
        message: "",
        type: "Primary",
        olderMessages: [],
        isDraft: false,
        isThread: false,
        sendBySender: true,
        sendByReceiver: false
    },
    mailList: [],
    isNew: false
}

/* ------------- Reducers ------------- */

export const selectMenu = (state, {payload}) => {
    return {...state, selectedMenu: payload.index}
}

export const composeNewMail = (state, {payload}) => {
    const {composeNewMail} = state;
    composeNewMail.from = payload.from;
    composeNewMail.userName = payload.userName;
    composeNewMail.isDraft = false;
    return {...state, isComposeOpen: true, composeNewMail, isNew: true}
}

export const selectMailList = (state, {payload}) => {
    return {...state, selectedMailList: payload.index}
}

export const setComposeMailData = (state, {payload}) => {
    return{...state, composeMailData: payload, isComposeOpen: true, isNew: false}
}

export const closeComposeMail = (state) => {
    return {...state, isComposeOpen: false}
}

export const setToMailId = (state, {payload}) => {
    const {composeNewMail} = state;
    composeNewMail.id = '_' + Math.random().toString(36).substr(2, 9);
    composeNewMail.to = payload.email;
    return {...state, composeNewMail}
}

export const sendMail = (state, {payload}) => {
    const {mailList, composeNewMail} = state;
    let added = false;
    if(mailList.length > 0) {
        mailList.map(message => {
            if(!added) {
                if((message.to === payload.to || message.from === payload.to || message.to === payload.from)) {
                    if(message.id === payload.id) {
                        message.olderMessages.push(message.message);
                        message.message = payload.message;
                        message.seen = false;
                        message.isDraft = false;
                        message.isThread = true;
                        added = true;
                        if(message.to === payload.from) {
                            message.sendByReceiver = true;
                        }
                    }
                }
            }
        })
    } 
    if(!added) {
        composeNewMail.from = payload.from;
        composeNewMail.to = payload.to;
        composeNewMail.subject = payload.subject;
        composeNewMail.message = payload.message;
        composeNewMail.seen = false;
        composeNewMail.isDraft = false;
        composeNewMail.userName = payload.userName;
        mailList.push(composeNewMail);
        added = true;
    }
    const composeNewMailInitial = setComposeMailToInitialState()
    return {...state, mailList, composeNewMail: composeNewMailInitial, isComposeOpen: false}
}

const setComposeMailToInitialState = () => {
    return  {
        id: "",
        seen: false,
        from: "",
        to: "",
        userName: "",
        subject: "",
        message: "",
        type: "Primary",
        olderMessages: [],
        isDraft: false
    }
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
    [Types.SELECT_MENU]: selectMenu,
    [Types.COMPOSE_NEW_MAIL]: composeNewMail,
    [Types.SELECT_MAIL_LIST]: selectMailList,
    [Types.SET_COMPOSE_MAIL_DATA]: setComposeMailData,
    [Types.CLOSE_COMPOSE_MAIL]: closeComposeMail,
    [Types.SET_TO_MAIL_ID]: setToMailId,
    [Types.SEND_MAIL]: sendMail
})