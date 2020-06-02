import React from "react";
import { Link } from "react-router-dom";

const TabelForm = ({
  nationalIdForKid,
  socialSecurityNumber,
  requestedDate,
  index,
  link
}) => {
  let RenewRequest = (
    <tr>
      <td>{index + 1}</td>
      <td>{socialSecurityNumber}</td>
      <td>{requestedDate}</td>
      <td>
        <Link
        //`/renew/id/requests/${socialSecurityNumber}`
          to={`${link}/${socialSecurityNumber}`}
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
      <td>{socialSecurityNumber}</td>
      <td>{nationalIdForKid}</td>
      <td>{requestedDate}</td>

      <td>
        <Link
          to={`/first/id/requests/${nationalIdForKid}`}
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
