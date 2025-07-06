import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext';
import Sidebar from './components/Sidebar';
import MessageContainer from './components/MessageContainer';
import { isObjectIdOrHexString } from 'mongoose';

const Home = () => {
    const {authUser} =useAuth();
    const [selectedUser,setSelectUser] =useState(null);
    const [isSidebarVisible,setisSidebarVisible]=useState(true);

    const handleUserSelect=(user)=>{
      setSelectUser(user);
      setisSidebarVisible(false);
    }

    const handleShowSidebar=()=>{
      setisSidebarVisible(true);
      setSelectUser(null);
    }

  return (
    <div className='flex justify-between min-w-full
     md:min-w-[550px] md:max-w-[65%]
      px-2 h-[95%] md:h-full  
      rounded-xl shadow-lg
       bg-gray-400 bg-clip-padding
        backdrop-filter backdrop-blur-lg 
        bg-opacity-0 ' 
        >
          {/*  leftside part*/}
          <div className={`w-full py-2 md:flex ${isSidebarVisible? '': 'hidden'}`} >
              <Sidebar onSelectUser={handleUserSelect}/>
          </div>
          {/* right side part */}
           <div className={`divider divider-horizontal px-3 md:flex
                 ${isSidebarVisible ? '' : 'hidden'} ${selectedUser ? 'block' : 'hidden'}`}></div>
            <div className={`flex-auto ${selectedUser ? '' : 'hidden md:flex'} bg-gray-200}`}>
            <MessageContainer onBackUser={handleShowSidebar}/>
            </div>
        </div>
  )
}

export default Home
