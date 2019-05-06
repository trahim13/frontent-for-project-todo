import React, {Component} from 'react';

import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import {getProject, createProject} from '../../actions/projectActions.js'

class UpdateProject extends Component{

    componentDidMount(){
        const {projectIdentifier} = this.props.match.params;
        this.props.getProject(projectIdentifier, this.props.history)
    }

   

    componentWillReceiveProps(nextProps){

        if(nextProps.errors){
            this.setState({
                errors : nextProps.errors
            })
        }

        const {id, projectName, projectIdentifier, description, start_date, end_date} = nextProps.project;
        this.setState({
                    id, 
                    projectName,
                    projectIdentifier,
                    description, 
                    start_date,
                    end_date
        })

    }

    state = {
        id: "",
        projectName: "",
        projectIdentifier: "",
        description: "",
        start_date: "",
        end_date: "",
        errors: {}
    }

    onChange = (e)=>{
        const {name, value } = e.target;
    
        this.setState({
            [name]:value}
            )
    }

    onSubmit = (e) =>{
        e.preventDefault();
        const {id, projectName, projectIdentifier, description, start_date, end_date} = this.state;
        const updatedProject = {
            id:id,
            projectName: projectName,
            projectIdentifier: projectIdentifier,
            description: description,
            start_date: start_date,
            end_date: end_date

        }

        this.props.createProject(updatedProject, this.props.history)

    }


    render(){
        const {projectName, projectIdentifier, description, start_date, end_date, errors} = this.state;

        

        return(
            <div className="project">
            <div className="container">
              <div className="row">
                <div className="col-md-8 m-auto">
                  <h5 className="display-4 text-center">Update Project form</h5>
                  <hr />
                  <form onSubmit={this.onSubmit}>
                   
                    <div className="form-group">
                      <input
                        type="text"
                        className={classnames("form-control form-control-lg ",
                        {"is-invalid":errors.projectName})}
                        placeholder="Project Name"
                        name="projectName" 
                        value= {projectName || ''}
                        onChange={this.onChange}
                        
                      />

                      {errors.projectName && (
                          <div className="invalid-feedback">{errors.projectName}</div>
                      )}
                    </div>


                    <div className="form-group">
                      <input
                        type="text"
                        className={classnames("form-control form-control-lg",
                        {
                            "is-invalid": errors.projectIdentifier
                        })}
                        placeholder="Unique Project ID"
                        name="projectIdentifier" 
                        value= {projectIdentifier || ''}
                        disabled
                      />

                      {errors.projectIdentifier && (
                          <div className="invalid-feedback">{errors.projectIdentifier}</div>
                      )}
                    </div>

                    <div className="form-group">
                      <textarea
                        className={classnames("form-control form-control-lg",
                        {
                            "is-invalid": errors.description
                        })}
                        placeholder="Project Description"
                        name="description" 
                        value= {description || ''}
                        onChange={this.onChange}
                        >
                        </textarea>

                        {errors.description && (
                          <div className="invalid-feedback">{errors.description}</div>
                      )}
                     

                    </div>
                    <h6>Start Date</h6>
                    <div className="form-group">
                      <input
                        type="date"
                        className="form-control form-control-lg"
                        name="start_date"
                        value={start_date || ''}
                        onChange={this.onChange}
                        
                      />
                    </div>
                    
                    <h6>Estimated End Date</h6>
                    <div className="form-group">
                      <input
                        type="date"
                        className="form-control form-control-lg"
                        name="end_date"
                        value={end_date || ''}
                        onChange={this.onChange}
                        
                      />
                    </div>
    
                    <input
                      type="submit"
                      className="btn btn-primary btn-block mt-4"
                    />
                  </form>
                </div>
              </div>
            </div>
          </div>
        );
      }
    }

    UpdateProject.propTypes = {
        getProject: PropTypes.func.isRequired,
        createProject: PropTypes.func.isRequired,
        project: PropTypes.object.isRequired,
        errors: PropTypes.object.isRequired
      };

const mapStateToProps = state =>(
     {
        project: state.project.project,
        errors: state.errors
    }
)

export default connect(mapStateToProps, {getProject, createProject}) (UpdateProject);