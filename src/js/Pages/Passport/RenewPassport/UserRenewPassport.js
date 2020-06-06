import React from 'react';
import axios from "axios";
import Form from '../../../Component/FormInput/Form';
import FormInput from '../../../Component/FormInput/FormInput';


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
    },    {
        name: "passportId",
        type: "text",
        label: "Passport Id",
        disabled: true,
        required: true,
      },
    {
      name: "passPortExpiryDate",
      type: "text",
      label: "Passport Expiry Date",
      disabled: true,
      required: true,
    },
    {
      name: "passPortReleaseDate",
      type: "text",
      label: "Passport Release Date",
      disabled: true,
      required: true,
    }, {
      name: "passportPlaceOfIssue",
      type: "text",
      label: "Pssport Place Of Issue",
      disabled: true,
      required: true,
    },
  
  ];

class UserRenewPassport extends React.Component{
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
            passPortExpiryDate: "",
            passPortReleaseDate: "",
            passportId: "",
            passportPlaceOfIssue: "",
            loading:false,
            error:false
          }
        );
      }
    
      componentDidMount() {
        const ssn = this.props.match.params.id;
        
        

        axios
          .get(`https://graduationproject1.herokuapp.com/passport//getpassportdata/${ssn}`
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
              passPortExpiryDate:data.passPortExpiryDate,
              passPortReleaseDate:data.passPortReleaseDate,
              passportId:data.passportId,
              passportPlaceOfIssue:data.passportPlaceOfIssue,

             
            });
            
            console.log(response);
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
    
        const socialSecurityNumber = this.props.match.params.id;

        const data = {
          socialsecuritynumber: socialSecurityNumber,
        };
    
        console.log(data);
        axios.post(
            "https://graduationproject1.herokuapp.com/passport/acceptrenewpassport",
            data
          )
          .then((response) => {
            console.log(response);
             this.props.history.push("/renew/passport");
          })
          .catch((error) => {
            console.log(error);
          });
    
    
      };
    
      RejectRequestHandler = (event) => {
        event.preventDefault();
    
        const  socialSecurityNumber  = this.props.match.params.id;
        const data = {
          socialsecuritynumber: socialSecurityNumber,
        };
        console.log(data);
        axios
          .post(
            "https://graduationproject1.herokuapp.com/passport/rejectrenewpassport",
            data
          )
          .then((response) => {
            console.log(response);
            this.props.history.push("/renew/passport");
          })
          .catch((error) => {
            console.log(error);
          });
      };
    
      render() {
    
        const {loading} = this.state;

        console.log(this.state);
    
    
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
        title="Renew Passport "
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

export default UserRenewPassport;