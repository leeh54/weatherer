import React from 'react';
import logo from './logo.svg';
import './App.css';
import Meme from './Meme';

class App extends React.Component {

  state = {
    memes: [],
    loading: false,
    text: '',
  }

  getMemes = async (e) => {
    e.preventDefault()
    this.setState({ loading: true })
    var key = 'fuTct3EvEztztauofIqmyNiyP6YRwSjw'
    var url = `http://api.giphy.com/v1/gifs/search?q=${this.state.text}&api_key=${key}`
    var r = await fetch(url)
    var json = await r.json()
    this.setState({ memes: json.data, loading: false, text: '' })
  }

  render() {
    var { memes, loading, text } = this.state
    return (
      <div className="App">
        <form className="App-header" onSubmit={this.getMemes}>
          <input value={text}
            onChange={e => this.setState({ text: e.target.value })}
          />
          <button disabled={loading || !text} type="submit">Search</button>
        </form>
        <main>
          {memes.map(meme => {
            return <Meme key={meme.id} meme={meme} />
          })}
          />
        })}
        </main>
      </div>
    );
  }
}

export default App;
