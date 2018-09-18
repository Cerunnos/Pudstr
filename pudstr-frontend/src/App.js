import React, { Component } from 'react';
// import MapContainer from './components/MapContainer'
import './App.css';
import './realappcssnotreally.css';

import SEARCHFORM from './components/SearchForm';
import MapContainer from './components/MapContainer';
import {Route, Link} from 'react-router-dom';
import UserLogin from './components/Userlogin';
import Comments from './components/Comments';


class App extends Component {
	state={
		location:null,
		visible:false,
		tpLocations: [],
		locked:true,
		matchTP:{},
		sidenav:false,
		comments:[],
		user:{},
		allusers:[]
	}


		fetchLocations = () => {
			let LOCATIONSURL =''

			if (this.state.location){
				LOCATIONSURL = `https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${this.state.location.lat},${this.state.location.lng}&radius=2500&type=overall&keyword=restroom&key=AIzaSyB-QdrzvR2sNlHBYZQjLe59ADkfmjQ3oRY`

				fetch(LOCATIONSURL)
					.then(res => res.json())
					.then(json => this.setTpLocation(json))

				this.fetchComments()

			}
		}

fetchComments=()=>{
	fetch(`http://localhost:3000/comments`)
	.then(res=>res.json())
	.then(json=>this.setComments(json))
}
		setComments=(json)=>{
			this.setState({
				comments:json
			})
		}

		setTpLocation = (json) => {
			this.setState ({
				tpLocations: json

			})

		}

		setMatchTP=(matchTP)=>{
			this.setState({
				matchTP: matchTP
			})
		}

	grabLocation=(latLng)=>{
		this.setState({
			location:latLng,
			visible:true
		},()=> this.fetchLocations())
	}

	setMapContainer=()=>{
		if (this.state.location !== null){
			return <MapContainer
			location={this.state.location} visible={this.state.visible} tpLocations={this.state.tpLocations}
			setMatchTP={this.setMatchTP}
			/>
		}
	}

	unlock=()=>{
		this.setState({
			locked:false
		})
	}

	setAppUser=(user)=>{
		this.setState({
			user
		})
	}

	setSideNav=()=>{
		this.setState({
			sidenav:true
		})
	}

	getUsers=(json)=>{
		this.setState({
			allusers: json
		})
	}

  render() {
    return (
      <div className="App">
				<header className="App-header">

					<marquee><img src="https://vignette.wikia.nocookie.net/tfbnebs/images/d/d5/Toilet.png/revision/latest?cb=20140712011831" className="App-logo" alt="logo" /></marquee>
					<h1 className="App-titles">Welcome to Pudstr {this.state.user.name}</h1>
				</header>
				<Route exact path="/" render={()=><UserLogin unlock={this.unlock} setAppUser={this.setAppUser} getUsers={this.getUsers}/>}/>
				<div className="MainPage">
					<div className="SeachForm">
						<Route exact path="/dash" render={()=><SEARCHFORM grabLocation={this.grabLocation} locked={this.state.locked}
						setSideNav={this.setSideNav}/>}/>
					</div>
				<div className="ui divided items">{this.setMapContainer()}</div>
				</div>

				{this.state.sidenav ? <div className="sidenav">
				<div className="comments">
					<Comments matchTP={this.state.matchTP} comments={this.state.comments} user={this.state.user}
					allusers={this.state.allusers}
					fetchComments={this.fetchComments}/>
				</div>
				</div> : null}


      </div>
    );
  }
}

export default App;
