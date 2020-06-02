import React, { Component } from "react";
import Form from "../../../Component/FormInput/Form";
import FormInput from "../../../Component/FormInput/FormInput";
import axios from "axios";

const inputs = [
  {
    name: "nationalid",
    type: "text",
    label: "National ID ",
    required: true,
  },
  {
    name: "socialsecuritynumber",
    type: "text",
    label: "Father's SSN",
    required: true,
  },

  {
    name: "idplaceofissue",
    type: "text",
    label: "ID Place Of Issue",
    required: true,
  },
];

class userDetails extends Component {
  constructor(props) {
    super(props);
    this.state = inputs.reduce(
      (acc, input) => {
        return { ...acc, [input.name]: "" };
      },
      {
        socialsecuritynumber: "",
        nationalid:"",
        idplaceofissue:"",
      }
    );
  }

  handelChange = (e) => {
    const { value, name } = e.target;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    
    const data = this.state;

    console.log(data);
   axios
      .post(`https://graduationproject1.herokuapp.com/id/AddId`, data)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

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
          title="Order ID CARD for child"
          handleSubmit={this.handleSubmit}
          list={list}
          button={1}
        />
      </div>
    );
  }
}

export default userDetails;
