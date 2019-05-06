import axios from 'axios';
import {GET_ERRORS, GET_PROJECTS, GET_PROJECT, DELETE_PROJECT} from './types';
 

export const createProject= (project, history) => async dispatch =>{

    try {
        await axios.post("/api/project", project);
        history.push('/dashboard')

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


export const getProjects = () => async dispatch =>{

    try {
        const res = await axios.get("/api/project/all");

        dispatch({
            type: GET_PROJECTS,
            payload: res.data
        })
    } catch (error) {
        
    }

   
}

export const getProject = (id, history) => async dispatch =>{
    try {
        const resp = await axios.get(`/api/project/${id}`);
    dispatch({
        type: GET_PROJECT,
        payload: resp.data
    })
    } catch (error) {
        history.push("/dashboard")
    }
    
}

export const deleteProject = (projectIdentifier)=>async dispatch=>{
    try {


        if(window.confirm(
            "Are you shure? This will delete the project and the data related to it"
        )){

            await axios.delete(`/api/project/${projectIdentifier}`);

            dispatch({
                type:DELETE_PROJECT,
                payload: projectIdentifier
        })
        }
        
        
    } catch (error) {
        
    }
}