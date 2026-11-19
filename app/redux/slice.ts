import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type {User} from "../types/user";
interface UserState {
  users: User[];
}
const initialState:UserState = {
  users: [
    
    {
      id: "1",
      name: "Annu",
     phone:"89746487463",
      email: "anu123@gmail.com",
    },
    {
      id: "2",
      name: "Prateek",
     phone:"90987656733",
      email: "pra896@gmail.com",
    },
  
  ],
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {

    //ADD USER
    addUser: (state, action:PayloadAction<User>) => {
      console.log(action);
      state.users.push
        (action.payload);      
       },

    //EDIT USER
    editUser: (state, action:PayloadAction<User> ) => {
      console.log(action);
      const index = state.users.findIndex(
        (user) => user.id === action.payload.id
      );

      if (index !== -1) {
        state.users[index] = action.payload;
      }
    },

    //DELETE USER
    deleteUser: (state, action) => {
      console.log(action);
      state.users = state.users.filter(
        (user) => user.id !== action.payload

      );
    },
  },
});

export const { addUser, editUser, deleteUser } = usersSlice.actions;
export default usersSlice.reducer;


