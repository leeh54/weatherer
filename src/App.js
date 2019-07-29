import React from 'react';
import './App.css';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import { Bar } from 'react-chartjs-2'
import moment from 'moment'
import color from '@material-ui/core/colors/red';

class App extends React.Component {

  state = {
    weather: null,
    loading: false,
    text: '',
  }

  getWeather = async (e) => {
    e.preventDefault()
    this.setState({ loading: true, weather: null })
    var key = 'e4acd1f8c422ae674e066d723ac0a27d'
    var url = `http://api.openweathermap.org/data/2.5/forecast?q=${this.state.text}&units=imperial&APPID=${key}`
    var r = await fetch(url)
    var json = await r.json()
    console.log(json)
    if (r.status === 200) {
      this.setState({ weather: json.list, loading: false, text: '', error: null })
    } else {
      this.setState({ error: json.message, loading: false })
    }
  }

  render() {
    var { weather, loading, text, error } = this.state

    var data
    if (weather) {
      data = {
        labels: weather.map(w => moment(w.dt * 1000).format('MMMM Do YYYY, h:mm:ss a')),
        datasets: [{
          label: 'Temperature',
          borderwidth: 1,
          data: weather.map(w => w.main.temp),
          backgroundColor: 'rgba(132,99,255,0.2)',
          borderColor: 'rgba(132,99,255,1)',
          hoverBackgroundColor: 'rgba(132,99,255,0.4)',
          hoverBorderColor: 'rgba(132,99,255,1)',
        }]
      }
    }

    return (
      <div className="App">
        <form className="App-header" onSubmit={this.getWeather}>
          <Input
            autoFocus
            placeholder="Search for weather"
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
          {data && <Bar
            data={data}
            width={800}
            height={400}
          // options={{maintainAspectRatio: false}}
          />}
          {error}
        </main>
      </div>
    );
  }
}

export default App;
