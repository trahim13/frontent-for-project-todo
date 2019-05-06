import { SET_CURRENT_USER } from "../actions/types";


const initialState ={
    validToken: false,
    user: {}
}


const booleanActionPayload = payload =>{
    if(payload){
        return true
    } else{
        return false
    }
}

export default function(state = initialState, action){
    switch(action.type){

        case SET_CURRENT_USER:
                const {payload} = action;
                return {...state,
                     user:payload,
                     validToken: booleanActionPayload(payload)
                    }

        default:
            return state;
    }
}