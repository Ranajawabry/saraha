import axios from "axios";
import copy from "copy-to-clipboard";
import jwtDecode from "jwt-decode";
import React, { useEffect, useState } from "react";
import cookie from "react-cookies";
import { toast } from "react-toastify";
import findUser from "../../utils/findUser";
import FindUser from "../FindUser/FindUser";
import style from './Message.module.css'

export default function Message({users}) {
  let [messages, setMessages] = useState([]);
  let[token,setToken]=useState('');
  const [user,setUser]=useState({})
  
  let getUser =()=>{
    if(cookie.load('token')){
      const {id}= jwtDecode(cookie.load('token'));
      const user = findUser(users,id);
      console.log(user);
    setUser(user);
    }
    else{
      setUser({});
    }
    
  }
  
  let getMessage = async () => {
    const APIheader= `tariq__${token}`
    let { data } = await axios.get("https://lazy-blue-sockeye-gear.cyclic.app/api/v1/message/messages",{headers:{token:APIheader}});
    console.log(data)
    if(data.message=="success"){
        setMessages(data.messages);

    }
   
  };
   let deletMessage=async(id)=>{
   const  ApiHeader=`tariq__${token}`
    let {data}= await axios.delete(`https://lazy-blue-sockeye-gear.cyclic.app/api/v1/message/${id}`, {headers:{token:ApiHeader}});
    if(data.message=="success"){
        toast.success('deleted message successfully')
        getMessage();
    }
   }
useEffect(()=>{
    getUser();
    getMessage()
   
},[])
  
let shareProfile= (e,url)=>{
    e.preventDefault();
    copy(url);

}

  return (
    <div>
      <div className="container text-center py-5 my-5 text-center">
        <div className="card pt-5">
          <a href data-toggle="modal" data-target="#profile">
            <img src="avatar.png" className="avatar " alt />
          </a>
          <h3 className="py-2 text-capitalize">{user.userName}</h3>
          <button
            data-toggle="modal"
            data-target="#share"
            className="btn btn-default-outline share "
            onClick={(e)=>{shareProfile(e,`http://localhost:3001/user/${user._id}`)}}
          >
            <i className="fas fa-share-alt" /> Share Profile
          </button>
        </div>
      </div>

      <div className="container text-center my-5 text-center">
  <div className="row">
   {messages.length==0?
    <div className="col-md-12">
      <div className="card py-5">
        <p>You don't have any messages... </p>
      </div>
     </div>:
     messages.map((msg,index)=>(
        <div className="col-md-12 position-relative" key={index}>
        <div className="card py-5">
          <p>{msg.text}</p>
          <div className={style.delete} onClick={()=>{deletMessage(msg._id)}}>delete</div>
        </div>
       </div>

     ))
}
      </div>
      </div>

            </div>
       
  );
}
