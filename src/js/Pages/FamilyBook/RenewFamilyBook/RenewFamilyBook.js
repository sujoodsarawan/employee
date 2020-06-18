import React from 'react';
import axios from "axios";
import TabelForm from '../../../Component/Tabel/Tabel';

class RenewFamilyBook extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
          existData: [],
          loading: false,
          nationalIdForKid: "",
        };
      }
    
      fetchDataHandler = () => {
    
        console.log("fetchData , id ");
    
        axios
          .get("https://graduationproject1.herokuapp.com/familybook/getallrenewrequestedfamilybooks")
          .then((response) => {
            this.setState({ existData: response.data.doc, loading: true });
            console.log(response)
          })
          .catch((error) => {
            console.log(error);
          });
          console.log("fetchData , endid ");
      };
    
      componentDidMount() {
        this.fetchDataHandler();
        console.log("componentDidMount , id")
      }
      renderTableData() {
        const { existData } = this.state;
        return existData.map((employee, index) => (

          <TabelForm
            key={employee._id}
            index={index}
            socialSecurityNumber={employee.familyBookId}
            nationalIdForKid={employee.socialSecurityNumberForFather}
            requestedDate={new Date(employee.requestedDate).toDateString()}
            link="/renew/family/book"
            {...this.props}
          />
        ));
      }
    
      render() {
        const { loading, existData } = this.state;
    
        console.log(loading)
    
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
                  <th>Father's SSN</th>
                  <th>Family BookId</th>
                  <th>Date</th>
                  <th>More Info</th>
                </tr>
              </thead>
              <tbody>{this.renderTableData()}</tbody>
            </table>
          ))
        ) : (
          <div style={{ textAlign: "center" }}>No Requests</div>
        );
    
        return (
          <div>
            <div className="main_container">
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

export default RenewFamilyBook;
