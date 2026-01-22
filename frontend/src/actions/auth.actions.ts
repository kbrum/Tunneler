import {
  LoginUser,
  CreateUser,
  LogoutUser,
  GetUser,
} from '../../wailsjs/go/adapter/UserController';

export async function loginUserAction(email: string, password: string) {
  try {
    return await LoginUser({email: email, password: password});
  } catch (error) {
    console.error('Login Error', error);
    throw error;
  }
}

// prettier-ignore
export async function createUserAction(email: string, password: string,name: string,) {
  try {
    return await CreateUser({email: email, password: password, name: name});
  } catch (error) {
    console.error('Create User Error', error);
    throw error;
  }
}

export async function logoutUserAction() {
  try {
    return await LogoutUser();
  } catch (error) {
    console.error('Logout Error', error);
    throw error;
  }
}

export async function getSessionAction() {
  try {
    const session = await GetUser();
    if (session.auth) {
      return session;
    }
    return null;
  } catch (error) {
    console.error('Error getting session:', error);
    throw error;
  }
}
