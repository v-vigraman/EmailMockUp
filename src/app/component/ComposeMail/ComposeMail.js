import React from 'react'
import './ComposeMail.css'
import MailMenuAction from '../../redux/MailMenuRedux'
import {connect } from 'react-redux';
import ComposeMailToolBar from './ComposeMailToolBar';
import CustomButton from "../Common/CustomButton";
import Autocomplete from "../Common/AutoComplete";
import { extractValueFromArrObj } from '../../helpers/utils';
import ReactHtmlParser from "react-html-parser";


const draftButtonStyle = {
    backgroundVolor: "rgb(0, 137, 255)",
    width: "100px",
    height: "40px",
    fontSize: "14px",
    color: "#6b6b6b",
    background: "#cecece",
    fontWeight: "600"
}

const sendButtonStyle = {
    backgroundVolor: "rgb(0, 137, 255)",
    width: "100px",
    height: "40px",
    fontSize: "14px",
    color: "rgb(255, 255, 255)",
    background: "rgb(58, 149, 255)",
    fontWeight: "600"
}

class ComposeMail extends React.Component {

    constructor(props) {
        super(props);
        this.state= {
            viewTotalMessages: false,
            subject: ""
        }
    }

    viewAllMessages = () => {
        this.setState({viewTotalMessages: true});
    }

    handleChange = (key, e) => {
        this.setState({[key]: e.target.value});
    }

    sendMail = () => {
        const {currentUser, composeNewMail, sendMail, composeMailData} = this.props;
        const {subject} = this.state;
        if(composeNewMail.to || composeMailData) {
            const message = document.getElementById("compose-content");
            const data = {
                from: currentUser.email,
                to: composeNewMail.to || composeMailData.from,
                userName: currentUser.fName +" "+ currentUser.lName,
                subject: subject || composeMailData.subject,
                message: message.innerHTML,
                id: composeNewMail.id || composeMailData.id,
            }
            sendMail(data);
        } else {
            alert("Add Receiver Mail Id")
        }
    }

    render() {
        const {closeComposeMail, composeMailData, isNew, userList, currentUser} = this.props;
        const { viewTotalMessages } = this.state;
        const emailIds = extractValueFromArrObj(userList, 'email', currentUser);
        const whoSent = userList.find(user => {
            if(composeMailData.to === currentUser.email) {
                if(user.email === composeMailData.from) {
                    return user
                }
            } else {
                if(user.email === composeMailData.to) {
                    return user
                }
            }
        })
        return(
            <div className="compose-mail-wrapper">
                <div className="compose-mail-header">
                    <div className="compose-mail-title">
                        {!isNew ?
                        composeMailData.subject:
                        <input type="text" className="subject" name="subject" onChange={(e) => this.handleChange('subject', e)} placeholder="Subject"/>
                    }
                    </div>
                    <div className="compose-mail-close">
                        <i className="fa fa-times" style={{color: "white",fontSize: "20px"}} onClick={() => closeComposeMail()}></i>
                    </div>
                </div>
                <div className="compose-mail-addr-func">
                    <div className="compose-mail-addr-user">
                        {
                            isNew ? 
                            <div className="compose-mail-to-user">
                                <Autocomplete suggestions={emailIds}
                                />
                            </div>: 
                            <div>
                                {
                                    whoSent.fName +" "+ whoSent.lName+" To Me"
                                }
                            </div>
                        }
                    </div>
                    <div className="compose-mail-addr-left-func">
                        <i className="fa fa-star"></i>
                        <i className="fa fa-reply-all" aria-hidden="true"></i>
                        <i className="fa fa-reply" aria-hidden="true"></i>
                        <i className="fa fa-trash"></i>
                        <i className="fa fa-chevron-down"></i>
                    </div>
                </div>
                {
                    !isNew && !viewTotalMessages && composeMailData.olderMessages.length > 0?
                        <div className="compose-mail-older" onClick={() => this.viewAllMessages()}>
                            <span>{composeMailData.olderMessages.length} Older Messages</span>
                            <i className="fa fa-chevron-down"></i>
                        </div> :
                        null
                }
                <div className="compose-mail-content">
                    <div className="compose-mail-content-list">
                        {
                            !isNew && viewTotalMessages && composeMailData.olderMessages.map(message => 
                                <p>
                                    {ReactHtmlParser(message)}
                                </p>
                            )
                        }
                        {!isNew ? <p>{ReactHtmlParser(composeMailData.message)}</p> : null}
                    </div>
                </div>
                {
                    !isNew ?
                        <div className="compose-mail-split-line">
                            <hr/>
                        </div> :
                        null
                }
                <ComposeMailToolBar userList={userList} currentUser={currentUser}  composeMailData={composeMailData} isNew={isNew}/>
                <div className="compose-mail-button">
                    <CustomButton btnText={"DRAFT"} btnStyle={draftButtonStyle}/>
                    <CustomButton btnText={"SEND"} btnStyle={sendButtonStyle} sendMail={() => this.sendMail()} />
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    composeMailData: state.mailMenu.composeMailData,
    composeNewMail: state.mailMenu.composeNewMail,
    isNew: state.mailMenu.isNew,
    userList: state.user.userList,
    currentUser: state.user.currentUser
})

const mapDispatchToProps = {
    closeComposeMail: MailMenuAction.closeComposeMail,
    sendMail: MailMenuAction.sendMail
}

export default connect(mapStateToProps, mapDispatchToProps)(ComposeMail);