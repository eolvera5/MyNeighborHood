import React, { Component } from 'react';
import PropTypes from "prop-types";
import MapContainer from'./MapContainer';
import Hamburger from'./Hamburger';
import './css/Sidebar.css';
import './css/Input.css';

/**
*Component that fits all UI's together
**/
class Sidebar extends Component {

	state = {
		sideNavStyle: '0',
		hamburgerClassName: 'hamburger hamburger--minus js-hamburger',
		placesToDisplay: [],
		query: '',
		listItemSelected: '',
		hamburgerArialabel: 'Hamburger Menu closed. Click to Open',
		inputTabIndex: -12,
	}

	//Toggles hamburger menu item between open and close
	hamburgerToggle = () => {
		if(this.state.hamburgerClassName === 'hamburger hamburger--minus js-hamburger')
			this.setState({
				sideNavStyle: '',
				hamburgerClassName: 'hamburger hamburger--minus is-active',
				hamburgerArialabel: 'Hamburger Menu open. Click to Close',
				inputTabIndex: 3
			})
		else
			this.setState({
				sideNavStyle: '0',
				hamburgerClassName: 'hamburger hamburger--minus js-hamburger',
				hamburgerArialabel: 'Hamburger Menu closed. Click to Open',
				inputTabIndex: -12
			})
	}
	//Query search bar input and reset list item selected
	handleQueryEvent = (query) => {
		this.setState({query: query, listItemSelected: ''})
		this.search(query);
	}

	//Method called from handleQueryEvent
	search = (thisQuery) => {
		//If no input query, do not filter results. Display all places.
		if(thisQuery.length === 0)
			this.setState({placesToDisplay: this.props.activeMarkers});
		else
			//Filter input query on the list items and maps places.
			this.setState({placesToDisplay:
				this.props.activeMarkers.filter(p => p.title.toLowerCase().includes(thisQuery.trim().toLowerCase()))})
	}

	//Display all place markers by default
	componentWillMount() {
		this.setState({placesToDisplay: this.props.activeMarkers})
	}

	//Hamburger menu navigtion
	onclickOrTouch=() => {
		this.setState({
			sideNavStyle:'0',
			 hamburgerClassName:'hamburger hamburger--minus js-hamburger',
			 hamburgerArialabel:'Hamburger Menu closed. Click to Open',
			 inputTabIndex:-12
		})
	}
	render() {
		return(
			<div>
				<div
					id={'mySidenav'}
					className={'sidenav'}
					style={{width:this.state.sideNavStyle}}
				>
					<label className="inp" tabIndex={this.state.inputTabIndex}>
						<input
							type="text"
							id="inp"
							placeholder="&nbsp;"
							onChange={event => this.handleQueryEvent(event.target.value)}
							value={this.state.query}
							aria-label='search bar'
							tabIndex={this.state.inputTabIndex}
							className='searchbar'
						/>
						<span className="label">Search:</span>
					  	<svg width="120px" height="26px" viewBox="0 0 120 26">
					    	<path d="M0,25 C21,25 46,25 74,25 C102,25 118,25 120,25"></path>
					  	</svg>
					  <span className="border"></span>
					</label>
					{this.state.placesToDisplay.map((place, index) => (
						<div
							className='placediv'
							tabIndex={this.state.inputTabIndex+index}
							key={index}
							onClick={() => this.setState({listItemSelected: place.title})}
						>
							<a>{place.title}</a>
						</div>
					))}

				</div>
				<div
					id='main'
					style={{marginLeft: '0'}}
					tabIndex='-1'>
					<div className={'top-section'} tabIndex='-1'>
						<Hamburger
							hamburgerArialabel={this.state.hamburgerArialabel}
							hamburgerClassName={this.state.hamburgerClassName}
							hamburgerToggle = {this.hamburgerToggle}
						/>
						<h1 className={'mainheading'} tabIndex='1'>Farmer's Market</h1>
					</div>
					<div
						className={'map-area'}
						onClick={this.onclickOrTouch}
						onTouchMove={this.onclickOrTouch}
						role='application'
						aria-label='Google Maps Internal Window'
						tabIndex='9'
					>
						<MapContainer
							tabIndex='10'
							placesToDisplay={this.state.placesToDisplay}
							placeSelected={this.state.listItemSelected}
							selectPlace={(place) => {this.setState({listItemSelected: place})}}
						/>
					</div>
				</div>
			</div>
		)
	}
}
Sidebar.propTypes = {
  activeMarkers: PropTypes.array.isRequired,
}
export default Sidebar;
