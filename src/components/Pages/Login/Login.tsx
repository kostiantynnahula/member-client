import { useEffect, useContext } from 'react';
import { ReactFacebookLoginInfo } from 'react-facebook-login';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import { GoogleLogin, GoogleLoginResponse } from 'react-google-login';
import { Button } from 'react-bootstrap';
import { gapi } from 'gapi-script';
import { BsGoogle, BsFacebook } from 'react-icons/bs';
import { useMutation } from '@apollo/client';
import { GOOGLE_LOGIN, FACEBOOK_LOGIN} from 'queries/auth';
import { LocalStorageService } from 'utils/services/LocalStorage';
import { GoogleAuthResponse, FacebookAuthResponse } from 'utils/models/auth';
import { AuthContext } from 'App';
import './Login.scss';

export const Login = () => {

  const googleClientId = process.env.REACT_APP_GOOGLE_CLIENT_ID || '';
  const facebookAppId = process.env.REACT_APP_FACEBOOK_APP_ID || '';

  const [googleLogin, googleResponseVars] = useMutation<GoogleAuthResponse>(GOOGLE_LOGIN);
  const [facebookLogin, facebookResponseVars] = useMutation<FacebookAuthResponse>(FACEBOOK_LOGIN);

  const { setAuth } = useContext(AuthContext);

  useEffect(() => {
    const initClient = () => {
      gapi.client.init({
        clientId: googleClientId,
        scope: '',
      });
      gapi.load('client:auth2', initClient);
    }
  });

  useEffect(() => {
    if (googleResponseVars.data) {
      const { _id, token } = googleResponseVars.data.signInGoogle;
      LocalStorageService.setAuth({ _id, token });
      setAuth({ _id, token });
    }

    if (facebookResponseVars.data) {
      const { _id, token } = facebookResponseVars.data.signInFacebook;
      LocalStorageService.setAuth({ _id, token });
      setAuth({ _id, token });
    }

  }, [googleResponseVars, facebookResponseVars, setAuth])

  const onGoogleSuccess = (res: any) => {

    const { tokenId } = res as unknown as GoogleLoginResponse;

    if (tokenId) {
      googleLogin({
        variables: {
          googleLoginPayload: { accessToken: tokenId }
        }
      })
    }
  }

  const onGoogleFailure = (res: any) => {
    console.log('failure: ', res);
  }

  const onFacebookCallback = (res: any) => {

    const { accessToken, id } = res as unknown as ReactFacebookLoginInfo;

    if (accessToken && id) {
      facebookLogin({
        variables: {
          facebookInput: {
            accessToken, 
            id
          }
        }
      })
    }
  }

  return (
    <div className="login-container">
      <div>
        <h2>Login page component</h2>
        <div className='button-container'>
          <FacebookLogin
            appId={facebookAppId}
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
            callback={onFacebookCallback}
          />
          <GoogleLogin
            clientId={googleClientId}
            buttonText='Google login'
            onSuccess={onGoogleSuccess}
            onFailure={onGoogleFailure}
            cookiePolicy={'single_host_origin'}
            isSignedIn={false}
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