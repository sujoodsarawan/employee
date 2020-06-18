import React, { Component } from 'react';
import * as actions from '../../store/action/index';
import {connect} from 'react-redux';
import { Redirect } from 'react-router-dom';
import Input from '../../Component/Input/Input';

class Login extends Component {
    state={

        controls :{
         
            email: {
                elementType: "input",
                elementConfig: {
                  type: "text",
                  placeholder: "National Id",
                },
                value: '',
                validation:{
                    required:true,
                    minLength:10

                },
                valid:false,
                touched:false,
              },
              password: {
                elementType: "input",
                elementConfig: {
                  type: "password",
                  placeholder: "Password",
                },
                value: '',
                validation:{
                    required:true,
                    minLength:6
                },
                valid:false,
                touched:false,
              },
        },
        isSignup : true,
        error:false
    
      }
    
    
      checkValidity(value, rules) {
          let isValid = true;
          if (!rules) {
              return true;
          }
          
          if (rules.required) {
              isValid = value.trim() !== '' && isValid;
          }
    
          if (rules.minLength) {
              isValid = value.length >= rules.minLength && isValid
          }
    
          if (rules.maxLength) {
              isValid = value.length <= rules.maxLength && isValid
          }
    
          if (rules.isEmail) {
              const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
              isValid = pattern.test(value) && isValid
          }
    
          if (rules.isNumeric) {
              const pattern = /^\d+$/;
              isValid = pattern.test(value) && isValid
          }
    
          return isValid;
      }
    
      inputChangeHandler = (event , contolName)=>{
              const updatedControls = {
                  ...this.state.controls,
                  [contolName] : {
                      ...this.state.controls[contolName],
                      value:event.target.value,
                      valid:this.checkValidity(event.target.value, this.state.controls[contolName].validation),
                      touched:true,
                  }
              }
              this.setState({controls:updatedControls})
          }
    
    
      submitHandler = (event) => {
        event.preventDefault();
        console.log(this.state.controls.email.value , this.state.controls.password.value) ;

        if(this.state.controls.email.value.length !== 10){
            this.setState({
              error:true,
            })
        }else{ 
             this.props.onAuth(this.state.controls.email.value ,this.state.controls.password.value)
        }
      };
    
    
      render() {
        
        const formElementArray = [];
        for (let key in this.state.controls) {
          formElementArray.push({
            id: key,
            config: this.state.controls[key],
          });
        }      
    
    
        let form = formElementArray.map((formElement) => (
          <Input
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            shouldValidate={formElement.config.validation}
            invalid={!formElement.config.valid}
            touched={formElement.config.touched}
            changed={(event) => this.inputChangeHandler(event, formElement.id)}
          />
        ));;  

       
        if(this.props.loading){
          form = <div className="loader">loading ...</div>
        }
    
        let errorMessage = null;
    
        if(this.props.error){
          errorMessage=(
          <p>{this.props.error.message}</p>
          )
        }


        let message =null;

        if(this.state.error){
          message = <div style={{color:"#F00" , textAlign:"center" , marginBottom:"20px",fontWeight:"500"}}> Oops!! National Id must be 10 numbers</div>
          
        }
    
        let authenticated = null;
        if(this.props.isAdmin ){
         authenticated = <Redirect to='/get/all/employee'/>
        }else{
          if(this.props.department === "idcard"){
            authenticated = <Redirect to='/first/id/requests'/>
          }else if(this.props.department === "familybook"){
            authenticated=<Redirect to='/order/family/book'/>
          }else if(this.props.department === "passport"){
            authenticated=<Redirect to="/new/passport"/>
          }else if(this.props.department === "birthcertificate "){
            authenticated=<Redirect to="/order/birth/certificate"/>
          }

        }
       
        return (
          <div className="main_container">
          <div className="Auth">
                    {authenticated}
                    {errorMessage}
                  <form onSubmit={this.submitHandler}>
                    <h1 style={{marginTop:"2rem"}}>Sign In </h1>
                    {form}
                    {message}
                    <button style={{marginTop:"5rem"}} type='submit' className="custom-button btn-info ">LogIN</button>
                  </form>
                </div>
                </div>
        );
      }
    }
    
    const mapStateToProps = state =>{
        return{
          loading:state.auth.loading,
          isAuhthenticated : state.auth.token !==null,
          department : state.auth.department,
          isAdmin : state.auth.isAdmin,

          error:state.auth.error,
          isSignUp:state.auth.isSignUp,
        }
}

const mapDispatchToProps = dispatch =>{
    return{
      onAuth:(email,password)=>dispatch(actions.auth(email,password))
    };
}


export default connect(mapStateToProps , mapDispatchToProps)(Login);       