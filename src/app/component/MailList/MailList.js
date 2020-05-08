import React from 'react'
import MailListTitle from './MailListTitle'
import { connect } from 'react-redux'
import { MAIL_HEADER } from '../../helpers/constants';
import MailMenuAction from '../../redux/MailMenuRedux'
import ReactHtmlParser from "react-html-parser";
import {replaceImageWithDiv} from '../../helpers/utils'
class MailList extends React.Component {

    openMailBox = (item) => {
        this.props.setComposeMailData(item)
    }

    render() {
        const {selectedMailList, currentUser, mailList} = this.props;
        console.log(mailList)
        const mailData = mailList.filter(mail => {
            if(mail.to === currentUser.email || (mail.from === currentUser.email && mail.isThread && mail.sendByReceiver)) {
                return true
            } else {
                return false;
            }
        })
        return (
            <div className="mail-list-wrapper">
                <MailListTitle/>
                {
                    mailData.map((item, index) => 
                    MAIL_HEADER[selectedMailList].title === item.type ?
                        <div key={index} className="mail-list-item">
                            <div className="mail-list-check" style={{width: "5%"}}>
                                <input type="checkbox" className="mail-list-checkbox"/>
                            </div>
                            <div className="mail-list-eye" style={{width: "5%"}}>
                                <i className="fa fa-eye" aria-hidden="true" onClick={() => this.openMailBox(item)} style={{color: item.seen ? "#929394" : "rgb(0, 0, 0)"}}></i>
                            </div>
                            <div className="mail-list-item-subject" style={{width: "15%"}}>
                                <div className="mail-list-item-from">{item.userName}</div>
                                {item.olderMessages.length > 0 ? <div className="unread-messages">{item.olderMessages.length}</div>: ''}
                            </div>
                            <div className="mail-list-item-content" style={{width: "75%"}}>
                                {item.subject} - {ReactHtmlParser(replaceImageWithDiv(item.message))}
                            </div>
                        </div>: null
                    )
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    selectedMailList: state.mailMenu.selectedMailList,
    currentUser: state.user.currentUser,
    mailList: state.mailMenu.mailList
})

const mapDispatchToProps = {
    setComposeMailData: MailMenuAction.setComposeMailData
}

export default connect(mapStateToProps, mapDispatchToProps)(MailList);