import React from 'react'
import '../../global.css'
import UserAction from '../redux/UserRedux'
import { connect } from 'react-redux'
import {validateEmail} from '../helpers/utils'
class CreateUser extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            fName: '',
            lName: '',
            email: '',
            profilePic: null,
            emailValidateError: false
        }
    }

    componentDidMount() {
        this.props.setInitialState();
    }

    componentDidUpdate(prevProps, prevState) {
        const { setInitialState, successfullyRegistered } = this.props;
        if(successfullyRegistered){
            setInitialState();
            this.props.history.push("/mail");
        }
    }

    handleChange = (key, e) => {
        this.setState({ [key]:  e.target.value});
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const {addUser} = this.props;
        const payload = {...this.state};
        if(validateEmail(payload.email)) {
            this.setState({emailValidateError: false})
            addUser(payload);
        } else {
            this.setState({emailValidateError: true})
        }
    }

    selectProfilePic = (e) => {
        const profilePicInputEl = document.getElementById("user-profile-pic")
        profilePicInputEl.click();
        document.getElementById("user-profile-pic").addEventListener("change", (e) => {
            const input = e.target;
            if (input.files && input.files[0]) {
              const file = input.files[0];
              const reader = new FileReader();
              reader.readAsDataURL(file);
              reader.onload = (e) => {
                this.setState({profilePic: reader.result});
                const profilePicEL = document.getElementById("profile");
                profilePicEL.style.backgroundImage = `url(${reader.result})`
                profilePicEL.classList.add("hasImage")
              }
            }
        })
    }


    render() {
        const { isAlreadyRegistered, onSubmitError } = this.props;
        const {fName, lName, email, profilePic, emailValidateError} = this.state;
        return (
            <div className='wrapper'>
                <div className='form-wrapper'>
                <h2>Create User</h2>
                <form onSubmit={this.handleSubmit}>
                    <div className='firstName'>
                        <label htmlFor="firstName">First Name</label>
                        <input type='text' name='firstName' onChange={(e) => this.handleChange('fName', e)}/>
                        <span className="error">{onSubmitError && fName === ''? "*required" : ""}</span>
                    </div>
                    <div className='lastName'>
                        <label htmlFor="lastName">Last Name</label>
                        <input type='text' name='lastName' onChange={(e) => this.handleChange('lName', e)}/>
                        <span className="error">{onSubmitError && lName === '' ? "*required" : ""}</span>
                    </div>
                    <div className='email'>
                        <label htmlFor="email">Email</label>
                        <input type='email' name='email' onChange={(e) => this.handleChange('email', e)}/>
                        <span className="error">
                            {onSubmitError && isAlreadyRegistered ? "This Email I'd was already registered" : ""}
                            {onSubmitError && email === '' ? "*required" : ""}
                            {emailValidateError ? "Enter Valid Mail I'D" : ""}
                        </span>
                    </div>
                    <div className="profile-pic">
                        <div id="profile" onClick={() => this.selectProfilePic()}>
                            <div className="dashes"></div>
                            {profilePic === null && !onSubmitError ?<label className="profile-label">Click upload profile picture</label>: null}
                            {onSubmitError && profilePic === null ?<label className="profile-label-error">Profile pic is mandatory</label>: ""}
                        </div>
                    </div>
                    <div className="user-profile-pic-input">
                        <input type="file" id="user-profile-pic" accept="image/x-png,image/jpeg"/>
                    </div>
                    <div className='submit'>
                    <button className="create-btn">Create</button>
                    </div>
                </form>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    userList: state.user.userList,
    isAlreadyRegistered: state.user.isAlreadyRegistered,
    successfullyRegistered: state.user.successfullyRegistered,
    onSubmitError: state.user.onSubmitError
})

const mapDispatchToProps = {
    addUser: UserAction.addUser,
    setInitialState: UserAction.setInitialState
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateUser);