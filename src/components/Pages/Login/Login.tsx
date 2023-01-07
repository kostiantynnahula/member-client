import { useEffect } from 'react';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import { GoogleLogin } from 'react-google-login';
import { Button } from 'react-bootstrap';
import { gapi } from 'gapi-script';
import { BsGoogle, BsFacebook } from 'react-icons/bs';
import './Login.scss';

export const Login = () => {

  const googleClientId = process.env.REACT_APP_GOOGLE_CLIENT_ID || '';

  useEffect(() => {
    const initClient = () => {
      gapi.client.init({
        clientId: googleClientId,
        scope: '',
      });
      gapi.load('client:auth2', initClient);
    }
  });
  
  const onSuccess = (res: any) => {
    console.log('success: ', res);
  }

  const onFailure = (res: any) => {
    console.log('failure: ', res);
  }

  return (
    <div className="login-container">
      <div>
        <h2>Login page component</h2>
        <div className='button-container'>
          <FacebookLogin
            appId='1786612898371193'
            autoLoad={false}
            fields={'name,email,picture'}
            scope={'public_profile,email'}
            size='medium'
            cssClass='faceboot-auth-btn'
            render={props => (
              <Button
                variant='outline-primary'
                onClick={props.onClick}
              >
                Facebook <BsFacebook/>
              </Button>
            )}
            callback={(res) => console.log(res)}
          />
          <GoogleLogin
            clientId={googleClientId}
            buttonText='Google login'
            onSuccess={onSuccess}
            onFailure={onFailure}
            cookiePolicy={'single_host_origin'}
            isSignedIn={true}
            icon={true}
            render={props => (
              <Button
                variant='outline-danger'
                onClick={props.onClick}
              >
                Google <BsGoogle/>
              </Button>
            )}
          />  
        </div>
      </div>
    </div>
  );
};