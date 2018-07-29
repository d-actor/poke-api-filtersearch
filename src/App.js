import React, { Component } from 'react';
import styled from 'styled-components';
import axios from 'axios';

class App extends Component {
  state = { pokemon: [], value: '' }

  componentDidMount() {
    axios.get('https://pokeapi.co/api/v2/pokemon/')
      .then( res => {
        this.setState({ pokemon: res.data.results });
      })
      .catch( err => {
        console.log(err)
        // throw error
      })
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  search = () => {
    const { pokemon, value } = this.state;
    return pokemon.filter( poke => {
      const regex = new RegExp( value, 'gi');
      return poke.name.match(regex)
    })
  }

  displayResults = () => {
    const { value } = this.state
    const matchArray = this.search()
    return matchArray.map( poke => {
      return(
        <li>
          { poke.name }
        </li>
      )
    })
  }

  render() {
    return (
      <div>
        <h1>Pokemon Search</h1>
        <input name='value' onChange={this.handleChange} />
        <ul>
          { this.displayResults() }
        </ul>
      </div>
    );
  }
}

export default App;

