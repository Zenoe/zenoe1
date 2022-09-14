// third-party
import { combineReducers } from 'redux';

// project import
import menu from './menu';

import {
  userLoginReducer,
  userRegisterReducer,
  userUpdateReducer,
} from "./userReducers";

// ==============================|| COMBINE REDUCERS ||============================== //
const reducers = combineReducers({
  // noteList: noteListReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  // noteCreate: noteCreateReducer,
  // noteDelete: noteDeleteReducer,
  // noteUpdate: noteUpdateReducer,
  userUpdate: userUpdateReducer,
  menu: menu,
});

export default reducers;
