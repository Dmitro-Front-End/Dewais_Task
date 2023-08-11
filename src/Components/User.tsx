import { FC, memo, useState } from "react"
import { iUser } from "../interfice/interface"
import { noAvatar } from "../linkImges"
import './user.scss'

const User : FC<iUser> = ({name, login, avatar_url, html_url, location}) => {
    const [avatar, setAvatar] = useState<string>(avatar_url ? avatar_url : noAvatar)

    const changeAvatar = () : void => setAvatar(noAvatar)

    const openProfile = () => window.open(html_url)
    
    return <div className="user-c">
        <img className="userAvatar" src={avatar} onError={changeAvatar} />

        <div className="userInfo">
            <p className="userName">{name ? name : 'unknown'}</p>
            <p className="userLocation"> location : {location ? location : 'did not provide ' }</p>
        </div>

        <button className="userProfile" onClick={openProfile}>view profile</button>

    </div>
}

const checkRender = (prev : iUser, next : iUser) : boolean => {

    return true;
}

export default memo(User, checkRender)