export interface ILoginResponse {
  access_token: string;
}

export interface ILoginProps {
  email: string;
  password: string;
  remember: boolean;
}
