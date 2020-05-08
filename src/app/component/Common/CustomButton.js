import React from 'react'
import '../../../global.css'
import MailMenuAction from '../../redux/MailMenuRedux'
import { connect } from 'react-redux'
class CustomButton extends React.Component {

    doSomeAction = () => {
        const {btnText, composeNewMail, currentUser, sendMail} = this.props;
        switch (btnText) {
            case "COMPOSE":
                composeNewMail(currentUser);
                break;
            case "DRAFT":
                break;
            case "SEND":
                sendMail();
                break;
            default:
                break;
        }
    }

    render() {
        const { btnText, btnStyle } = this.props;
        return(
            <div className="custom-btn" style={btnStyle} onClick={() => this.doSomeAction()}>
                <div>
                    {btnText}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    currentUser: state.user.currentUser
})

const mapDispatchToProps = {
    composeNewMail: MailMenuAction.composeNewMail
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomButton);