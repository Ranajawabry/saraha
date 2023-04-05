import Joi, { date } from 'joi';
import React, { useState } from 'react'
import axios from 'axios';
import cookie from 'react-cookies'
import { useNavigate } from 'react-router-dom';


export default function Login() {
 let navigate = useNavigate();
  let [errorList,setErrorList]=useState([])
  let [user,setUser]=useState({
    email : '' ,
    password : ''
  })
  
  let getUserData = (e)=>{
    let newUser= user;
    newUser[e.target.name]=e.target.value;
    setUser(newUser);
    console.log(user);

  }
  function inputValidation(){
   const schema = Joi.object({
        email:Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
        password:Joi.string().required()
       })
       return schema.validate(user);
  }

  let userLogin= async(e)=>{
    e.preventDefault();
   let validationResult = inputValidation();
   let errors=[];
   if(validationResult.error){
    validationResult.error.details.map((err)=>{
     errors.push(err.message);
     setErrorList(errors);
    })
   
   }
   else{
    setErrorList([]);
    let {data}= await axios.post('https://lazy-blue-sockeye-gear.cyclic.app/api/v1/auth/signin',user);
    console.log(data);
    if(data.message==="success"){
      setErrorList([]);
      
      let expiers= new Date();
      let futuerDay= expiers.getDate()+1;
      expiers.setDate(futuerDay);
      console.log(futuerDay);
      cookie.save("token", data.token ,{ path: '/' });

         navigate('/home');
    }
    else{
      errors.push(data.message);
      setErrorList(errors);

    }

   }

  }

  
    return (
    <div>
        <div className="container text-center my-5">
  <div className="user my-3">
    <i className="fas fa-user-secret user-icon" />
    <h4 className="login">Login</h4>
  </div>
  <div className="card p-5 w-50 m-auto">
    {
      errorList.map((err,index)=>(
        <div className="text-center alert alert-danger" key={index}>
          <p>{err}</p>
        </div>

      ))
    }
    <form  onSubmit={userLogin}>
      <input className="form-control" placeholder="Enter your email" type="text" name="email" onChange={getUserData} />
      <input className="form-control my-4 " placeholder="Enter your Password" type="password" name="password" onChange={getUserData} />
      <button className="btn btn-default-outline my-4 w-100 rounded" >Login</button>
      <p><a className="text-muted forgot btn" href='/forget-password'>I Forgot My Password</a></p>
      <a className="btn btn-default-outline" href="register.html">Register</a>
    </form>
  </div>
</div>

    </div>
  )
}
