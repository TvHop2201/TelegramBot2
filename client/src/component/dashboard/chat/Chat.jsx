import React, { useState, useEffect } from 'react'
import gip from './giphy.gif'

const Chat = (props) => {
    const [date, setDate] = useState()
    useEffect(() => {
        if (props.chat.user.isBot) {
            setDate(new Date((props.chat.chat.date * 1000) / 1000).toDateString())
        } else {
            setDate(new Date((props.chat.chat.date * 1000) / 1000).toDateString())
        }

    }, [])



    if (!props.chat) {
        return (
            <img src={gip} className="mx-auto" width='100%' height='150px' alt="" />
        )
    }
    return (
        <li className="clearfix">

            {props.chat.user.isBot ?
                <div className='bot_chat'>
                    <img src="https://images.pexels.com/photos/12240136/pexels-photo-12240136.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" className="rounded-circle m-2" width='50px' height='50px' alt="" />

                    <div className="message my-message shadow-lg">
                        <h5>Bot</h5>
                        <p>{props.chat.chat.text}</p>
                    </div>
                    <span className="message-data-time">{date}</span>
                </div>

                :

                <div className='float-right human_chat'>
                    <span className="message-data-time mx-3">{date}</span>
                    <div className="message other-message shadow-lg">
                        <h6>
                            {props.chat.user.firstName ? props.chat.user.firstName : ''}
                            {props.chat.user.lastName ? props.chat.user.lastName : ''}
                        </h6>
                        <p>{props.chat.chat.text}</p>
                    </div>
                    <img src="https://images.pexels.com/photos/12240136/pexels-photo-12240136.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" className="rounded-circle mx-3" width='50px' height='50px' alt="" />

                </div>
            }

        </li>
    )
}

export default Chat