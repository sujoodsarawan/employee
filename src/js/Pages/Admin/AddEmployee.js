import React, { Component } from "react";
import FormInput from "../../Component/FormInput/FormInput";
import axios from "axios";
import OrderSummary from "../../Component/OrderSummary/OrderSummary";
import Modal from "../../Component/backDrop/Modal";

const inputs = [
  {
    name: "nationalid",
    type: "text",
    label: "National Id",
    required: true,
  },{
    name: "workemail",
    type: "email",
    label: "Email",
    required: true,
  },
  {
    name: "password",
    type: "password",
    label: "Password",
    required: true,
  },
];

class AddEmployee extends Component {
  constructor(props) {
    super(props);
    this.state = inputs.reduce(
      (acc, input) => {
        return { ...acc, [input.name]: "" };
      },
      {
        nationalid: "",
        department: "idcard",
        workemail: "",
        admin:false,
        complete: false,
        Post:'',
        status: "",
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

    let data = null;

    if(this.state.admin === "yes"){
      data = {
        nationalid:this.state.nationalid,
        department:this.state.department,
        workemail:this.state.workemail,
        password:this.state.password,
        isadmin:true        
      }      
    }else{
      data = {
        nationalid:this.state.nationalid,
        department:this.state.department,
        workemail:this.state.workemail,
        password:this.state.password,
        isadmin:false        
      }      
    }
    axios
      .post("https://graduationproject1.herokuapp.com/admin/addemployee",data)
      .then((response) => {
        console.log(response);
        this.setState({
          complete: true,
          Post:response.data.message,
          status: response.status,
        })
      })
      .catch((error) => {
        console.log(error);
      });
  
   
  
  

  };

  RedirectHandler = () => {this.props.history.replace("/");};

  StayOnPageHandler = () => {this.setState({ complete: false });};

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
    console.log(this.state.department);

    const {complete , Post , status} = this.state;


    let Order = null;

    Order = 
    <OrderSummary
    title="Add New Employee"
    post={Post}
    status={status}
    RedirectHandler={
      status === 200 ? this.RedirectHandler : this.StayOnPageHandler
    }
    
    />


    return (
      <div className="main_container">
     
     <Modal show={complete}>{Order}</Modal>
     
        <section className="order-section">
          <div className="wrapper2 wrapper2--w790">
            <div className="card card-5">
              <div className="card-heading">
                <h2 className="title">Add New Employee</h2>
              </div>
              <div className="card-body">
                <form>
                  {list}

                  <div className="form-row">
                    <div className="name">Department</div>
                    <div className="value">
                      <div className="input-group-desc">
                        <select
                          id="department"
                          name="department"
                          value={this.state.department}
                          onChange={this.handelChange}
                          className="input--style-5"
                          style={{ padding: "13px" }}
                        >
                          <option value="idcard">ID Card</option>
                          <option value="familybook">Family Book</option>
                          <option value="passport">Passport</option>
                          <option value="birthcertificate">
                            Birth Certificate
                          </option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <p className="radioparagraph">
                    <input type="radio" id="admin"
                     name="admin"   
                     value="yes"
                    checked={this.state.admin === "yes"}
                    onChange={this.handelChange}  />
                    <label htmlFor="admin">Admin</label>
                  </p>
                  <p className="radioparagraph">
                    <input type="radio" id="test2" name="admin"
                    value="no"
                    checked ={this.state.admin === "no"}
                    onChange={this.handelChange}
                    
                    />
                    <label htmlFor="test2">Employee</label>
                  </p >
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

export default AddEmployee;
