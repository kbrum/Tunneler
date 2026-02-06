import type {dto} from '../../wailsjs/go/models';
import {
  LoginUser,
  CreateUser,
  LogoutUser,
  GetUser,
} from '../../wailsjs/go/controller/UserController';

export async function loginUserAction(user: dto.LoginRequestDTO) {
  try {
    return await LoginUser(user);
  } catch (error) {
    console.error('Login Error', error);
    throw error;
  }
}

// prettier-ignore
export async function createUserAction(user: dto.CreateUserRequestDTO) {
  try {
    return await CreateUser(user);
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
