export interface GoogleAuthResponse {
  signInGoogle: AuthDetails;
}

export interface FacebookAuthResponse {
  signInFacebook: AuthDetails;
}

export interface AuthDetails {
  _id: string;
  token: string;
}