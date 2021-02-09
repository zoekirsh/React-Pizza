import React, { Component } from 'react';
import Pizza from '../components/Pizza'
class PizzaList extends Component {

  render() {
    return (
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Topping</th>
            <th scope="col">Size</th>
            <th scope="col">Vegetarian?</th>
            <th scope="col">Edit</th>
            <th scope="col">Fave!</th>
          </tr>
        </thead>
        <tbody>
          {
            this.props.pizzas.map(pizza => <Pizza details={pizza} handleClick={this.props.handleClick} handleFave={this.props.handleFave}/>)
          }
        </tbody>
      </table>
    );
  }

}

export default PizzaList;
