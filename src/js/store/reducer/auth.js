import * as actionTypes from '../action/actionTypes';
import {updateObject} from '../utility';

const initalState = {
token:null,
department:null,
isAdmin:false,
error:null,
loading:false,
isSignUp:false
};


const authStart = (state,action) =>{
    return updateObject(state , {
        loading:true,
        error:null
    })
}
const authSuccess = (state,action) =>{
    return updateObject(state , {
        isSignUp:false,
        token:action.idTokn,
        department:action.department,
        isAdmin:action.isAdmin,
        loading:false,
        error:null
    })
}


const authFail= (state,action) =>{
    return updateObject(state , {
        loading:false,
        error:action.error
    })
}

const authLogout =(state,action)=>{
    return updateObject(state , {
       token:null,
       department:null,
       isAdmin:false

    })
}

const reducer = (state = initalState,action)=>{

    switch(action.type){
        case actionTypes.AUTH_START:return authStart(state,action);
        case actionTypes.AUTH_SUCCESS:return authSuccess(state,action);
        case actionTypes.AUTH_FAUILER:return authFail(state,action);
        case actionTypes.AUTH_LOGOUT:return authLogout(state,action);
        default:
            return state;    
    }

};

export default reducer;