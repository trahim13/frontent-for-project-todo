import axios from 'axios';
import { GET_ERRORS, SET_CURRENT_USER } from './types';
import setJwtTokenToHeader from '../securityUtils/setJwtToken';
import jwt_decode from "jwt-decode";

export const createNewUser = (newUser, history)=> async dispatch=>{

    try {
        const res = axios.post("/api/users/register", newUser);
        history.push("/login");
        dispatch({
            type: GET_ERRORS,
            payload: {}
        })
        
    } catch (err) {

        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
        
    }

    
}

export const login = (loginRequest)=>async dispatch=>{

    try {
        
        const res = await axios.post("http://localhost:8080/api/users/login", loginRequest);

        const {token} = res.data;

        localStorage.setItem("jwtToken", token);

        setJwtTokenToHeader(token);

        const decoded = jwt_decode(token);

        

        dispatch({
            type: SET_CURRENT_USER,
            payload: decoded
        })

        
    } catch (err) {

        console.log(err);
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })

        
    }
    
}

export const logout = ()=> dispatch=>{
    localStorage.removeItem("jwtToken");
    setJwtTokenToHeader(false);

    dispatch({
        type:SET_CURRENT_USER,
        payload:{}
    })
}

