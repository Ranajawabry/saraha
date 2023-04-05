import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar({userData}) {
  console.log(userData);
  return (
    <div>
        <nav className="navbar navbar-expand-lg bg-custom navbar-dark bg-dark">
  <div className="container">
    <a className="navbar-brand" href="/home"><img src="logo300.png" width={54} alt /> </a>
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      Menu <span className="navbar-toggler-icon" />
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav ml-auto">
        { userData?<>
          <li className="nav-item">
          <Link className="nav-link" to="/find-user">Users List</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/messages">get Messages</Link>
        </li>
        </>:<></>

        }
        
      </ul>
      <ul className="navbar-nav ms-auto">
        {
          userData?<></>:
          <>
          <li className="nav-item">
          <a className="nav-link" href="/register">Register</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/login">Login</a>
        </li>
          </>
        }

      {
        userData?
        <li className="nav-item">
           <a className="nav-link" href="/login">Logout</a>
        </li>:<></>
          
      }
        

      </ul>
    </div>
  </div>
</nav>

    </div>
  )
}
