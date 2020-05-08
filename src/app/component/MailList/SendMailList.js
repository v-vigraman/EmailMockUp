import React from "react"
import {connect} from "react-redux"
import MailMenuAction from "../../redux/MailMenuRedux"
class SendMailList extends React.Component {

    openMailBox = (item) => {
        this.props.setComposeMailData(item)
    }

    render() {
        const {mailList, currentUser} = this.props;
        const mailData = mailList.filter(mail => {
            if(mail.from === currentUser.email || (mail.to === currentUser.email && mail.isThread)) {
                return true
            } else {
                return false;
            }
        })
        return (
                mailData.map((item, index) => 
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
                        {item.subject} - {item.message}
                    </div>
                </div>       
            )
        )
    }
}

const mapStateToProps = (state) => ({
    mailList: state.mailMenu.mailList,
    currentUser: state.user.currentUser
})

const mapDispatchToProps = {
    setComposeMailData: MailMenuAction.setComposeMailData
}

export default connect(mapStateToProps, mapDispatchToProps)(SendMailList);