# Neighborhood Map React App

##About

This Farmers Market app displays a single page utilizing create-react-app, Google Maps API and
FourSquare API. The Page shows 5 map markers of Farmer's Market around the area of Los Angeles.
It also includes a search functionality that filters the markets by query.  

## How to Use the App

	1) The App will load a map near the area of Los Angeles with markers for nearby Farmers Markets.
	2) Click on a map marker to get details about the location.

##Install Locallly

	Make sure to have the latest version of Node.js installed

	1) Find directory that holds the project
	2) Open up Git in this location
	3) Run 'npm install'
	4) Run 'npm'start
	5) Open http://localhost:3000

##Important Info

	The service workers will only cache the site when in production mode
	[google-maps-react](https://github.com/fullstackreact/google-maps-react)
 	for Google Map API

	The API's used are Google Maps and FourSquare however, the free plans are limited
	to a certain number of requests per day.


## Load App in Production Mode

	To run a production build, you must follow these steps:

						'npm run build'
						then,
						'serve -s build'
