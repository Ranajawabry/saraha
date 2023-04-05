import React from 'react'
import { useState } from 'react';
import Joi from 'joi';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
export default function Register() {

let [user,setUser]=useState({
  name :" ",
  email : "",
  password: "",
  cPassword: ""
});
let [errorList , setErrorList]= useState([]);
let getData= (e)=>{
  setUser({...user, [e.target.name] : e.target.value});
  console.log(user);
}

function validateInput(){

  let schema = Joi.object({
    name : Joi.string().required(),
    email : Joi.string().required(),
    password : Joi.string().required(),
    cPassword : Joi.ref('password')
  })
  return schema.validate(user,{abortEarly:false});
}

let register = async(e)=>{
  e.preventDefault();
  let validationResult=validateInput();
  let errors=[];
  if(validationResult.error){
    validationResult.error.details.map((err)=>{
      errors.push(err.message);
    })
    setErrorList(errors);
  }
  else{
   
    let {data}= await axios.post('https://lazy-blue-sockeye-gear.cyclic.app/api/v1/auth/signup',user);
    console.log(data);
    if(data.message=='success'){
      setErrorList([]);
      return <Navigate to ="/login" />

    }
    else{
      data.err[0].map((err)=>{
        errors.push(err.message);

      })
      setErrorList(errors);
    }

  }

}





  return (
  <div>
  <div className="container text-center my-5">
    <div className="user my-3">
      <i className="far fa-edit user-icon" />
      <h4 className="login">Register</h4>
    </div>
    <div className="card p-5 w-50 m-auto">
      {
        errorList.map((err,index)=>(
          <div key={index} className="text-center alert alert-danger">
            {err}
          </div>
        ))
      }
      <form   onSubmit={register}>
        <input className="form-control" placeholder="Enter your Name" type="text" name="name"  onChange={getData}/>
        <input className="form-control my-2 " placeholder="Enter your email" type="email" name="email"  onChange={getData}/>
        <input className="form-control  " placeholder="Enter your Password" type="password" name="password" onChange={getData} />
        <input className="form-control  my-2" placeholder="Password Confirmation" type="password" name="cPassword" onChange={getData} />
        <button className="btn btn-default-outline my-4 w-100 rounded">Register</button>
        <a className="btn btn-default-outline" href="login.html">Login</a>
      </form>
    </div>
  </div>
</div>

  )
}
