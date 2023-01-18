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

export interface AuthProfile {
  _id: string;
  email: string;
  username: string;
}

export interface AuthProfileCache {
  profile: AuthProfile;
}