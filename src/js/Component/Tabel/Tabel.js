import React from "react";
import { Link } from "react-router-dom";

const TabelForm = ({
  nationalIdForKid,
  data,
  nationalid,
  requestedDate,
  email,
  isAdmin,
  socialSecurityNumber,
  flagServiceNoteBook,
  department,
  index,
  image,
  link,
  deleteEmployeeHandler
}) => {
  let admin = isAdmin ? "true" :"false"; 

  let RenewRequest = (
    <tr>
      <td>{index + 1}</td>
      <td>{data}</td>
      <td>{requestedDate}</td>
      <td>
        <Link
          //`/renew/id/requests/${socialSecurityNumber}`
          to={`${link}/${data}`}
          className="btn-info custom-button"
        >
          Info
        </Link>
      </td>
    </tr>
  );

  let FirstRequest = (
    <tr>
      <td>{index + 1}</td>
      <td>{nationalIdForKid}</td>
      <td>
        {socialSecurityNumber ? (
          socialSecurityNumber
        ) : (
          <a href={`https://graduationproject1.herokuapp.com${flagServiceNoteBook ? flagServiceNoteBook : image }`}  target="_blank" rel="noopener noreferrer">
            {" "}
            <i className="fa fa-image" style={{fontSize:"25px" , color:"#2b5c7d"}}></i>
          </a>
        )}
      </td>
      <td>{requestedDate}</td>

      <td>
        <Link
          to={`${link}/${nationalIdForKid}`}
          className="btn-info custom-button"
        >
          Accept
        </Link>
      </td>
    </tr>
  );

  let employee = (
    <tr>
    <td>{index + 1}</td>
    <td>{nationalid}</td>
    <td>{department}</td>
    <td>{email}</td>
  <td>{admin}</td>
    <td>
      <Link
        to={`${link}/${nationalid}`}
        className="btn-info custom-button" 
        style={{padding:"13px 0"}}
     >
        Change
      </Link>
    </td>
    <td>
    <button
        className="btn-delete custom-button btn-width"
        style={{ width: "80px" }}
        onClick={deleteEmployeeHandler}
      >
        Delete
      </button>
    </td>

  </tr>

  )

  return department ? employee :nationalIdForKid ? FirstRequest : RenewRequest;
};
export default TabelForm;
