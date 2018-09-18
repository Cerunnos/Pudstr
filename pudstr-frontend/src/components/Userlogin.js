import React, {Component} from 'react';
import { Redirect } from 'react-router';
// import { Button, Divider, Form } from 'semantic-ui-react'
const BASE_URL = 'http://localhost:3000';

export default class UserLogin extends Component{
	state={
		input: '',
		fireRedirect: false,
		alreadyUser:true,
		user:{},
		visible:true
	}

	handleChange = (e) => {
		this.setState({
			input: e.target.value
		})
	}

	handleCreateSubmit = (event) => {
		event.preventDefault()
		fetch(`${BASE_URL}/users`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json'
			},
			body: JSON.stringify({
				name: this.state.input,
				points: 0,
				favorites: ''
			})
		})
		.then((res) => res.json())
		.then(json => {
			console.log(json)
		})
	}

	handleGetSubmit=(event)=>{
		event.preventDefault()
		fetch(`${BASE_URL}/users`)
		.then(res=>res.json())
		.then(json=>this.parseInfo(json))
	}

	parseInfo=(json)=>{
		this.props.getUsers(json)
		this.props.unlock()
		let jsonArray=json.find((user)=>{
			return this.state.input===user.name
		})
		this.setState({
			user:jsonArray,
			visible: false
		},()=>this.props.setAppUser(this.state.user))
	}

	handleCreateClick=()=>{
		this.setState({
			alreadyUser:!this.state.alreadyUser
		})
	}

	handleBackClick=()=>{
		this.setState({
			alreadyUser:!this.state.alreadyUser
		})
	}


	render(){
		return(
			<div>
				{this.state.visible ? null : <Redirect to="/dash" /> }
				{this.state.alreadyUser ?
					<form onSubmit={this.handleGetSubmit}>
						<br/>
						<h2>Log In</h2>
						<br/>
						<div className="ui input focus">
						<input type="text" placeholder="name" name="name" onChange={this.handleChange}/></div>
						<input className="ui button green" type="submit" />
						<br/> <p> </p>
						<p className="ui button primary" onClick={this.handleCreateClick}>Not a User? Make new account</p>
					</form>  :
					<form onSubmit={this.handleCreateSubmit}>
						<br/>
						<h2>Create New Account</h2>
						<br/>
						<div className="ui input focus">
						<input type="text" placeholder="Enter Name" name="name" onChange={this.handleChange}/></div>
						<input className="ui button green" type="submit"/>
						<br/><p> </p>
						<p className="ui button primary" onClick={this.handleBackClick}>Back</p>
					</form>}
			</div>
		)
	}
}
