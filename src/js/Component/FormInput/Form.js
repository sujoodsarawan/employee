import React from "react";

const Form = ({
  handleSubmit,
  button,
  AcceptRequestHandler,
  RejectRequestHandler,
  list,
  title,
}) => {
  return (
    <section className="order-section">
      <div className="wrapper2 wrapper2--w790">
        <div className="card card-5">
          <div className="card-heading">
            <h2 className="title">{title}</h2>
          </div>
          <div className="card-body">
            <form>
              {list}
              {button === 1 ? (
                <div style={{ textAlign: "center", marginTop: "1rem" }}>
                  <div className="u-margin-top-big">
                    <button
                      className="btn-info custom-button"
                      style={{ width: "250px", padding: "13px" }}
                      onClick={handleSubmit}
                    >
                      Submit
                    </button>
                  </div>
                </div>
              ) : (
                <div className="u-text-center u-margin-top-big ">
                  <div className="btn-box">
                    <button
                      className="btn-info custom-button btn-width"
                      onClick={AcceptRequestHandler}
                      style={{ width: "130px" }}
                    >
                      Accept
                    </button>
                  </div>

                  <div className="btn-box">
                    <button
                      className="btn-delete custom-button btn-width"
                      onClick={RejectRequestHandler}
                      style={{ width: "130px" }}
                    >
                      Reject
                    </button>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Form;
