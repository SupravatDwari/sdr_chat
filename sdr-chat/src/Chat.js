import React, { useState } from 'react'
import "./Chat.css";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import {Avatar, IconButton } from '@material-ui/core';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import MicIcon from '@material-ui/icons/Mic';
import axios from './axios';


function Chat({messages}) {
    const [input, setInput] = useState("");

    const sendMessage = async (e) => {
        console.log("message type")
        e.preventDefault();
        let timestamp = Date.now();
        let d = new Date(timestamp);
      	timestamp = d.toLocaleTimeString().split(":")
        let messageTime = timestamp[0]+":"+timestamp[1];
        await axios.post('/messages/new', {
            message: input,
            name: 'Supravat',
            timestamp: messageTime,
            received: true,
        });

        setInput('');
    };


    return (
        <div className="chat">

            {/* chat header */}
            <div className="chat_header">
            <Avatar src={`https://cdn-icons.flaticon.com/png/512/924/premium/924915.png?token=exp=1660767454~hmac=1b508e29b3f6553023cb69006748f25e`}/>
                <div className="chat_headerInfo">
                    <h3>Supravat</h3>
                    <p>last seen</p>
                </div>

                <div className="chat_headerRight">
                    <IconButton>
                        <SearchOutlinedIcon />
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon/>
                    </IconButton>
                </div>
            </div>
            {/* chat header end */}

            {/* chat body */}
            {/* scrollbar-thin */}
            <div className="chat_body scrollbar-thin">
                {messages.map((message) => (
                        <p className={`chat_message ${message.received && 'chat_receiver'}`}>
                        <span className="chat_name">{message.name}</span>
                            {message.message}
                        <span className="chat_timestamp">
                            {message.timestamp}
                        </span>
                        </p>
                ))}
                
            </div>
            {/* chat body end */}

            {/* chat footer */}
            <div className="chat_footer">
                <IconButton>
                    <InsertEmoticonIcon />
                </IconButton>
                <IconButton>
                    <AttachFileIcon />
                </IconButton> 
                <form >
                    <input value={input} onChange={e => setInput(e.target.value)} placeholder="" type="text"/>
                    <button onClick={sendMessage} type="submit"></button>
                </form>
                <IconButton>
                    <MicIcon />
                </IconButton>

                    

            </div>

            {/* chat footer end */}

            
        </div>
    )
}

export default Chat