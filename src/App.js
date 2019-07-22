import React from 'react';
import logo from './logo.svg';
import './App.css';
import { makeStyles, withTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';

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
          <Input 
          autoFocus
          placeholder="Search"
          value={text}
            onChange={e => this.setState({ text: e.target.value })}
          />
          <Button 
          disabled={loading || !text} 
          type="submit">
          Enter
          </Button>
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

function Meme(props){
  const {meme} = props
  const url = meme.images.fixed_height.url
  return (<div className="meme-wrap" onClick={()=>window.open(url, '_blank')}>
    <img height="200" alt="meme" src={url} />
  </div>)
}

export default App;
