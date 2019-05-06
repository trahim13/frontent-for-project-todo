import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Backlog from './Backlog';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {getBacklog } from '../../actions/backlogActions.js'

class ProjectBoard extends Component{

    state = {
        errors:{}
    }


    componentDidMount(){
        const {projectIdentifier} = this.props.match.params;
        this.props.getBacklog(projectIdentifier);
        
    }


    static getDerivedStateFromProps(nextProps, prevState){
        if(nextProps.errors!==prevState.errors){
          return {errors: nextProps.errors}
        }
    
        return null;
      }
    

    render(){
       
        const {projectIdentifier} = this.props.match.params;
        const {project_tasks} = this.props.backlog;
        const {errors} = this.state;

        let BoardContent;

        const boardAlgoritm = (errors, project_tasks)=>{
            if(project_tasks.length===0){
                    if(errors.projectNotFound){
                        return (
                                <div className="alert alert-danger text-center" role="alert">
                                    {errors.projectNotFound}
                                </div>
                        );
                    } else if(errors.projectIdentifier){
                        return (
                                <div className="alert alert-danger text-center" role="alert">
                                    {errors.projectIdentifier}
                                </div>
                        );
                    } 
                    
                    
                    else {
                        return(
                            <div className="alert alert-info text-center" role="alert">
                                No Project Tasks on this board
                            </div>   
                        );
                    }
            } else{
                return <Backlog project_tasks_props = {project_tasks}/>

            }
        };

        BoardContent = boardAlgoritm(errors, project_tasks);

        
        

        return(
            <div className="container">
               
                <Link to={`/addProjectTask/${projectIdentifier}`} className="btn btn-primary mb-3">
                    <i className="fas fa-plus-circle"> Create Project Task</i>
                </Link>
                <br />
                <hr />

                
                {BoardContent}
                

       
            </div>
        )
    }
}

ProjectBoard.propTypes = {
    getBacklog : PropTypes.func.isRequired,
    backlog: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
      
  }

  const mapStateToProps = state =>({
    backlog: state.backlog,
    errors: state.errors
  })

export default connect(mapStateToProps, {getBacklog }) (ProjectBoard);