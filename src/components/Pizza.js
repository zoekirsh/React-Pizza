import React from "react"

const Pizza = (props) => {
  return(
    <tr>
      <td>{props.details.topping}</td>
      <td>{props.details.size}</td>
      <td>{props.details.vegetarian? "Yes" : "No"}</td>
      <td><button type="button" className="btn btn-primary" onClick={() => props.handleClick(props.details)}>Edit Pizza</button></td>
      <td><button type="button" className="btn btn-primary" onClick={() => props.handleFave(props.details)}>FAV</button></td>
    </tr>
  )
}

export default Pizza
