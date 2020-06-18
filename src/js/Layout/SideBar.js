import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

class SideBar extends Component {
  render() {

    return (
      <div className="sidebar">
        {!this.props.isAuthenticated ? (
          <ul>
            <li>
              <Link to="/auth">
                <span className="icon">
                  <i className="fa fa-leaf"></i>
                </span>
                <span className="title">Log In</span>
              </Link>
            </li>
          </ul>
        ) : this.props.isAdmin ? (
          <ul>
            <li>
              <Link to="/get/all/employee">
                <span className="icon">
                  <i className="fa fa-leaf"></i>
                </span>
                <span className="title">Employees</span>
              </Link>
            </li>
            <li>
              <Link to="/add/employee">
                <span className="icon">
                  <i className="fa fa-leaf"></i>
                </span>
                <span className="title">add New Employee</span>
              </Link>
            </li>
            <li>
              <Link to="/logout">
                <span className="icon">
                  <i className="fa fa-leaf"></i>
                </span>
                <span className="title">Log Out</span>
              </Link>
            </li>
          </ul>
        ) : !this.props.isAdmin && this.props.department === "idcard" ? (
          <ul>
            <li>
              <Link to="/first/id/requests">
                <span className="icon">
                  <i className="fa fa-file-video"></i>
                </span>
                <span className="title">Order Id Card</span>
              </Link>
            </li>
            <li>
              <Link to="/renew/id/requests">
                <span className="icon">
                  <i className="fa fa-volleyball-ball"></i>
                </span>
                <span className="title">Renew Id Card</span>
              </Link>
            </li>
            <li>
              <Link to="/logout">
                <span className="icon">
                  <i className="fa fa-leaf"></i>
                </span>
                <span className="title">Log Out</span>
              </Link>
            </li>
          </ul>
        ) : !this.props.isAdmin && this.props.department === "familybook" ? (
          <ul>
            <li>
              <Link to="/order/family/book">
                <span className="icon">
                  <i className="fa fa-leaf"></i>
                </span>
                <span className="title">Order Family Book</span>
              </Link>
            </li>

            <li>
              <Link to="/renew/family/book">
                <span className="icon">
                  <i className="fa fa-leaf"></i>
                </span>
                <span className="title">Renew Family Book</span>
              </Link>
            </li>
            <li>
              <Link to="/logout">
                <span className="icon">
                  <i className="fa fa-leaf"></i>
                </span>
                <span className="title">Log Out</span>
              </Link>
            </li>
          </ul>
        ) : !this.props.isAdmin &&
          this.props.department === "birthcertificate" ? (
          <ul>
            <li>
              <Link to="/order/birth/certificate">
                <span className="icon">
                  <i className="fa fa-blog"></i>
                </span>
                <span className="title">Order Birth Certificate</span>
              </Link>
            </li>
            <li>
              <Link to="/child/birth/certificate">
                <span className="icon">
                  <i className="fa fa-leaf"></i>
                </span>
                <span className="title">Child Birth Certificate</span>
              </Link>
            </li>
            <li>
              <Link to="/logout">
                <span className="icon">
                  <i className="fa fa-leaf"></i>
                </span>
                <span className="title">Log Out</span>
              </Link>
            </li>
          </ul>
        ) : !this.props.isAdmin && this.props.department === "passport" ? (
          <ul>
            <li>
              <Link to="/new/passport">
                <span className="icon">
                  <i className="fa fa-leaf"></i>
                </span>
                <span className="title">Order Passport</span>
              </Link>
            </li>

            <li>
              <Link to="/renew/passport">
                <span className="icon">
                  <i className="fa fa-leaf"></i>
                </span>
                <span className="title">Renew Passport</span>
              </Link>
            </li>
            <li>
              <Link to="/logout">
                <span className="icon">
                  <i className="fa fa-leaf"></i>
                </span>
                <span className="title">Log Out</span>
              </Link>
            </li>
          </ul>
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
    department: state.auth.department,
    isAdmin: state.auth.isAdmin,
  };
};

export default connect(mapStateToProps)(SideBar);

