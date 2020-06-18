import React from "react";
import TabelForm from "../../Component/Tabel/Tabel";
import axios from "axios";
import OrderSummary from "../../Component/OrderSummary/OrderSummary";
import Modal from "../../Component/backDrop/Modal";

class ViewALLEmployee extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          existData: [],
          loading: false,
          data:"",
          complete:false,
          Post:''
        };
      }
    
    fetchData = () =>{
      axios
      .get(
        "https://graduationproject1.herokuapp.com/admin/getemps"
      )
      .then((response) => {
        this.setState({
          existData: response.data.doc,
          loading: true,
        });
        console.log(response.data.doc);
      })
      .catch((err) => {
        console.log(err);
      });
    }
    
      componentDidMount() {
        
        this.fetchData();
      }
    
      renderTableData() {
        const { existData } = this.state;
        return existData.map((employee, index) => (
          <TabelForm
            index={index}
            key={employee._id}
            nationalid={employee.nationalId}
            department={employee.department}
            email={employee.workEmail}
            isAdmin={employee.isAdmin}
            deleteEmployeeHandler = {()=>this.DeleteEmployee(employee.nationalId)}
            link='/change/employee/status'
          />
        ));
      }




      
  RedirectHandler = () => {this.props.history.replace("/");};

  StayOnPageHandler = () => {this.setState({ complete: false });};

      DeleteEmployee =(Nationalid)=>{
       
       
        console.log("delete" , Nationalid);

        axios.delete(`https://graduationproject1.herokuapp.com/admin/empid/${Nationalid}`)
        .then(response=>{
          console.log(response)
          this.setState({
            complete:true,
            status:response.status,
            Post:response.data.message

          })

        
        })
        .catch(error=>{
          console.log(error)
        })
  
  
  
      }
    
      render() {
        const { loading, existData , complete , status , Post } = this.state;
    
        let tabel = null;
    

        
        tabel = existData ? (
          (tabel = (
            <table
              className="content-table"
              style={{ width: "85%", margin: "30px auto" }}
            >
              <thead>
                <tr>
                  <th>Number</th>
                  <th>National Id</th>
                  <th>Department</th>
                  <th>Email</th>
                  <th>Admin</th>
                  <th>Change status</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>{this.renderTableData()}</tbody>
            </table>
          ))
        ) : (
          <div style={{ textAlign: "center" }}>No Requests</div>
        );
    
        let Order = null;

        Order = 
        <OrderSummary
        title="DELETE Request"
        post={Post}
        status={status}
        RedirectHandler={
        status === 200 ? this.RedirectHandler : this.StayOnPageHandler}

        />
    
    
        return (
          <div>
    
            <div className="main_container">
              
                <Modal show={complete}>{Order}</Modal>
               {loading ? (
                tabel
              ) : (
                <div style={{ textAlign: "center" }} className="loader">
                  Loading...
                </div>
              )}
    
              
            </div>
          </div>
        );
      }
   
}

export default ViewALLEmployee;