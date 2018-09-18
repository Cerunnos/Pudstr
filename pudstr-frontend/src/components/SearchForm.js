import React from 'react'
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete'
import './searchform.css';
import { Redirect } from 'react-router';

class SimpleForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = { address: 'Enter Your Location',locked:true}
    this.onChange = (address) => this.setState({ address })
  }

  handleFormSubmit = (event) => {
    event.preventDefault()
		this.props.setSideNav()
    geocodeByAddress(this.state.address)
      .then(results => getLatLng(results[0]))
      .then(latLng => this.props.grabLocation(latLng))
      .catch(error => console.error('Error', error))
  }

  render() {

    const inputProps = {
      value: this.state.address,
      onChange: this.onChange,
    }
    return (
			<div>
			{this.props.locked ? <Redirect to="/" /> : null}
				<form className='SearchForm' onSubmit={this.handleFormSubmit}>
	        <PlacesAutocomplete inputProps={inputProps} />
	        <button className="ui button green" type="submit">Submit</button>
	      </form>
			</div>
    )
  }
}

export default SimpleForm
