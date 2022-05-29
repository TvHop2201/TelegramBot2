import React, { useState } from 'react'
import axios from 'axios'
import gip from './giphy.gif'

const Chat = (props) => {
    const [user, setUser] = useState()

    const url = process.env.REACT_APP_API
    const fetchUser = async (fromId) => {
        const userData = await axios.get(`${url}/chat/getUserById/${fromId}`)
        setUser(userData.data.data);
    }
    fetchUser(props.chat.fromId)
    if (!user) {
        return (
            <img src={gip} className="mx-auto" width='100%' height='150px' alt="" />
        )
    }
    return (
        <li className="clearfix">

            {user.isBot ?
                <div className='bot_chat'>
                    <img src="https://images.pexels.com/photos/12240136/pexels-photo-12240136.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" className="rounded-circle m-2" width='50px' height='50px' alt="" />

                    <div className="message my-message shadow-lg">
                        <h5>Bot</h5>
                        <p>{props.chat.text}</p>
                    </div>
                    <span className="message-data-time">thời gian</span>
                </div>

                :

                <div className='float-right human_chat'>
                    <span className="message-data-time mx-3">thời gian</span>
                    <div className="message other-message shadow-lg">
                        <h6>
                            {user.firstName ? user.firstName : ''}
                            {user.lastName ? user.lastName : ''}
                        </h6>
                        <p>{props.chat.text}</p>
                    </div>
                    <img src="https://images.pexels.com/photos/12240136/pexels-photo-12240136.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" className="rounded-circle mx-3" width='50px' height='50px' alt="" />

                </div>
            }

        </li>
    )
}

export default Chat