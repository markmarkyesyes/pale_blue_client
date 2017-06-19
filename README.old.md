# pale_blue_client


state = {
	dotsList: [
		{
    	lng = -71.2760,
    	lat = 42.4906,
    	contentId: mongooseId,
			contentType: "text/image/audio"
			content: text/url
		}
	]
}

LIKE ANIMATION:

- Container: On componentDidMount, calls getlikes. Renders component passing likes list.
- Component: 
		- on constructor: websockets event triggering animation
		- on componentDidmount: trigger animation forEach like




DEPLOYMENT:

surge build https://pale-blue.surge.sh