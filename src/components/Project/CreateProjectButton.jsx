import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class CreateProjectButton extends Component {
    render() {
        return(
            <>
            <Link to='/addProject' className='btn btn-lg btn-info'>Create a project</Link>
            </>
        )
    }
}

export default CreateProjectButton;