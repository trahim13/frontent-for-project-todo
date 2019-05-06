import React, { Component } from "react";
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {createNewUser} from '../../actions/securityAction.js';
import classnames from 'classnames';

class Register extends Component {

  componentDidMount() {
    if (this.props.security.validToken) {
      this.props.history.push("/dashboard");
    }
  }


  state={
    username: "",
    fullName: "",
    password: "",
    confirmPassword: "",
    errors: {}
  }

  static getDerivedStateFromProps (nextProps, prevState){
      if(nextProps.errors!=prevState.errors){
          return {errors:nextProps.errors}
      }

      return null;

  }
    

  


  onChange = (e) =>{
      const {name, value} = e.target;

      this.setState({[name]:value})
  }

  onSubmit = (e)=>{
      e.preventDefault();

      const{
        username,
        fullName,
        password,
        confirmPassword
        
                        } = this.state;

      const newUser = {
        username,
        fullName,
        password,
        confirmPassword
      }

      this.props.createNewUser(newUser, this.props.history);

  }

 
  
  render() {

        const{
                username,
                fullName,
                password,
                confirmPassword,
                errors
                                } = this.state;
    return (
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Sign Up</h1>
              <p className="lead text-center">Create your Account</p>
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    className={classnames("form-control form-control-lg",
                    {"is-invalid": errors.fullName})}
                    placeholder="Full name"
                    name="fullName"
                    value={fullName}
                    onChange = {this.onChange}
                    
                  />

                    {errors.fullName && (
                            <div className="invalid-feedback">{errors.fullName}</div>
                    )}


                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className={classnames("form-control form-control-lg",
                    {"is-invalid":errors.username})}
                    placeholder="User name"
                    name="username"
                    value={username}
                    onChange = {this.onChange}
                  />

                  {errors.username && (
                      <div className="invalid-ffedback">{errors.username}</div>
                  )}
                </div>


                <div className="form-group">
                  <input
                    type="password"
                    className={classnames("form-control form-control-lg",
                    {"is-invalid": errors.password})}
                    placeholder="Password"
                    name="password"
                    value={password}
                    onChange = {this.onChange}
                  />

                    {errors.password && (
                        <div className="invalid-feedback">{errors.password}</div>
                    )}


                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className={classnames("form-control form-control-lg",
                    {"is-invalid": errors.confirmPassword})}
                    placeholder="Confirm Password"
                    name="confirmPassword"
                    value={confirmPassword}
                    onChange = {this.onChange}
                  />
                </div>
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}


Register.propTypes = {
    createNewUser : PropTypes.func.isRequired,
    errors : PropTypes.object.isRequired

}

const mapStateToProps = (state)=>({
    errors: state.errors
})

export default connect(mapStateToProps, {createNewUser})(Register);