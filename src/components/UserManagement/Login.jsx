import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import {connect} from 'react-redux';
import {login} from '../../actions/securityAction.js'



class Login extends Component{

  componentDidMount() {
    if (this.props.security.validToken) {
      this.props.history.push("/dashboard");
    }
  }


    state = {
      username: "",
      password: "",
      errors: {}
    }

    componentWillReceiveProps(nextProps){
      if(nextProps.security.validToken){
        this.props.history.push("/dashboard")
      }
      if(nextProps.errors){
        this.setState({errors:nextProps.errors})
      }
    }

    onChange= (e)=>{
      const{name, value} = e.target;
      this.setState({[name]:value})
    }

    onSubmit = e =>{
      e.preventDefault();
      
      const {username, password} = this.state;

      const loginRequest = {username, password};

      this.props.login(loginRequest);
    }

    

    render(){

        const {username, password, errors} = this.state;

        return(
            <div className="login">
            <div className="container">
              <div className="row">
                <div className="col-md-8 m-auto">
                  <h1 className="display-4 text-center">Log In</h1>
                  <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                      <input
                        type="text"
                        className={classnames("form-control form-control-lg",
                        {"is_invalid": errors.username})}
                        placeholder="Email Address"
                        name="username"
                        value={username}
                        onChange={this.onChange}
                      />
                      {errors.username && (
                        <div className="invalid-feedback"></div>
                      )}




                    </div>
                    <div className="form-group">
                      <input
                        type="password"
                        className={classnames("form-control form-control-lg",
                        {"is-invalid":errors.password})}
                        placeholder="Password"
                        name="password"
                        value={password}
                        onChange={this.onChange}
                      />

                      {errors.password&& (
                        <div className="invalid-feedback">{errors.password}</div>
                      )}




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


Login.propTypes = {
  security: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  login: PropTypes.func.isRequired
}

const mapStateToProps = (state)=>({
  security: state.security,
  errors: state.errors
})

export default connect(mapStateToProps, {login}) (Login);

