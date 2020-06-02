import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import SideBar from "./SideBar";

class Navbar extends Component {
  state = {
    data: "",
  };

  changeHandler = (e) => {
    const { value, name } = e.target;
    this.setState({
      [name]: value,
    });
  };

  submitHandler = (event) => {
    event.preventDefault();
    const { data } = this.state;
    this.props.history.push(`/search-result/${data}`);

    this.setState({
      data: "",
    });
  };

 

  render() {
    const { data } = this.state;

    return (
      <div className="wrapper3">
        <div className="top_navbar">
          <div className="hamburger">
            <div className="one"></div>
            <div className="two"></div>
            <div className="three"></div>
          </div>
          <div className="top_menu">
            <div className="logo">logo</div>
            <ul>
              <li>
                <form onSubmit={this.submitHandler}>
                  <input
                    className="search-box"
                    type="text"
                    value={data}
                    name="data"
                    placeholder="Search.."
                    onChange={this.changeHandler}
                  />
                </form>
              </li>
            </ul>
          </div>
        </div>

          <SideBar/>
      </div>
    );
  }
}

export default withRouter(Navbar);
