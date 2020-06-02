import React, { Component } from "react";
import axios from "axios";
import TabelForm from "../../../Component/Tabel/Tabel";

class SearchId extends Component {
  state = {
    existData: [],
    loading: false,
    error: false,
  };

  SearchData(search) {
    let url = `https://graduationproject1.herokuapp.com/id/getSpecificRequestedId/${search}`;
    if (search.length === 4) {
      url = `https://graduationproject1.herokuapp.com/id/getSpecificRequestedIdForKids/${search}`;
    }

    axios
      .get(url)
      .then((response) => {
        this.setState({ existData: response.data.doc, loading: true });
      })
      .catch((error) => {
        this.setState({ loading: false, error: true });
      });
  }
  componentDidMount() {
    let search = this.props.match.params["term"];
    console.log(this.props)
    this.SearchData(search);
  }
  componentDidUpdate(prevProps) {
    if (this.props.match.params["term"] !== prevProps.match.params["term"]) {
      let search = this.props.match.params["term"];
      this.SearchData(search);
    }
  }

  renderTableData() {
    const { existData } = this.state;
    console.log(existData);
    return (
      <TabelForm
        index={0}
        key={existData._id}
        requestedDate={existData.requestedDate}
        nationalIdForKid={existData.nationalIdForKid}
        socialSecurityNumber={
          existData.socialSecurityNumber
            ? existData.socialSecurityNumber
            : existData.socialSecurityNumberForFather
        }
      />
    );
  }

  render() {
    const { existData, loading } = this.state;

    let tabel = existData ? (
      existData.nationalIdForKid ? (
        <table
          className="content-table"
          style={{ width: "76%", margin: "30px auto" }}
        >
          <thead>
            <tr>
              <th>Number</th>
              <th>Father's Id</th>
              <th>Nationa id</th>
              <th>Date</th>
              <th>Complete</th>
            </tr>
          </thead>
          <tbody>{this.renderTableData()}</tbody>
        </table>
      ) : (
        <table
          className="content-table"
          style={{ width: "76%", margin: "30px auto" }}
        >
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
      )
    ) : (
      <div style={{ textAlign: "center" }}>No Data Found </div>
    );

    return (
      <div className="main_container">
        {loading ? tabel : <div className="loader">loading ...</div>}
      </div>
    );
  }
}

export default SearchId;
