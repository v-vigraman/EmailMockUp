import React from 'react'
import './SideBar.css'
import CustomButton from '../Common/CustomButton'
import {SIDE_BAR_MENU_ITEMS, CIRCLE_CLASS} from '../../helpers/constants'
import { connect } from 'react-redux'
import MailMenuAction from '../../redux/MailMenuRedux';
const composeBtnStyle = {
    backgroundColor: "rgb(58, 149, 255)",
    width: "200px",
    height: "40px",
    color: "white",
    fontSize: "14px"
}

class SideBar extends React.PureComponent {

    selectMenu = (index) => {
        const { selectMenu } = this.props;
        selectMenu({index: index})
    }

    render() {
        const {selectedMenu} = this.props;
        return (
            <div className="sidebar-wrapper">
                <div className="sidebar-button">
                    <CustomButton btnText={"COMPOSE"} btnStyle={composeBtnStyle}/>
                </div>
                <div className="sidebar-menu">
                    {
                        SIDE_BAR_MENU_ITEMS.map((data, index) => 
                            <ul key={index}>
                                {data.item !== '' ? <li key={index}>{data.item}</li> : null}
                                {
                                    data.subItems.map((subItem, i) => 
                                        <li key={`${index}${i}`} className={`${selectedMenu === `${index}${i}` ? "active" : ""}`} onClick={() => this.selectMenu(`${index}${i}`)} >
                                            {index === 1 ?
                                                <i className="fa fa-dot-circle-o" style={{color: `${CIRCLE_CLASS[i]}`, paddingRight: "10px", paddingTop: "2px"}}></i>
                                                :
                                                null
                                            }
                                            {subItem}
                                        </li>
                                    )
                                }
                            </ul>
                        )
                    }
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    selectedMenu: state.mailMenu.selectedMenu
})

const mapDispatchToProps = {
    selectMenu: MailMenuAction.selectMenu
}

export default connect(mapStateToProps, mapDispatchToProps)(SideBar);