import React from 'react'
import { useState, useEffect, useRef } from 'react';
import axios from "axios";
import Navbar from './navbar/Navbar';
import Room from './room/Room';
import Chat from './chat/Chat';
import './Dashboard.css'
import loadDingGif from './aa.gif'
import SendChat from './sendChat/SendChat';
import ScrollToBottom from 'react-scroll-to-bottom';
import io from 'socket.io-client'
const socket = io.connect('ws://localhost:4000')

const Dashboard = () => {
    const [room, setRoom] = useState([])
    const [titleChat, setTitleChat] = useState()
    const [chat, setChat] = useState([])
    const [chatId, setChatId] = useState()
    const [pageChat, setPageChat] = useState(1)


    const [roomPage, setRoomPage] = useState(1)
    const [loadDing, setLoadDing] = useState(false)

    const url = process.env.REACT_APP_API

    const getRoom = async () => {
        const RoomData = await axios.get(`${url}/chat/getRoom/${roomPage}`)
        if (RoomData.data) {
            setRoom(RoomData.data.data)
        }
        else {
            console.log(RoomData.data);
        }
    }

    const fetchChat = async (value) => {
        setChat([])
        const chatData = await axios.get(`${url}/chat/getChatUserById/${value}/1`)
        setChat((chatData.data.data).reverse())
        setPageChat(1)
    }
    const handleRoomSelect = (value) => {
        fetchChat(value.chatId);
        setTitleChat(value.firstName || value.title)
        setChatId(value.chatId)
    }

    const handleUpdateChat = async () => {
        setLoadDing(true)
        const chatData = await axios.get(`${url}/chat/getChatUserById/${chatId}/${pageChat}`)
        const result = (chatData.data.data).reverse()
        setChat((result.concat(chat)))
        setLoadDing(false)
    }

    useEffect(() => {
        if (pageChat > 1) {
            handleUpdateChat()
        }
    }, [pageChat])

    useEffect(() => {
        getRoom()
    }, [])


    useEffect(() => {
        socket.emit('chatId', chatId)
        socket.on('data', (data) => {
            if (data.length !== 0) {
                setChat(...chat, chat.concat(data))
            }
        })

    }, [chatId])

    const scrollRef = useRef()




    return (
        <div className="">
            <Navbar />
            <div className="row clearfix container mx-auto">
                <div className="col-lg-12">
                    <div className="card chat-app">
                        <div id="plist" className="people-list my-3">
                            <ul className="list-unstyled chat-list" >
                                {room.map(data => (
                                    <Room rData={data} key={data._id} callback={(value) => handleRoomSelect(value)} />
                                ))}
                            </ul>
                        </div>

                        <div className="chat">
                            <div className="chat-header clearfix" >
                                <div className="row">
                                    <div className="col-lg-6">
                                        <div className="chat-about">
                                            <h3 className="m-b-0">{titleChat ? titleChat : 'Telegram ChatBot'}</h3>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <hr />
                            <div className="chat-history" id='scroll_id' ref={scrollRef}>
                                <ul className="m-b-0 "  >
                                    <ScrollToBottom className='scroll'>
                                        {
                                            chatId ?
                                                <li className=''>

                                                    <button className='btn mx-auto' onClick={() => setPageChat(pageChat + 1)} >Tải thêm ...</button>
                                                    {loadDing ? <img src={loadDingGif} width='30px' /> : ''}
                                                </li>
                                                : ''
                                        }
                                        {chat.map(data => (
                                            <Chat chat={data} key={data.chat._id} />
                                        ))}

                                    </ScrollToBottom>

                                </ul>
                            </div>
                            <div className="chat-message clearfix">
                                <SendChat chatId={chatId} call={(value) => fetchChat(value)} />
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </div >
    )
}

export default Dashboard