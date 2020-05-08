import React from "react"
import Picker, { SKIN_TONE_MEDIUM_DARK } from 'emoji-picker-react';

class ComposeMailToolBar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isEmojiOpened: false
        }
    }

    uploadImage = () => {
        const imageInput = document.getElementById("image-upload");
        imageInput.click();
        document.getElementById("image-upload").addEventListener("change", (e) => {
            const input = e.target;
            if (input.files && input.files[0]) {
              const file = input.files[0];
              const reader = new FileReader();
              reader.readAsDataURL(file);
              reader.onload = (e) => {
                this.setState({profilePic: reader.result});
                const imageEl = document.createElement("img");
                imageEl.src = reader.result;
                document.getElementById("image-tag").appendChild(imageEl)
              }
            }
        })
    }

    onEmojiClick = (event, emojiObject) => {
        let mailData = document.getElementById("compose-content");
        mailData.innerHTML += emojiObject.emoji
    }

    render() {
        const {userList, composeMailData, isNew, currentUser} = this.props;
        const {isEmojiOpened} = this.state;
        const receiver = userList.find(user => {
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
        return (
            <div className="compose-mail-toolbar">
                <div className="compose-mail-toolbar-box">
                    {
                       !isNew ?
                            <div className="compose-mail-toolbar-header">
                                <div className="compose-mail-reply">
                                    <i className="fa fa-reply" aria-hidden="true"></i>
                                    <i className="fa fa-chevron-down"></i>
                                    <span>{receiver.fName}{receiver.lName}</span>
                                </div>
                            </div> : null
                    }
                    <div className="compose-mail-creation" contentEditable id="compose-content" suppressContentEditableWarning={true}>
                        <div id="image-tag">

                        </div>
                    </div>
                    <div className="compose-mail-toolbar-footer">
                        <div className="compose-mail-footer-func">
                            <div>
                                <i className="fa fa-pencil" aria-hidden="true"></i>    
                            </div>
                            <div>
                                <i className="fa fa-paperclip"></i>
                            </div>
                            <div>
                                <i className="fa fa-image" onClick={() => this.uploadImage()}></i>
                            </div>
                            <div>
                                <i className="fa fa-link"></i>
                            </div>
                            <div>
                                <i className="fa fa-smile-o" aria-hidden="true" onClick={() => this.setState({isEmojiOpened: !isEmojiOpened})}></i>
                            </div>
                        </div>
                        {  isEmojiOpened ? <Picker onEmojiClick={this.onEmojiClick} skinTone={SKIN_TONE_MEDIUM_DARK}/> : null }
                    </div>
                </div>
                <div className="image-upload">
                    <input type="file" accept="image/x-png,image/jpeg" className="image-wid-mail" id="image-upload"/>
                </div>
            </div>
        )
    }
}

export default ComposeMailToolBar;