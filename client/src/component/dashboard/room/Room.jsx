import React from 'react'

const Room = (props) => {


    return (
        <li className="clearfix mt-2 mb-4" onClick={() => props.callback(props.rData)}>
            <img src="https://cdn-icons-png.flaticon.com/512/426/426327.png" alt="avatar" />
            <div className="about">
                <div className="name h1">
                    <span>{props.rData.firstName}</span>
                    <span> {props.rData.lastName}</span>
                    <span>{props.rData.title}</span>
                </div>
                <div className="status">{props.rData.type}</div>
            </div>
        </li >
    )
}

export default Room