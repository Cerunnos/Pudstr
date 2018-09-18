import React, { Component } from 'react';
import {Map,InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import '../App.css';
import './searchform.css';
import APIKEY from './Apikey'
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom'

export class MapContainer extends Component {
	state={
		activeMarker:{},
		showingInfoWindow:false,
		selectedPlace:{},
		matchTP:'',
		clicked:false
	}

	onMarkerClick = (props, marker) => {
		let matchFound = this.props.tpLocations.results.find(location => {
			return location.geometry.location === props.position
		})
		this.setState({
			activeMarker:marker,
			selectedPlace:props,
			showingInfoWindow:true,
			matchTP: matchFound
		})
		this.props.setMatchTP(matchFound)
	}

	mainMarkerClick=()=>{
	}


  render() {
	// console.log(this.rerenderMap)
	let locationMarkers = []
	if (this.props.tpLocations.results){
		 locationMarkers = this.props.tpLocations.results.map((location) => {
			 return <Marker
			 	key={location.id}
			 	icon={{
				 url: "http://bryanortiz.me/t2.png",
				 anchor: new window.google.maps.Point(32,32),
				 scaledSize: new window.google.maps.Size(64,64)
			 	}}
				onClick={this.onMarkerClick} name={'Pudstr Location'} position={location.geometry.location} />
		 })
	}

	const style = {
		height: '63%',
		width: '85%',
		padding: '10 px'
	}
    return (
		<div>
		{this.state.clicked ? <Redirect to="/comments"/> : null}
      <Map className='ui modal' className="Map"
				google={this.props.google}
				zoom={14}
				initialCenter={this.props.location}
				center={this.props.location}
				visible={true}
				style={style}>

        <Marker
					name={'You Are Here'}
					onClick={this.mainMarkerClick}
					position={this.props.location}
					icon={{
						url: "http://bryanortiz.me/yahi1.png",
						anchor: new window.google.maps.Point(32,32),
						scaledSize: new window.google.maps.Size(64,64)
				 	}}
				 />
				{locationMarkers}
				<InfoWindow
				onOpen={this.mainMarkerClick}
				marker={this.state.activeMarker}
				visible={this.state.showingInfoWindow}>
					<div>
						<h4>{this.state.matchTP.name}</h4>
						<p>{this.state.matchTP.opening_hours ? `Currently Open: ${this.state.matchTP.opening_hours.open_now}` : null}</p>
						<p>Address: {this.state.matchTP.vicinity}</p>
						<p>{this.state.matchTP.rating ? `Rating: ${this.state.matchTP.rating}` : null}</p>
					</div>
				</InfoWindow>
      </Map>
		</div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: (APIKEY)
})(MapContainer)
