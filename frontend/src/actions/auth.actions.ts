import {
  LoginUser,
  CreateUser,
  LogoutUser,
} from '../../wailsjs/go/adapter/UserController';

export async function loginUser(email: string, password: string) {
  return await LoginUser(email, password);
}

export async function registerUser(
  email: string,
  password: string,
  name: string,
) {
  return await CreateUser(email, password, name);
}

export async function logoutUser(accessToken: string) {
  return await LogoutUser({access_token: accessToken});
}
