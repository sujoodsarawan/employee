import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actions from '../../store/action/index';
import {Redirect} from 'react-router-dom';
class Logout extends Component {

    componentDidMount(){

        this.props.onLogout();

    }

    render() {
        return (
            <div>
                <Redirect to ='/auth' />
            </div>
        );
    }
}

const mapDispatchToProps=dispatch =>{
    return{

        onLogout :()=>dispatch(actions.logout())
    }
}

export default connect(null,mapDispatchToProps)(Logout);