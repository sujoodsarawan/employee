import * as actionTypes from "./actionTypes";
import axios from "axios";

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

export const authSuccess = (token , department , isAdmin) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    idTokn: token,
    department:department,
    isAdmin:isAdmin
  };
};

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAUILER,
    error: error,
  };
};

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('department');
    localStorage.removeItem('isAdmin');

  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};



export const checkAuthTimeOut = (expirationTime) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime * 1000);
  };
};

export const auth = (email, password) => {
  console.log(email,password);
  return (dispatch) => {
    dispatch(authStart());
   
      const url = "https://graduationproject1.herokuapp.com/admin/emplogin";

       const authData = {
        nationalid: email,
        password: password,
      };

     axios.post(url, authData)
     .then((response) => {
       console.log(response);
       localStorage.setItem('token' , response.data.token);
       localStorage.setItem('department' , response.data.department);
       localStorage.setItem('isAdmin' , response.data.isAdmin);

       
       dispatch(authSuccess(response.data.token , response.data.department , response.data.isAdmin));
     //  dispatch(checkAuthTimeOut(response.data.expireTime))
     })
     .catch((error) => {
       console.log(error);
       dispatch(authFail(error));
     });
     
     console.log(authData)
 

    }
   
    };


