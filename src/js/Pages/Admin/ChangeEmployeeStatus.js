import React from "react";
import axios from 'axios';
import FormInput from "../../Component/FormInput/FormInput";
import Modal from "../../Component/backDrop/Modal";
import OrderSummary from "../../Component/OrderSummary/OrderSummary";

const inputs = [
    {
      name: "nationalid",
      type: "text",
      label: "National Id",
      required: true,
      disabled:true,
    }
  ];
  



class ChangeEmployeeStatus extends React.Component{

    constructor(props) {
        super(props);
        this.state = inputs.reduce(
          (acc, input) => {
            return { ...acc, [input.name]: "" };
          },
          {
            nationalid: "",
            department: "idcard",
            loading:true,
            complete: false,
            Post:'',
            status: "",
          }
        );
      }


      componentDidMount(){
          this.setState({
              nationalid:this.props.match.params.id
          })
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
    
        const data = {
           employeenationailid : this.state.nationalid,
           department:this.state.department
        }
        
        axios
          .post("https://graduationproject1.herokuapp.com/admin/empstatus",data)
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
    



    render(){
      
        const {complete , Post , status} = this.state;


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


          
    let Order = null;

    Order = 
    <OrderSummary
    title="Change Employee Status"
    post={Post}
    status={status}
    RedirectHandler={
      status === 200 ? this.RedirectHandler : this.StayOnPageHandler
    }
    
    />

          
        return(
            <div>
                      
         <Modal show={complete}>{Order}</Modal>
        
          <section className="order-section">
          <div className="wrapper2 wrapper2--w790">
            <div className="card card-5">
              <div className="card-heading">
                <h2 className="title">Change  Employee Status</h2>
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
        )
    }
}

export default ChangeEmployeeStatus;