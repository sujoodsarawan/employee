import React from "react";


const FormInput = ({ handelChange, label, ...OtherProps }) => (
    <div className="form-row">
      <div className="name">{label}</div>
        <div className="value">
        <div className="input-group-desc">              
                <input className="input--style-5" onChange={handelChange} {...OtherProps}/>
        </div>
        </div>
     </div>
);

export default FormInput;
