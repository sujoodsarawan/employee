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
            familybookplaceofissue:""
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
        
        const data = this.state;
    
        console.log(data);
       axios
          .post(`https://graduationproject1.herokuapp.com/familyBook/renewfamilybook`, data)
          .then((response) => {
            console.log(response);
        ///renew/family/book
            this.props.history.push("/renew/family/book");

          })
          .catch((error) => {
            console.log(error);
          });
      };

      RejectRequestHandler = (e)=>{
        e.preventDefault()
        const data = this.state;
    
        console.log(data);
       axios
          .post(`https://graduationproject1.herokuapp.com/familybook/rejectrenewfamilybook`, data)
          .then((response) => {
            console.log(response);
            this.props.history.push("/renew/family/book");
            
          })
          .catch((error) => {
            console.log(error);
          });
      }
    
      render() {
       
    
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
            />
          </div>
        );



      }

    





}  
export default RenewFamilyBookDetails;
