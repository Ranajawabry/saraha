import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import Joi from 'joi'
export default function ResetPassword() {
  let navigate=useNavigate();
  let [input,setInput]=useState({
    email: "" ,
    code:"" ,
    newPassword :""
  })
  let [errorList,setErrorList]=useState([]);
 let getData =(e)=>{
    setInput({...input,[e.target.name]:e.target.value}) 
    console.log(input);

  }
  function inputValidation(){
    const schema = Joi.object({
        email:Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
        newPassword :Joi.string().required(),
        code : Joi.string().required()
       })
       return schema.validate(input,{abortEarly:false});
  }
  let Reset=async(e)=>{
    e.preventDefault();
    console.log(inputValidation());
    if(inputValidation().error){
     setErrorList(inputValidation().error.details);
    }
    else{
     setErrorList([]);
    let {data}= await axios.patch('https://lazy-blue-sockeye-gear.cyclic.app/api/v1/auth/forgetPassword',input);
    if(data.message=='success'){
        toast.success('Password reseted successfully');
        navigate('/home');
    }
    else if(data.message=='fail'){
        toast.error('please enter aright code');
    }
}
  }
  
    return (
    <div>
        <div className="container text-center my-5">
    <div className="user my-3">
      <i className="far fa-edit user-icon" />
      <h4 className="login">Rest Password</h4>
    </div>
    <div className="card p-5 w-50 m-auto">
    {
      errorList.map((err,index)=>(
        <div className="text-center alert alert-danger" key={index}>
          <p>{err.message}</p>
        </div>

      ))
    }
      <form   onSubmit={Reset}>
        
        <input className="form-control my-2 " placeholder="Enter your email" type="email" name="email"  onChange={getData}/>
        <input className="form-control  " placeholder="Enter New Password" type="password" name="newPassword" onChange={getData} />
        <input className="form-control  my-2" placeholder="Enter code" type="text" name="code" onChange={getData} />
        <button className="btn btn-default-outline my-4 w-100 rounded">Reset</button>
        
      </form>
    </div>
  </div>
    </div>
  )
}
