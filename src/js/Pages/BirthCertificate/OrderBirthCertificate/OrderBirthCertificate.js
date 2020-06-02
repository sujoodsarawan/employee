import React, { Component } from 'react';
import axios from "axios";
import TabelForm from '../../../Component/Tabel/Tabel';

class OrderBirthCertificate extends Component {
    constructor(props) {
        super(props);
        this.state = {
    
          existData: [],
          loading: false
        };
      }
      componentDidMount() {
        let url = "https://graduationproject1.herokuapp.com/birthcertificate/getrequestedbirthcertificates";
        axios
          .get(url)
          .then((response) => {
    
            this.setState({
              existData: response.data.doc,
              loading: true
            }, console.log(this.state.existData))
          })
          .catch((err) => {
            console.log(err);
          });
      }
      renderTableData() {
        const { existData } = this.state;
        return existData.map((employee,index) => (
          <TabelForm
            index={index}
            key={employee._id}
            requestedDate={employee.requestedDate}
            socialSecurityNumber={employee.socialSecurityNumber}
            link="/order/birth/certificate"
            {...this.props}
          />
        ));

        
      }
    
      render() {
    
        const { loading, existData } = this.state;
    
        let tabel = null;
    
        tabel = existData ? tabel = (
          <table className="content-table" style={{ width: "76%", margin: "30px auto" }}>
            <thead>
              <tr>
                <th>Number</th>
                <th>Social Security Ssn</th>
                <th>Date</th>
                <th>More Info</th>
              </tr>
            </thead>
            <tbody>{this.renderTableData()}</tbody>
          </table>
        ) : <div style={{textAlign:"center"}}>No Requests</div>
    
    
    
        return (
          <div>    
            <div className="main_container">
              {loading ? tabel :  <div style={{textAlign:"center"}} className="loader">Loading...</div>}
            </div>
          </div>
        );
      }

      
}

export default OrderBirthCertificate;