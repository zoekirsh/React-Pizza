import React, { Component } from 'react';
import Pizza from '../components/Pizza'
class Favorites extends Component {

  render() {
    return (
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Favorites</th>
          </tr>
        </thead>
        <tbody>
          {
            this.props.favorites.map(pizza => <Pizza details={pizza} handleFave={this.props.handleFave}/>)
          }
        </tbody>
      </table>
    );
  }

}

export default Favorites;