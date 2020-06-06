import React from "react";

import BackDrop from "./backDrop";

class Modal extends React.Component {
  render() {
    return (
      <div>
        <BackDrop show={this.props.show} />

        <div
          className="Modal"
          style={{
            transform: this.props.show ? "translateY(0)" : "translateY(-100vh)",
            opacity: this.props.show ? "1" : "0",
          }}
        >
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default Modal;
