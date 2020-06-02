import React, { Component } from "react";
import axios from "axios";
import TabelForm from "../../../Component/Tabel/Tabel";

class FirstId extends Component {
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
      .get("https://graduationproject1.herokuapp.com/id/getrequestedidforkids")
      .then((response) => {
        this.setState({ existData: response.data.doc, loading: true });
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
        socialSecurityNumber={employee.socialSecurityNumberForFather}
        nationalIdForKid={employee.nationalIdForKid}
        requestedDate={employee.requestedDate}
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
          style={{ width: "76%", margin: "30px auto" }}
        >
          <thead>
            <tr>
              <th>Number</th>
              <th>Father's SSN</th>
              <th> National Id </th>
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

export default FirstId;
