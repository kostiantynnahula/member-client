import React from 'react';
import logo from './logo.svg';
import FacebookLogin from 'react-facebook-login';
import { GoogleLogin } from 'react-google-login';
// import './App.css';

function App() {
  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
      <FacebookLogin
        appId='1786612898371193'
        autoLoad={false}
        fields={'name,email,picture'}
        scope={'public_profile,email'}
        callback={(res) => console.log(res)}
      />
      <GoogleLogin
        clientId='677821976500-b7mf7piiu9hp8n4bm7935g92hpi5g6b3.apps.googleusercontent.com'
        buttonText='Google login'
        onSuccess={(res) => console.log(res)}
        onFailure={(err) => console.log(err)}
        cookiePolicy={'single_host_origin'}
        isSignedIn={true}
      />
    </div>
  );
}

export default App;
