import React from 'react'
import Header from '../component/Header/Header';
import ComposeMail from '../component/ComposeMail/ComposeMail'
import SideBar from '../component/SideBar/SideBar'
import MailList from '../component/MailList/MailList'
import MailMenuAction from '../redux/MailMenuRedux'
import {connect} from 'react-redux'
import SendMailList from '../component/MailList/SendMailList';

class MailPage extends React.Component {
    render() {
        const {isComposeOpen, currentUser, selectedMenu} = this.props;
        return(
            <div className="mail-wrapper">
                <Header user={currentUser}/>
                <div className="mail-body-wrapper">
                    <SideBar/>
                    <div className="mail-list-body-wrapper">
                        <div className="mail-list-body-header">
                            <div className="mail-list-action">
                                <div className="mail-action-check">
                                    <i className="fa fa-square-o" aria-hidden="true"></i>
                                    <i className="fa fa-chevron-down"></i>
                                </div>
                                <i className="fa fa-repeat"></i>
                            </div>
                        </div>
                        {
                            selectedMenu === "00" ? <MailList/> : null
                        }
                        {
                            selectedMenu === "03" ? < SendMailList/> : null
                        }
                    </div>
                </div>
                { isComposeOpen ? 
                    <ComposeMail/> : null
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    isComposeOpen: state.mailMenu.isComposeOpen,
    currentUser: state.user.currentUser,
    selectedMenu: state.mailMenu.selectedMenu
})

const mapDispatchToProps = {
    toggleCompose: MailMenuAction.toggleCompose
}

export default connect(mapStateToProps, mapDispatchToProps)(MailPage);