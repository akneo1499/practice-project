  export interface User {
    id: number;
    name: string;
    email: string;
    username: string;
    phone: string;
  }

  export interface AppState {
    loading: boolean;
    editMode: boolean;
    editId: number;
    users: User[];
  }

  export const initialState: AppState = {
    loading: false,
    editMode: false,
    editId: -1,
    users: []
  };
