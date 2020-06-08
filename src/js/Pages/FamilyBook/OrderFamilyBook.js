import React, { Component } from 'react';
import axios from "axios";
import TabelForm from '../../Component/Tabel/Tabel';


class OrderFamilyBook extends Component {
    constructor(props) {
        super(props);
        this.state = {
          existData: [],
          loading: false,
          data:""
        };
      }
    
    
    
      componentDidMount() {
        axios
          .get(
            "https://graduationproject1.herokuapp.com/familybook/getallnewrequestedfamilybooks"
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
    
      renderTableData() {
        const { existData } = this.state;
        return existData.map((employee, index) => {
            return(
             <TabelForm
                index={index}
                key={employee._id}
                requestedDate={employee.socialSecurityNumberForWife}
                nationalIdForKid={employee.socialSecurityNumberForHusband}
                image={employee.marrageContract.substring(7) }
                link="/order/family/book"
                {...this.props}
              />
            )

        }

        );
      }
    
      render() {
        const { loading, existData } = this.state;
    
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
                  <th>Husband'SSN</th>
                  <th>Marrage Contract</th>
                  <th>Wife's SSN</th>
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

export default OrderFamilyBook;