import React from 'react'
class CustomAvatar extends React.Component {

    openUser = () => {
        const {isHeader} = this.props;
        if(isHeader) {
            this.props.onClick()
        }
    }

    render() {
        const { style, image } = this.props;
        return (
            <div onClick={() => this.openUser()}>
                <img src={image} style={style} alt="profile pic"/>
            </div>
        )
    }
}

export default CustomAvatar;