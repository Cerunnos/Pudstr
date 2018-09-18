import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import APIKEY from './Apikey'
const BASEURL = 'https://data.cityofnewyork.us/resource/r27e-u3sy.json'

class App extends Component {

componentDidMount(){
	fetch(BASEURL)
	.then(res=>res.json())
	.then(json=>console.log(json[100]))
}

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>

				<h3>Pudster Demo</h3>
				<div id="map"></div>
				<script>
					function initMap() {
						var uluru = {lat: 40.7053, lng: -74.0140};
						var map = new google.maps.Map(document.getElementById('map'), {
							zoom: 10,
							center: uluru
						});
						var marker = new google.maps.Marker({
							position: uluru,
							map: map
						});
					}
				</script>
				<script async defer
				src="https://maps.googleapis.com/maps/api/js?key=AIzaSyC6q5ZBOo_qpx8X14312VGvaxYptAReqrU&callback=initMap">
				</script>




      </div>
    );
  }
}

export default App;
