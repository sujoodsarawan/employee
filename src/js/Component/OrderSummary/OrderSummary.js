import React from "react";

const OrderSummary = ({ post, RedirectHandler, title, status }) => {
  return (
    <div className="ordersummary">
      <div className="u-margin-bottom-small2 " style={{ textAlign: "center" }}>
        {status === 200 ? (
          <div>
            <i className="fa fa-check-circle Check"></i>
            <h2 style={{textAlign:"left"}}>Request succeeded</h2>            
          </div>
        ) : (
          <div>
          
            <i className="fa fa-times Check"></i>
            <h2 style={{textAlign:"left"}}>Request Faild</h2>
          </div>
        )}
      </div>

      <p>{post}</p>
      <div style={{ textAlign: "right" }}>
        <button onClick={RedirectHandler} className="custom-button btn-ok ">
          Ok
        </button>
      </div>
    </div>
  );
};

export default OrderSummary;
