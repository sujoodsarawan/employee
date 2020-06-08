import React from "react";
import axios from "axios";
import FormInput from "../../Component/FormInput/FormInput";
import Form from "../../Component/FormInput/Form";

const inputs = [
    {
        name: "socialsecuritynumberforhusband",
        type: "text",
        label: "Husband's SSN",
        required: true,
      },
    {
        name: "socialsecuritynumberforwife",
        type: "text",
        label: "Wife's SSN",
        required: true,
      },{
        name: "familybookplaceofissue",
        type: "text",
        label: "Family Book Place Of Issue",
        required: true,
      },    {
        name: "familybookid",
        type: "text",
        label: "Family Book ID",
        required: true,
      },

  ];

class OrderFamilyBookDetails extends React.Component{
    constructor(props) {
        super(props);
        this.state = inputs.reduce(
          (acc, input) => {
            return { ...acc, [input.name]: "" };
          },
          {
            socialsecuritynumberforwife: "",
            socialsecuritynumberforhusband:"",
            familybookplaceofissue:"",
            familybookid:""
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
          .post(`https://graduationproject1.herokuapp.com/familyBook/acceptaddfamilybook`, data)
          .then((response) => {
            console.log(response);
        ///renew/family/book
            this.props.history.push("/order/family/book");

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
          .post(`https://graduationproject1.herokuapp.com/familybook/rejectaddfamilybook`, data)
          .then((response) => {
            console.log(response);
            this.props.history.push("/order/family/book");
            
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
                title="Oredr Family Book "
                handelSubmit={this.handleSubmit}
                AcceptRequestHandler={this.AcceptRequestHandler}
                RejectRequestHandler={this.RejectRequestHandler}
                list={list}
            />
          </div>
        );
      }    

}

export default OrderFamilyBookDetails;