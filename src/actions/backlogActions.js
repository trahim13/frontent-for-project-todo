import axios from 'axios';
import { GET_ERRORS, GET_BACKLOG, GET_PROJECT_TASK, DELETE_PROJECT_TASK } from './types';

export const addProjectTask = (project_identifier, project_task, history) => async dispatch =>{

    try {
        await axios.post(`/api/backlog/${project_identifier}`, project_task);
        history.push(`/projectBoard/${project_identifier}`);

        dispatch({
            type:GET_ERRORS,
            payload:{}
        })
        
    } catch (err) {
        dispatch({
            type:GET_ERRORS,
            payload: err.response.data
        })
        
    }

  
}

export const getBacklog  = (project_identifier) => async dispatch=>{

    try {
        const res = await axios.get(`/api/backlog/${project_identifier}`);
        dispatch({
            type: GET_BACKLOG,
            payload: res.data
        })
        
    } catch (err) {
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
        
    }
    
}

export const getProjectTask = (project_identifier, project_sequence, history)=> async dispatch=>{

    try {
        const res = await axios.get(`/api/backlog/${project_identifier}/${project_sequence}`);
        dispatch({
            type: GET_PROJECT_TASK,
            payload: res.data
        });

        dispatch({
            type:GET_ERRORS,
            payload:{}
         });

        
    } catch (err){
        history.push(`/dashboard`)
        
    }
}


export const updateProjectTask = (project_identifier, project_sequence, project_task, history)=> async dispatch=>{

    try {
        await axios.patch(`/api/backlog/${project_identifier}/${project_sequence}`, project_task);
        dispatch({
            type:GET_ERRORS,
            payload:{}
         });
        history.push(`/projectBoard/${project_identifier}`);
        
    } catch (err) {

        dispatch({
            type:GET_ERRORS,
            payload:err.response.data
        })
        
    }
    
}

export const deleteProjectTask = (project_identifier,project_sequence)=> async dispatch =>{
    if(window.confirm(`Are you shure? This will delete the project task: ${project_sequence} and the data related to it`)){
        await axios.delete(`/api/backlog/${project_identifier}/${project_sequence}`);
        dispatch({
            type: DELETE_PROJECT_TASK,
            payload: project_sequence
        })
    }
}