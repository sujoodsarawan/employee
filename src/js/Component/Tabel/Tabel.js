import React from "react";
import { Link } from "react-router-dom";

const TabelForm = ({
  nationalIdForKid,
  data,
  requestedDate,
  socialSecurityNumber,
  flagServiceNoteBook,
  index,
  image,
  link,
}) => {
  console.log(flagServiceNoteBook)

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
          <a href={`https://graduationproject1.herokuapp.com${flagServiceNoteBook}`}  target="_blank" rel="noopener noreferrer">
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
  return nationalIdForKid ? FirstRequest : RenewRequest;
};
export default TabelForm;
