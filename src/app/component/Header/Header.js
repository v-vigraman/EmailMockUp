import React from 'react'
import './Header.css'
import Google from '../../../assets/images/download.png'
import CustomAvatar from '../Common/CustomAvatar'
import {connect} from 'react-redux'
import UserAction from '../../redux/UserRedux'

const avatarStyle = {
    width: "40px",
    borderRadius: "30px",
    height: "40px"
}

class Header extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            listOpen: false
        }
    }

    setCurrentUser = (user) => {
        this.props.setCurrentUser(user);
        this.setState({listOpen: false})
    }

    render() {
        const {user, userList} = this.props;
        const {listOpen} = this.state;
        return(
            <div className='header-wrapper'>
                <div className="mail-header-left">
                    <img src={Google} alt="google" />
                </div>
                <div className="mail-header-mid">
                    <form className="mail-header-search">
                        <input type="text" placeholder="Search.." name="search" />
                        <button type="submit"><i className="fa fa-search"></i></button>
                    </form>
                </div>
                <div className="mail-header-right">
                    <i className="fa fa-comment comment-rotate"></i>
                    <i className="fa fa-th"></i>
                    <i className="fa fa-bell"></i>
                    <CustomAvatar style={avatarStyle} image={user.profilePic} onClick={() => this.setState({listOpen: !listOpen})} isHeader={true} />
                    {listOpen ? 
                        <ul className="dd-list">
                            {userList.map((item) => (
                                item.email !== user.email ?
                                <li className="dd-list-item" key={item.id} onClick={() => this.setCurrentUser(item)}>{item.email}</li> : null
                            ))}
                        </ul> : null
                    }
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    userList: state.user.userList
})

const mapDispatchToProps = {
    setCurrentUser: UserAction.setCurrentUser
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);