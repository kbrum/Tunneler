import {GetUser} from '../../wailsjs/go/adapter/UserController';

export async function getSession() {
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
