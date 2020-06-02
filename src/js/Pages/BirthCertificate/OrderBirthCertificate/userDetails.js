import React, { Component } from 'react';
import axios from "axios";
import FormInput from '../../../Component/FormInput/FormInput';
import Form from '../../../Component/FormInput/Form';



const inputs = [
    {
      name: "fname",
      type: "text",
      label: "First Name",
      disabled: true,
      required: true,
    },
    {
      name: "sname",
      type: "text",
      label: "Second Name",
      disabled: true,
      required: true,
    },
    {
      name: "tname",
      type: "text",
      label: "Third Name",
      disabled: true,
      required: true,
    },
    {
      name: "lname",
      type: "text",
      label: "Last Name",
      disabled: true,
      required: true,
    },
    {
      name: "nationalId",
      type: "text",
      label: "National Id",
      disabled: true,
      required: true,
    },
    {
      name: "gender",
      type: "text",
      label: "Gender",
      disabled: true,
      required: true,
    },
    {
      name: "birthDate",
      type: "text",
      label: "Birth Date",
      disabled: true,
      required: true,
    },
    {
      name: "birthPlace",
      type: "text",
      label: "Birth Place",
      disabled: true,
      required: true,
    },
    {
      name: "motherFirstName",
      type: "text",
      label: "Mother Name",
      disabled: true,
      required: true,
    },
    {
      name: "socialSecurityNumber",
      type: "text",
      label: "SSN",
      disabled: true,
      required: true,
    },
    {
      name: "idExpiryDate",
      type: "text",
      label: "Expiry Date",
      disabled: true,
      required: true,
    },
  ];
  

class userDetail extends Component {
    constructor(props) {
        super(props);
        this.state = inputs.reduce(
          (acc, input) => {
            return { ...acc, [input.name]: "" };
          },
          {
            fname: "",
            sname: "",
            tname: "",
            lname: "",
            nationalId: "",
            gender: "",
            birthDate: "",
            birthPlace: "",
            motherFirstName: "",
            socialSecurityNumber: "",
            idExpiryDate: "",
            registrationPlace: "",
            registrationNumber: "",
            loading:false,
            error:false
          }
        );
      }
    
      componentDidMount() {
        const ssn = this.props.match.params.ssn;
    
        axios
          .get(
            `https://graduationproject1.herokuapp.com/id/user/cetizineIdData/${ssn}`
          )
          .then((response) => {
            const data = response.data.doc;
            this.setState({
    
              loading:true,
              fname: data.firstName,
              sname: data.secondName,
              tname: data.thirdName,
              lname: data.lastName,
              nationalId: data.nationalId,
              gender: data.gender,
              birthDate: data.birthDate,
              birthPlace: data.birthPlace,
              motherFirstName: data.motherFirstName,
              socialSecurityNumber: data.socialSecurityNumber,
              idExpiryDate: data.idExpiryDate,
            });
            
          })
          .catch((error) => {
           this.setState({
            error:true
           })
          });
      }
    
      handelChange = (e) => {
        const { value, name } = e.target;
        this.setState({
          [name]: value,
        });
      };
    
      AcceptRequestHandler = (event) => {
        event.preventDefault();
    
        const { socialSecurityNumber } = this.state;
        const data = {
          socialsecuritynumber: socialSecurityNumber,
        };
        console.log(data);
        axios
          .post(
            "https://graduationproject1.herokuapp.com/birthcertificate/acceptbirthcertificaterequest",
            data
          )
          .then((response) => {
            console.log(response);
          })
          .catch((error) => {
            console.log(error);
          });
    
    
      };
    
      RejectRequestHandler = (event) => {
        event.preventDefault();
    
        const { socialSecurityNumber } = this.state;
        const data = {
          socialsecuritynumber: socialSecurityNumber,
        };
        console.log(data);
        /*axios
          .post(
            " https://graduationproject1.herokuapp.com/id/user/rejectRenewId",
            data
          )
          .then((response) => {
            console.log(response);
          })
          .catch((error) => {
            console.log(error);
          });*/
      };
    
      render() {
    
        const {loading} = this.state;
    
    
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
    
        const form =  loading ?  <Form
        title="Order Birth Certificate"
        handelSubmit={this.handleSubmit}
        AcceptRequestHandler={this.AcceptRequestHandler}
        RejectRequestHandler={this.RejectRequestHandler}
        list={list}
      /> : <div className="loader">loading ..</div>
    
    
        return (
          <div>
            <div className="main_container">
                   {form}
            </div>
          </div>
        );
      }
}

export default userDetail;