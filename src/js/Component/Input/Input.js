import React from "react";

const Input = ({ elementType, ...props }) => {
  let inputElemnet = null;
  const inputClasses = ["InputElement"] 


  if(props.invalid && props.shouldValidate && props.touched){
      inputClasses.push("Inavlid")
  }
  switch (elementType) {
    case " input ":
      inputElemnet = (
        <input
          className={inputClasses.join(' ')}
          {...props.elementConfig}
          value={props.value}   
          onChange={props.changed}
        />
      );
      break;
    case "textarea":
      inputElemnet = (
        <textarea
          className={inputClasses.join(' ')}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
      break;
    case "select":
      inputElemnet = (
        <select className="InputElement" value={props.value} onChange={props.changed} >
          {props.elementConfig.options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.displayValue}
            </option>
          ))}
        </select>
      );
      break;
    default:
      inputElemnet = (
        <input
          className={inputClasses.join(' ')}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
  }

  return (
    <div className="Input">
      <label className="Label">{props.label}</label>
      {inputElemnet}
    </div>
  );
};

export default Input;
