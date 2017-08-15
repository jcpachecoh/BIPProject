import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import { showBips } from '../actions'
import { Table } from 'react-bootstrap';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';



class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bipEUR: [],
      bipGBP: [],
      bipUSD: [],
      time: [],
      data: []
    }
  }

  
  componentWillMount() {
     setInterval(() => { 
        return fetch('https://api.coindesk.com/v1/bpi/currentprice.json')
          .then((response) => response.json())
          .then((responseJson) => {
            this.setState({
              isLoading: false,
              bipEUR: responseJson.bpi.EUR,
              bipGBP: responseJson.bpi.GBP,
              bipUSD: responseJson.bpi.USD,
              time: responseJson.time,
              data: this.state.data.concat({"time": responseJson.time.updated, "EUR": responseJson.bpi.EUR.rate_float, "GBP": responseJson.bpi.GBP.rate_float, "USD": responseJson.bpi.USD.rate_float})
            }, function() {
              // do something with new state
              console.log(this.state.data);

            });
          })
     },60000);
  }
  
  render() {
  const columnStyle = {
          textAlign: "justify"
      };

    if(this.state) {
      return (
        <div>
            <h1>BPI App</h1>
              <h3> BitCoint(24h)</h3>
              <h3> Date: {this.state.time.updated}</h3>
              <Table >
                <tbody>
                  <tr><td> {this.state.bipEUR.code} : {this.state.bipEUR.rate_float} </td></tr> 
                  <tr><td> {this.state.bipGBP.code} : {this.state.bipGBP.rate_float} </td></tr> 
                  <tr><td> {this.state.bipUSD.code} : {this.state.bipUSD.rate_float} </td></tr> 
              </tbody>
              </Table>
              <LineChart width={600} height={400} data={this.state.data}
                    margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                  <XAxis dataKey="time"/>
                  <YAxis dataKey="USD" type="number"/>
                  <CartesianGrid strokeDasharray="5 5"/>
                  <Tooltip/>
                  <Legend />
                  <Line type="monotone" dataKey="EUR" stroke="#8884d8" activeDot={{r: 8}}/>
                  <Line type="monotone" dataKey="GBP" stroke="#82ca9d" />
                  <Line type="monotone" dataKey="USD" stroke="#000000" />

              </LineChart>
        </div>
      );
    }
  }
}

export default App