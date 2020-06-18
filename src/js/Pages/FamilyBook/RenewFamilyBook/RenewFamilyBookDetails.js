import React from "react";
import axios from "axios";
import FormInput from "../../../Component/FormInput/FormInput";
import Form from "../../../Component/FormInput/Form";

const inputs = [
    {
        name: "familybookid",
        type: "text",
        label: "Family Book ID",
        required: true,
      },
    {
        name: "socialsecuritynumberforfather",
        type: "text",
        label: "Father's SSN",
        required: true,
      },
//familybookplaceofissue

  ];

class RenewFamilyBookDetails extends React.Component {

    constructor(props) {
        super(props);
        this.state = inputs.reduce(
          (acc, input) => {
            return { ...acc, [input.name]: "" };
          },
          {
            socialsecuritynumberforfather: "",
            familybookid:"",
            familybookplaceofissue:"",
            both:false,
            family:false,
            father:false
          }
        );
      }
    
      handelChange = (e) => {
        const { value, name } = e.target;
        this.setState({
          [name]: value,
        });
      };
    
      AcceptRequestHandler = (e) => {
        e.preventDefault();

        if(this.state.familybookid.length !== 6 && this.state.socialsecuritynumberforfather.length !== 8){
          this.setState({
            both: true
          })
        }else if(this.state.familybookid.length !== 6){
          this.setState({
            family: true
          })
        }else if(this.state.socialsecuritynumberforfather.length !== 8){
          this.setState({
            father: true
          })
        }else{
          this.setState({
            both:false,
            family:false,
            father:false
          })
       axios
          .delete(`https://graduationproject1.herokuapp.com/familyBook/deleteRenewRequestedFamilyBook/${this.state.familybookid}`)
          .then((response) => {
            console.log(response);
        ///renew/family/book
            this.props.history.push("/renew/family/book");

          })
          .catch((error) => {
            console.log(error);
          });}
      };

      RejectRequestHandler = (e)=>{
        e.preventDefault()
        const data = this.state;
    
        console.log(data);
       axios
          .delete(`https://graduationproject1.herokuapp.com/familyBook/deleteRenewRequestedFamilyBook/${this.state.familybookid}`)
          .then((response) => {
            console.log(response);
            this.props.history.push("/renew/family/book");
            
          })
          .catch((error) => {
            console.log(error);
          });
      }
    
      render() {
       
        const {family , both , father} = this.state;

        let message = null;

        if(both){
         message = <div style={{color:"#F00" , textAlign:"center" , marginBottom:"20px",fontWeight:"500"}}> Oops!! Social Security Numbers for Father must be 8 digits and Family Book Id must be 6 numbers</div>

        }if(father){
          message = <div style={{color:"#F00" , textAlign:"center" , marginBottom:"20px",fontWeight:"500"}}> Oops!! Social Security Numbers for Father must be 8 digits</div>
        }if(family){
         message = <div style={{color:"#F00" , textAlign:"center" , marginBottom:"20px",fontWeight:"500"}}> Oops!! Family Book Id must be 6 numbers</div>

        }
    
        const list = inputs.map((input) => {
          return (
            <FormInput
              name={input.name}
              key={input.name}
              type={input.type}
              value={this.state[input.name]}
              label={input.label}
              handelChange={this.handelChange}
              disabled={input.disabled}
              required={input.required}
            />
          );
        });
    
        return (
          <div className="main_container">
            <Form
                title="Renew Family Book "
                handelSubmit={this.handleSubmit}
                AcceptRequestHandler={this.AcceptRequestHandler}
                RejectRequestHandler={this.RejectRequestHandler}
                list={list}
                message={message}
            />
          </div>
        );



      }

    





}  
export default RenewFamilyBookDetails;
