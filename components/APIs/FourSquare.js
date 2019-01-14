const CLIENT_ID = 'D3ORZFPUDJHDTRT0L5B23W15FYTIUC1EFEFCIIBNIEI5D33G';
const CLIENT_SECRET = 'YAYETGAV4J1R5G102SZQNAVZJETMQO1VKMO0VSMKKPZI3FXM';
const API = "https://api.foursquare.com/v2";
const VERSION = "20181006";

const RADIUS_M = 550;
const SEARCH_RESULTS = 1;

/**
 *Use lat, lng & name to fetch a venue id from FourSquare.
 */
export const getSearchResult = (lat, lng, title) =>
	fetch(`${API}/venues/search?ll=${lat},${lng}&limit=${SEARCH_RESULTS}&radius=${RADIUS_M}&query=${title}
    	&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&v=${VERSION}`)
	.then(response => response.json())
	.then(response => response.response.venues[0].id)
	.catch(e => alert("Can't load data from FourSquare. Check your connection"));
/**
 *Use FourSquare id to return array of details
 */
export const getDetails = (id) =>
	fetch(`${API}/venues/${id}?&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&v=${VERSION}`)
	.then(res => res.json())
	.catch(e => alert("Can't load data from FourSquare. Check your connection"));
	// handling errors
