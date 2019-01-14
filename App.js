import React, { Component } from 'react';
import Sidebar from"./components/Sidebar";

/*Passes all places into the map as props.*/

class App extends Component {

  state = {
    places: [
      {title: "Playa Vista Farmers' Market", location: {lat: 33.9728841, lng: -118.42205380000001}},
      {title: "Venice Farmers Market", location: {lat: 33.9872636, lng: -118.4652532}},
      {title: "Manhattan Beach Farmer's Market", location: {lat: 33.8867415, lng: -118.40943219999997}},
      {title: "Hermosa Beach Farmers Market", location: {lat:33.86, lng: -118.4}},
      {title: "Westchester Farmers Market", location: {lat: 33.9559726, lng: -118.41626730000002}}
    ],

 }
 render(){
    return(
      <Sidebar activeMarkers={this.state.places} />
    )
  }
}

export default App;
