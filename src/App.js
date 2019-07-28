import React from "react";
import "./App.css";

class App extends React.Component {
  state = {
    name: "Cristian",
    pokemon: null,
    showImages: false
  };

  handleChange = event => this.setState({ name: event.target.value });

  handleSubmit = async e => {
    e.preventDefault();
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${this.state.name}`
    );
    const parsedResponse = await response.json();
    this.setState({ pokemon: parsedResponse, showImages: false });
  };

  async componentDidMount() {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/pikachu`);
    const parsedResponse = await response.json();

    this.setState({ name: parsedResponse.name });
  }
  render() {
    console.log(this.state.pokemon && this.state.pokemon.moves);
    return (
      <div className="app">
        <div className="search-box">
          <h1>Find a pokemon</h1>
          <form onSubmit={this.handleSubmit}>
            <input
              onChange={this.handleChange}
              placeholder="type a pokemon name"
            />
            <button>Search for a pokemon</button>
          </form>
        </div>
        <div className="pokemon-box">
          {this.state.pokemon ? (
            <div>
              <h2>Name: {this.state.pokemon.name}</h2>

              {this.state.showImages ? (
                <div className="pokemon-sprites">
                  {Object.values(this.state.pokemon.sprites).map(src => (
                    <div className="pokemon" key={src}>
                      <img src={src} />
                    </div>
                  ))}
                </div>
              ) : (
                <img
                  onClick={() => this.setState({ showImages: true })}
                  src={this.state.pokemon.sprites.front_default}
                />
              )}
              <div>
                {this.state.pokemon.moves.slice(0, 5).map(move => (
                  <div>{move.move.name}</div>
                ))}
              </div>
            </div>
          ) : (
            "no pokemon stored"
          )}
        </div>
      </div>
    );
  }
}

export default App;
