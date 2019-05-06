import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import classnames from 'classnames';
import {addProjectTask} from '../../../actions/backlogActions.js'
import PropTypes from 'prop-types';

class AddProjectTask extends Component{

  state = {
    summary : "",
    acceptanceCriteria : "",
    dueDate: "",
    status: "",
    priority: 0,
    
    projectIdentifier: this.props.match.params.projectIdentifier,

    errors:{}

  }

  static getDerivedStateFromProps(nextProps, prevState){
    if(nextProps.errors!==prevState.errors){
      return {errors: nextProps.errors}
    }

    return null;
  }


  onChange = (e)=>{
    const {value, name} = e.target;
    this.setState(
      {[name]: value}
    )
  }


  onSubmit = (e)=>{
    e.preventDefault();
    const {summary,acceptanceCriteria, dueDate, status,priority} = this.state;

    const newTask = {
      summary,
      acceptanceCriteria,
      dueDate,
      status,
      priority
      
    }

    this.props.addProjectTask(
      this.props.match.params.projectIdentifier,
      newTask,
      this.props.history
      );
  }

    render(){

        const {projectIdentifier} = this.props.match.params;
        const {summary,acceptanceCriteria, dueDate, status,priority} = this.state;
        const {errors} = this.state;
        



           
        return(
            <div className="add-PBI">
            <div className="container">
              <div className="row">
                <div className="col-md-8 m-auto">
                  <Link to={`/projectBoard/${projectIdentifier}`} className="btn btn-light">
                    Back to Project Board
                  </Link>
                  <h4 className="display-4 text-center">Add Project Task</h4>
                  <p className="lead text-center">Project Name + Project Code</p>
                  <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                      <input
                        type="text"
                        className={classnames("form-control form-control-lg",
                        {"is-invalid": errors.summary}
                        )}
                        name="summary"
                        placeholder="Project Task summary"
                        value={summary}
                        onChange= {this.onChange}
                        
                      />

                      {errors.summary&& (
                        <div className="invalid-feedback">
                      {errors.summary}
                      </div>
                    )}
                    </div>

                    
                    <div className="form-group">
                      <textarea
                        className="form-control form-control-lg"
                        placeholder="Acceptance Criteria"
                        name="acceptanceCriteria"
                        value={acceptanceCriteria}
                        onChange= {this.onChange}
                      />
                    </div>
                    <h6>Due Date</h6>
                    <div className="form-group">
                      <input
                        type="date"
                        className="form-control form-control-lg"
                        name="dueDate"
                        value={dueDate}
                        onChange= {this.onChange}
                      />
                    </div>
                    <div className="form-group">
                      <select
                        className="form-control form-control-lg"
                        name="priority"
                        value={priority}
                        onChange= {this.onChange}
                      >
                        <option value={0}>Select Priority</option>
                        <option value={1}>High</option>
                        <option value={2}>Medium</option>
                        <option value={3}>Low</option>
                      </select>
                    </div>
    
                    <div className="form-group">
                      <select
                        className="form-control form-control-lg"
                        name="status"
                        value={status}
                        onChange= {this.onChange}
                      >
                        <option value="">Select Status</option>
                        <option value="TO_DO">TO DO</option>
                        <option value="IN_PROGRESS">IN PROGRESS</option>
                        <option value="DONE">DONE</option>
                      </select>
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

AddProjectTask.propTypes = {
  addProjectTask: PropTypes.func.isRequired,
  errors : PropTypes.object.isRequired
}

const mapStateToProps = state=>({
  errors : state.errors
})

export default connect(mapStateToProps, {addProjectTask}) (AddProjectTask);