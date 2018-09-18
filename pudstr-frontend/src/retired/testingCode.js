<div>
	{this.state.visible ? null : <Redirect to="/dash" /> }
	{this.state.alreadyUser ?
		<form onSubmit={this.handleGetSubmit}>
			<br/>
			<h2>Log In</h2>
			<br/>
			<Form>
			<input type="text" placeholder="name" name="name" onChange={this.handleChange}/>
			</Form>
			<Button size='large' color='primary' type="submit">
			Submit
			</Button>
			<br/> <p> </p>
			<Button size='large' color='green'> <p onClick={this.handleCreateClick}>Not a User? Make new account</p></Button>
		</form>  :
		<form onSubmit={this.handleCreateSubmit}>
			<br/>
			<h2>Create New Account</h2>
			<br/>
			<input type="text" placeholder="Enter Name" name="name" onChange={this.handleChange}/>
			<input type="submit"/>
			<br/><p> </p>
			<Button size='large' color='green'><p onClick={this.handleBackClick}>Back</p></Button>
		</form>}
</div>
