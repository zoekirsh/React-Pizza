import React, { Component, Fragment } from 'react';
import Header from './components/Header'
import PizzaForm from './components/PizzaForm'
import PizzaList from './containers/PizzaList'
import Favorites from './containers/Favorites';

class App extends Component {
  state = {
    pizzas: [],
    selectedPizza: {},
    favorites: []
  }

  componentDidMount() {
    fetch('http://localhost:3000/pizzas')
    .then(res => res.json())
    .then(data => this.setState({
      pizzas: data
    }))
  }

  handleClick = (pizza) => {
    this.setState({
      selectedPizza: pizza
    })
  }

  // for topping & size ONLY
  handleFormChange = (e) => {
    e.persist();
    this.setState(prevState => ({
        selectedPizza: {
          ...prevState.selectedPizza,
          [e.target.name]: e.target.value
        }
      })
    )
  }

  // for vegetarian option ONLY
  handleVeggie = (e) => {
    e.persist()

    let veggie 
    e.target.value === "Vegetarian" ? veggie = true : veggie = false

    this.setState(prevState => ({
      selectedPizza: {
        ...prevState.selectedPizza,
        [e.target.name]: veggie
      }
    })
  )
  }

  handleSubmit = (e) => {
    //e.preventDefault();

    let missingPizza = this.state.pizzas.filter(pizza => pizza.id != this.state.selectedPizza.id)
    
    fetch(`http://localhost:3000/pizzas/${this.state.selectedPizza.id}`, {
      method: 'PATCH',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(this.state.selectedPizza)
    })
    .then(res => res.json())
    .then(data => this.setState({
      pizzas: [data, ...missingPizza]
    }))
  }

  handleFave = (pizza) => {
    let currentFaves = this.state.favorites
    let currentPizzas = this.state.pizzas
    let minusPizza = this.state.favorites.filter(item => item.id != pizza.id)
    let missingPizza = this.state.pizzas.filter(item => item.id != pizza.id)

    if (currentFaves.includes(pizza)) {
      this.setState({
        pizzas: [...currentPizzas, pizza],
        favorites: minusPizza
      })
    } else {
      this.setState({
        pizzas: missingPizza,
        favorites : [...currentFaves, pizza]
      })
    }
  }


  render() {
    const { pizzas, selectedPizza, favorites } = this.state
    return (
      <Fragment>
        <Header/>
        <PizzaForm selectedPizza={selectedPizza} handleChange={this.handleFormChange} handleVeggie={this.handleVeggie} handleSubmit={this.handleSubmit}/>
        <PizzaList pizzas={pizzas} handleClick={this.handleClick} handleFave={this.handleFave}/>
        <Favorites favorites={favorites} handleFave={this.handleFave}/>
      </Fragment>
    );
  }
}

export default App;
