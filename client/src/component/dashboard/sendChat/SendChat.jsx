import axios from 'axios'
import React, { useEffect, useState } from 'react'


const SendChat = (props) => {
    const [chatId, setChatId] = useState()
    const [text, setText] = useState('')

    const url = process.env.REACT_APP_API

    const handleSend = async (e) => {
        if (e.key === 'Enter') {
            await axios.post(`${url}/chat/sendChat`, {
                chatId: chatId,
                text: text
            })

            props.call(chatId)
            setText('')
        }
    }


    useEffect(() => {
        setChatId(props.chatId);
    }, [props.chatId])

    return (
        <div className="input-group mb-0">
            <input
                type="text"
                className="form-control"
                name='text'
                placeholder="Nhập Tin Nhắn ....."
                value={text}
                onChange={e => setText(e.target.value)}
                onKeyDown={e => handleSend(e)} />
        </div>
    )
}

export default SendChat