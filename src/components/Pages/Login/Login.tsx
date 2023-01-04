import { useEffect } from 'react';
import FacebookLogin from 'react-facebook-login';
import { GoogleLogin } from 'react-google-login';
import { gapi } from 'gapi-script';

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
    <>
      <FacebookLogin
        appId='1786612898371193'
        autoLoad={false}
        fields={'name,email,picture'}
        scope={'public_profile,email'}
        callback={(res) => console.log(res)}
      />
      <GoogleLogin
        // clientId='677821976500-b7mf7piiu9hp8n4bm7935g92hpi5g6b3.apps.googleusercontent.com'
        clientId={googleClientId}
        buttonText='Google login'
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={'single_host_origin'}
        isSignedIn={true}
      />
    </>
  );
};