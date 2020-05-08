import React from 'react'
import {MAIL_HEADER} from '../../helpers/constants'
import './MailList.css'
import MailMenuAction from '../../redux/MailMenuRedux'
import { connect } from 'react-redux'

class MailListTitle extends React.Component {
    render() {
        const {selectMailList, selectedMailList} = this.props;
        return (
            <div className="mail-list-title">
                <ul>
                    {
                        MAIL_HEADER.map((item, i)=> 
                            <li key={i} className={i === selectedMailList ? "active" : ""} onClick={() => selectMailList({index: i})}>
                                <i className={`fa ${item.icon}`}></i>
                                <span>{item.title}</span>
                            </li>    
                        )
                    }
                </ul>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    selectedMailList: state.mailMenu.selectedMailList
})

const mapDispatchToProps = {
    selectMailList: MailMenuAction.selectMailList
}

export default connect(mapStateToProps, mapDispatchToProps)(MailListTitle);