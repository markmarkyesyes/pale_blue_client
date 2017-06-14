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

WEBSOCKETS:

On new content:

- When content creator receives response from the database that content was created successfully, emit "created content" event.
	(THIS HAPPENS INSIDE THE SUBMIT CONTENT ACTION)
- On server, on "created content" event, emit "new content" event to everyone except the creator
- On client, on "new content" event, dispatch submitDotSuccess.
	(THIS HAPPENS ON THE MAIN WEBSOCKETS FILE)