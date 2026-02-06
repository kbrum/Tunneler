import type {dto} from '../../wailsjs/go/models';
import {
  CreateSSHSession,
  DeleteSSHSession,
  GetSSHSessions,
  UpdateSSHSession,
  GetSSHSessionByID,
} from '../../wailsjs/go/controller/SSHController';

export async function createSessionAction(
  session: dto.CreateSessionRequestDTO,
) {
  try {
    return await CreateSSHSession(session);
  } catch (error) {
    console.error('Error creating session:', error);
    throw error;
  }
}

export async function getSessionsAction() {
  try {
    return await GetSSHSessions();
  } catch (error) {
    console.error('Error getting sessions:', error);
    throw error;
  }
}

export async function getSessionByIDAction(
  sessionID: dto.GetSessionRequestDTO,
) {
  try {
    return await GetSSHSessionByID(sessionID);
  } catch (error) {
    console.error('Error getting session:', error);
    throw error;
  }
}

export async function updateSessionAction(
  sshSession: dto.UpdateSessionRequestDTO,
) {
  try {
    return await UpdateSSHSession(sshSession);
  } catch (error) {
    console.error('Error updating session:', error);
    throw error;
  }
}

export async function deleteSessionAction(sessionID: string) {
  try {
    return await DeleteSSHSession(sessionID);
  } catch (error) {
    console.error('Error deleting session:', error);
    throw error;
  }
}
