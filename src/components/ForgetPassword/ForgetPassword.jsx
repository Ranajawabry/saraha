import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function ForgetPassword() {
   let navigate = useNavigate()
   let[errorList,setErrorList]=useState([]);
   const [email,setEmail]=useState(" ");
    
   let getUserData=(e)=>{
        setEmail(e.target.value);
       
     }

     let Submit=async(e)=>{
        e.preventDefault();
        const {data} = await axios.patch('https://lazy-blue-sockeye-gear.cyclic.app/api/v1/auth/sendCode',{email:email})
        if(data.message=="success"){
            toast.info("please check email",{autoClose: 2000});
            navigate('/reset-password');

        }

        
     }
    return (
    <div>
        <div className="container text-center my-5">
  <div className="user my-3">
    <i className="fas fa-user-secret user-icon" />
    <h4 className="login">Forget Password</h4>
  </div>
  <div className="card p-5 w-50 m-auto">
    {
      errorList.map((err,index)=>(
        <div className="text-center alert alert-danger" key={index}>
          <p>{err}</p>
        </div>

      ))
    }
    <form  onSubmit={Submit}>
      <input className="form-control" placeholder="Enter your email" type="text" name="email" onChange={getUserData} />
    
      <button className="btn btn-default-outline my-4 w-100 rounded" >Reset PassWord</button>
     
    </form>
  </div>
</div>

    </div>
  )
}
