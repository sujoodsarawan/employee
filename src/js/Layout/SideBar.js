import React, { Component } from 'react';
import {Link} from 'react-router-dom';


class SideBar extends Component {
    render() {
        return (          
        <div className="sidebar">
        <ul>
          <li>
            <a href="#!" className="active">
              <span className="icon">
                <i className="fas fa-book"></i>
              </span>
              <span className="title">Books</span>
            </a>
          </li>
          <li>
            <Link to="/first/id/requests">
              <span className="icon">
                <i className="fas fa-file-video"></i>
              </span>
              <span className="title">
                Home
              </span>
            </Link>
          </li>
          <li>
            <Link to='/renew/id/requests'>
              <span className="icon">
                <i className="fas fa-volleyball-ball"></i>
              </span>
              <span className="title">Renew Id</span>
            </Link>
          </li>
          <li>
            <Link to='/order/birth/certificate'>
              <span className="icon">
                <i className="fas fa-blog"></i>
              </span>
              <span className="title">Copy</span>
              </Link>
          </li>
          <li>
            <Link to='/child/birth/certificate'>
              <span className="icon">
                <i className="fas fa-leaf"></i>
              </span>
              <span className="title">Nature</span>
            </Link>
          </li>
          <li>
            <Link to='/renew/passport'>
              <span className="icon">
                <i className="fas fa-leaf"></i>
              </span>
              <span className="title">Renew Passport</span>
            </Link>
          </li>
        </ul>
      </div>
        );
    }
}

export default SideBar;