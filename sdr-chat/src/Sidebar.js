import React from 'react'
import "./Sidebar.css";
import ChatIcon from '@material-ui/icons/Chat';
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import {Avatar, IconButton} from '@material-ui/core';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import SidebarChat from './SidebarChat';
function Sidebar({lastmessage}) {
    
    return (
        <div className="sidebar">


            {/* sidebar icon header */}
            <div className="sidebar_header">
                <IconButton>
                    <Avatar src="https://avatars.githubusercontent.com/u/58618647?v=4" />
                </IconButton>
               <div className="sidebar_headerRight">
                    <IconButton>
                        <DonutLargeIcon />
                    </IconButton>
                    <IconButton>
                        <ChatIcon />
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon/>
                    </IconButton>
               </div>
            </div>
            {/* sidebar icon header end */}


            {/* sidebar search bar  */}
            <div className="sidebar_search">
                <div className="sidebar_searchContainer">
                    <SearchOutlinedIcon />
                    <input type="text" name="" id="" placeholder="Search or start new chat"/>
                </div>
            </div>
            {/* sidebar search bar end */}

            {/* user chat block */}
            <div className="sidebar_chats">

                <div className="sidebarChat">
                    <Avatar src={`https://cdn-icons.flaticon.com/png/512/924/premium/924915.png?token=exp=1660777282~hmac=6b03557d971cf454a1f7d74495bc74c0`}/>
                    <div className="sidebarChat_info">
                        <h2>Supravat</h2>
                        <p>{lastmessage}</p>
                        
                    </div>
                </div>

              

                
            </div>
            {/* user chat block end */}


        </div>
    )
}

export default Sidebar