import React, { useEffect, useState } from 'react'

const SendChat = (props) => {
    const [Chat, setChat] = useState()


    useEffect(() => {
        console.log(props.chatId);

    }, [props.chatId])

    return (
        <div className="input-group mb-0">
            <input type="text" className="form-control" name='messager' placeholder="Nhập Tin Nhắn ....." />
        </div>
    )
}

export default SendChat