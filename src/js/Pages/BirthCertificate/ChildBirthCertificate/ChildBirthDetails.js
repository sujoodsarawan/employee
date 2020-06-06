import React, { Component } from "react";
import FormInput from "../../../Component/FormInput/FormInput";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

const inputs = [
  {
    name: "firstname",
    type: "text",
    label: "First Name ",
    required: true,
  },
  {
    name: "secondname",
    type: "text",
    label: "Second Name",
    required: true,
  },
  {
    name: "thirdname",
    type: "text",
    label: "Third Name",
    required: true,
  },
  {
    name: "lastname",
    type: "text",
    label: "Last Name",
    required: true,
  },
  {
    name: "nationalid",
    type: "text",
    label: "National Id",
    required: true,
  },
  {
    name: "nationalidforfather",
    type: "text",
    label: "Father's NationalID",
    required: true,
  },
  {
    name: "motherfirstname",
    type: "text",
    label: "Mother's First Name",
    required: true,
  },
  {
    name: "mothersecondname",
    type: "text",
    label: "Mother's Second Name",
    required: true,
  },
  {
    name: "motherlastname",
    type: "text",
    label: "Mother's Last Name",
    required: true,
  },  {
    name: "address",
    type: "text",
    label: "Address",
    required: true,
  }, {
    name: "bloodtype",
    type: "text",
    label: "Blood Type",
    required: true,
  },
  {
    name: "birthdate",
    type: "date",
    label: "Birth Date",
    required: true,
  },
  {
    name: "birthplace",
    type: "text",
    label: "Birth Place",
    required: true,
  },
  {
    name: "numberofissueleft",
    type: "text",
    label: "Number Of issue Left",
    required: true,
  },
  {
    name: "numberofissueright",
    type: "text",
    label: "Number Of issue Right",
    required: true,
  },
  {
    name: "familyroll",
    type: "text",
    label: "Family Role",
    required: true,
  },
  {
    name: "birthcertificateplaceofissue",
    type: "text",
    label: "Birth Certificate Place Of Issue",
    required: true,
  },
];
class ChildBirthDetails extends Component {
  constructor(props) {
    super(props);
    this.state = inputs.reduce(
      (acc, input) => {
        return { ...acc, [input.name]: "" };
      },
      {
        firstname:"",
        secondname:"",
        thirdname:"",
        lastname:"",
        nationalidforfather:"",
        nationalid:"",
        motherfirstname:"",
        mothersecondname:"",
        motherlastname:"",
        gender:"",
        address:"",
        bloodtype:"",
        birthplace:"",
        numberofissueleft:"",
        numberofissueright:"",
        familyroll:"",
        birthcertificateplaceofissue:"",       
        birthdate: "",
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
    console.log(this.state);

    const data = this.state;

    axios.post("https://graduationproject1.herokuapp.com/birthcertificate/acceptbirthcertificaterequestforchild",data)
    .then(response=>{
        console.log(response);
    })
    .catch(error=>{
        console.log(error);
    })
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
        <section className="order-section">
          <div className="wrapper2 wrapper2--w790">
            <div className="card card-5">
              <div className="card-heading">
                <h2 className="title">Oredr Birth Certificate</h2>
              </div>
              <div className="card-body">
                <form>
                  {list}

                  <select
                    id="gender"
                    name="gender"
                    value={this.state.gender}
                    onChange={this.handelChange}
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                  <div style={{ textAlign: "center", marginTop: "1rem" }}>
                    <div className="u-margin-top-big">
                      <button
                        className="btn-info custom-button"
                        style={{ width: "250px", padding: "13px" }}
                        onClick={this.handleSubmit}
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>

                


        </section>
      </div>
    );
  }
}

export default ChildBirthDetails;
