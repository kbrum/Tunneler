export type SessionStore = {
  isEditing: boolean;
  setIsEditing: (value: boolean) => void;
  isDialogOpen: boolean;
  setIsDialogOpen: (value: boolean) => void;
  id: string;
  setID: (value: string) => void;
  ip: string;
  setIP: (value: string) => void;
  user: string;
  setUser: (value: string) => void;
  port: string;
  setPort: (value: string) => void;
  label: string;
  setLabel: (value: string) => void;
};
