import React, { useEffect, useState } from 'react'
import './App.css'
import { Route, RouterProvider, Routes } from 'react-router-dom'
import Login from './components/Login/Login'
import Navbar from './components/Navbar/Navbar'
import Home from './components/Home/Home'
import Register from './components/Register/Register'
import axios from 'axios'
import FindUser from './components/FindUser/FindUser'
import Loader from './components/Loader/Loader'
import UserProfile from './components/UserProfile/UserProfile'
import Message from './components/Message/Message'
import cookie from 'react-cookies'
import { ToastContainer, toast } from 'react-toastify';
import ForgetPassword from './components/ForgetPassword/ForgetPassword'
import ResetPassword from './components/ResetPassword/ResetPassword'
import jwtDecode from 'jwt-decode'
import NotFound from './components/NotFound/NotFound'
export default function App() {
 
 let [users,setUsers]=useState([]);
 let[loader,setLoader]=useState(true);
 let[userData,setUserData]=useState('');

 

 let getUsers=async()=>{
  let{data}= await axios.get('https://lazy-blue-sockeye-gear.cyclic.app/api/v1/auth/getAllUsers');
  setTimeout(()=>{
    setUsers(data);
    setLoader(false);
  },2000)
  
 }
 
 useEffect(()=>{
  
  if( cookie.load('token')){
    const {id}= jwtDecode(cookie.load('token'));
    setUserData(id);
  }
  else{
    setUserData("");
  }
  getUsers();
 },[]);
 
 
 
  return (
    <div>
      <Navbar userData={userData}/>
      <ToastContainer
     position="top-right"
     autoClose={5000}
     hideProgressBar={false}
     newestOnTop={false}
     closeOnClick
     rtl={false}
     pauseOnFocusLoss
     draggable
     pauseOnHover
     theme="light"
    />
      {loader && <Loader/>}
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path="/home" element={<Home/>}></Route>
        <Route path='/find-user' element={<FindUser users={users}/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/register' element={<Register/>}></Route>
        <Route path="/user/:id" element={<UserProfile users={users}/>}></Route>
        <Route path="/messages" element={<Message users={users}/>}></Route>
        <Route path='/forget-password' element={<ForgetPassword/>}></Route>
        <Route path='/reset-password' element={<ResetPassword/>}></Route> 
        <Route path='*' element={<NotFound/>}></Route>     
      </Routes>
      
    </div>
  )
}
