import React, { Component } from 'react';


const Button = ({SaveChange , Delete , ...OtherProps}) =>{

    <button className={`
  ${Delete ? "delete" : ""}
  ${SaveChange ? "btn-info" : ""} custom-button`}  
  {...OtherProps} 
  >
    {children}
  </button>


}

export default Button;