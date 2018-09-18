import React, {Component} from 'react';
import { Redirect } from 'react-router';
import './searchform.css';
// import { Button, Divider, Form } from 'semantic-ui-react'
const BASE_URL = 'http://localhost:3000';

export default class Comments extends Component{

	state={
		text:'',
		rating:1
	}

createComment=(event)=>{
	event.preventDefault()
	let address=this.props.matchTP.vicinity
	let comment=this.state.text
	let rating=this.state.rating
	fetch(`${BASE_URL}/comments`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'Accept': 'application/json'
		},
		body: JSON.stringify({
			title:address,
	    text:comment,
	    rating:rating,
			user_id:this.props.user.id
		})
	})
	.then((res) => res.json())
	.then(json => { console.log(json)
	})
}



	handleChange=(event)=>{
		this.setState({
			text:event.target.value
		})
	}

	onDropdownChange=(event)=>{
		this.setState({
			rating:event.target.value
		},()=>console.log(this.state.rating))
	}

	render(){
		let filterComments = this.props.comments.filter((comment)=>{
			return comment.title == this.props.matchTP.vicinity
		})
		let user = ''

		let commentList = filterComments.map((comment)=>{
			 user = this.props.allusers.find((user)=>{
				return user.id == comment.user_id
			})
		return<div className="ui orange raised card">
			<p>"{comment.text}"</p>
			<p className="author">-{user.name}</p>
			</div>
		})



		return(
			<div>
				<h3>{this.props.matchTP.vicinity}</h3><br/>
				<form onSubmit={this.createComment}><br/>
					<textarea onChange={this.handleChange}/><br/>
					<select onChange={this.onDropdownChange}>
					  <option value="1">1</option>
					  <option value="2">2</option>
					  <option value="3">3</option>
						<option value="4">4</option>
						<option value="5">5</option>
					</select>
					<input type='submit'/>
				</form>
				{commentList}
			</div>
		)
	}
}
