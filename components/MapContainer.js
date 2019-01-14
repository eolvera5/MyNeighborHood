import { Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import React, { Component } from 'react';
import PropTypes from "prop-types";
import * as FourSquare from './APIs/FourSquare.js';



/*
*Google Maps Container carried out with google-maps-react library
*/
class MapContainer extends Component {

  state = {
    bounds: {},
    infoWindowVisible: false,
    likes: '',
    photo: '',
    activeMarker: {}

  }

  //Bounds set to display all markers within the google maps container upon mounting componenent
    setBounds = () => {
      let bounds = new this.props.google.maps.LatLngBounds();
      for (let i = 0; i < this.props.placesToDisplay.length; i++)
          bounds.extend(this.props.placesToDisplay[i].location);
      this.setState({bounds})
    }


  //Used to open the infoWindow and load FourSquare info
    onMarkerClick = (markerProperties, markerReference) =>{
      this.setState({
        activeMarker: markerReference,
        infoWindowVisible: true,
        likes: 'Loading likes',
        photo: 'Loading photo'
      });
      this.getFourSquareInfo(markerProperties.position.lat, markerProperties.position.lng,markerProperties.title)

}

    //Grab FourSquare API info and error handling
    getFourSquareInfo = (lat,lng,name) => {
      return FourSquare.getSearchResult(lat, lng, name).then(venueId => {
        if(venueId ==='error' )
          this.setState({
              likes: 'Error loading Content',
              photo: 'error'
          });
         else {
          FourSquare.getDetails(venueId).then(response => {
            if(response === 'error' || response.meta.code !== 200)
              this.setState({
                likes: 'Error loading content',
                photo: 'error'
              });
            else{
              if('likes' in response.response.venue)
                this.setState({likes: response.response.venue.likes.summary});
              else
                this.setState({likes: 'Error loading content'});
              if('bestPhoto' in response.response.venue)
               this.setState({photo: response.response.venue.bestPhoto.prefix+'150'+response.response.venue.bestPhoto.suffix});
              else
                this.setState({photo:'error'});
            }
          })
        }
      })
    }

    gm_authFailure() {
       window.alert("Error: Google Maps Javascript API Key missing")
     }
    componentDidMount(){
      window.gm_authFailure = this.gm_authFailure;
     this.setBounds();
    }

  //Open corresponding marker when a place on the side list is selected
    getSnapshotBeforeUpdate(){
        if(this.props.placeSelected !== ''){
        this.setState({
          activeMarker:this.refs[this.props.placeSelected].marker,
           infoWindowVisible: true,
           likes:'Loading likes',
           photo:'Loading photo'
        });

        this.getFourSquareInfo(
          this.refs[this.props.placeSelected].props.position.lat,
          this.refs[this.props.placeSelected].props.position.lng,
          this.refs[this.props.placeSelected].props.title
        )
         this.props.selectPlace('')
      }
      return null;
    }

    componentDidUpdate(){
      return null;
    }

  render(){
      return (

        <Map
          className="map"
          role="application" aria-label="google map of Farmers' Markets" id="map"
          google={this.props.google}
          bounds={this.state.bounds}
          onClick={() => {this.setState({activeMarker: {},infoWindowVisible: false})}}
          ref={'map'}
          style={{width:this.props.mapWidth}}
          center={this.state.centre}

       >

       {this.props.placesToDisplay.map((markerInfo, index) =>

            <Marker
                ref={markerInfo.title}
                position={{lat: markerInfo.location.lat, lng: markerInfo.location.lng}}
                key={index}
                title={markerInfo.title}
                onClick={this.onMarkerClick}
                onMouseout={this.mouseMoveOutOfMarker}
                animation={this.state.activeMarker.title === markerInfo.title ? this.props.google.maps.Animation.DROP : null  }
                icon={{ url: 'http://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|efd6aa|40|_|%E2%80%A2',
                scaledSize: new this.props.google.maps.Size(30, 45)}}

/>
          )}


          <InfoWindow
            marker={this.state.activeMarker}
            onClose={() => this.setState({ infoWindowVisible: false})}
            visible={this.state.infoWindowVisible} >
              <div
                className="info-window-content"
                aria-label={`InfoWindow on ${this.state.activeMarker.title}`}
               >
                <h2 tabIndex="0" style={{textAlign:'center'}}>
                 {this.state.activeMarker.title}
                </h2>
                {this.state.photo ==='Loading photo' ?
                  <h3  tabIndex="0" style={{textAlign:'center'}}>Loading photo</h3> :
                  this.state.photo ==='error' ?
                  <h3  tabIndex="0" style={{textAlign:'center'}}>Photo could not load</h3> :
                  <div style={{textAlign:'center'}}>
                    <img  tabIndex="0"   src={this.state.photo}   alt={this.state.activeMarker.title + ' photo'}/>
                  </div>}
                <h3 tabIndex="0"  style={{textAlign:'center'}}>{this.state.likes}</h3>
  </div>
          </InfoWindow>
        </Map>
      );
    }
  }

  const LoadingContainer = (props) => (
    <div className="loading">Loading... Check your connection.</div>
  )

export default  GoogleApiWrapper({
  apiKey:'AIzaSyBwRY9lZuxvK1Bfgh6eypvpWdTUllof0Lg',
  LoadingContainer: LoadingContainer
})(MapContainer)

MapContainer.propTypes = {
  placesToDisplay: PropTypes.array.isRequired,
  placeSelected: PropTypes.string.isRequired,
  selectPlace: PropTypes.func.isRequired
}
