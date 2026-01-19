import {
  LoginUser,
  CreateUser,
  LogoutUser,
} from '../../wailsjs/go/adapter/UserController';

export async function loginUser(email: string, password: string) {
  try {
    return await LoginUser({email: email, password: password});
  } catch (error) {
    console.error('Login Error', error);
    throw error;
  }
}

// prettier-ignore
export async function createUser( email: string, password: string,name: string,) {
  try {
    return await CreateUser({email: email, password: password, name: name});
  } catch (error) {
    console.error('Create User Error', error);
    throw error;
  }
}

export async function logoutUser(accessToken: string) {
  try {
    return await LogoutUser({access_token: accessToken});
  } catch (error) {
    console.error('Logout Error', error);
    throw error;
  }
}
