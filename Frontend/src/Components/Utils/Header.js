import React from 'react'
import '../../Styles/Header.Module.css'
import Modal from 'react-modal'
import ReactDOM from 'react-dom';
import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';
import {useState} from 'react'

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};
export default function Header() {

  const [isLoginModalOpen, setLoginModal] = useState(false)
  const responseFacebook = (response) => {
    console.log(response);
  }
  return (
    <div className="header">
        <div className="s-logo">
            <span>e!</span>
        </div>
        <div className="btn-group login-block">
            <span className="login" onClick = {()=>setLoginModal(true)}>LogIn</span>
            <span className="signUp">Create an account</span>
        </div>
        <Modal 
          isOpen ={isLoginModalOpen}
          style={customStyles}
          >
          <h2>Login
          <button onClick = {()=>setLoginModal(false)} className="btn btn-danger float-end">X</button>
          </h2>
            <br />
          <form>
            <input placeholder='Enter your email'type = 'text'/><br/>
            <input placeholder='Enter your password' type = 'password'/><br/>
            
            <button>Login</button>
          </form>
          <br />
                  <FacebookLogin
            appId="1088597931155576"
            autoLoad={false}
            fields="name,email,picture"
            // onClick={componentClicked}
            
            callback={()=>responseFacebook}
             />
             <br />
             <GoogleLogin
                  clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
                  buttonText="Login with Google"
                  // onSuccess={responseGoogle}
                  // onFailure={responseGoogle}
                  
                  cookiePolicy={'single_host_origin'}
                />
          
        </Modal>

    </div>
  )
}
