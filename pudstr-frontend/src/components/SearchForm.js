import React, { Component } from 'react';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete'
import './searchform.css';
import { Redirect } from 'react-router';
import {GoogleApiWrapper} from 'google-maps-react';
import APIKEY from './Apikey'

class SearchForm extends Component {
  constructor(props) {
    super(props)
    this.state = { address: 'Enter Your Location',locked:true}
    this.onChange = (address) => this.setState({ address })
  }

  // onChange = (address) => {
  //   this.setState({ address })
  // }

  handleFormSubmit = (event) => {
    event.preventDefault()
		this.props.setSideNav()
    geocodeByAddress(this.state.address)
      .then(results => getLatLng(results[0]))
      .then(latLng => this.props.grabLocation(latLng))
      .catch(error => console.error('Error', error))
  }

  render() {
    // console.log(this.props)
    const inputProps = {
      value: this.state.address,
      onChange: this.onChange
    }
    return (
			<div>
			{this.props.locked ? <Redirect to="/" /> : null}
				<form className='SearchForm' onSubmit={this.handleFormSubmit}>
	        <PlacesAutocomplete inputProps={inputProps}/>
	        <button className="ui button green" type="submit">Submit</button>
	      </form>
			</div>
    )
  }
}

export default SearchForm
// export default GoogleApiWrapper({
//   apiKey: (APIKEY)
// })(SearchForm)
