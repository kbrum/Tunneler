import type {SessionStore} from '@/features/dashboard/types/session.types';
import {create} from 'zustand';

export const useSessionStore = create<SessionStore>((set) => ({
  isEditing: false,
  setIsEditing: (value: boolean) => set({isEditing: value}),
  isDialogOpen: false,
  setIsDialogOpen: (value: boolean) => set({isDialogOpen: value}),
  isSessionMenuDialogOpen: false,
  setIsSessionMenuDialogOpen: (value: boolean) =>
    set({isSessionMenuDialogOpen: value}),
  id: '',
  setID: (value: string) => set({id: value}),
  ip: '',
  setIP: (value: string) => set({ip: value}),
  user: '',
  setUser: (value: string) => set({user: value}),
  port: 0,
  setPort: (value: number) => set({port: value}),
  label: '',
  setLabel: (value: string) => set({label: value}),
  privateKey: '',
  setPrivateKey: (value: string) => set({privateKey: value}),
}));
