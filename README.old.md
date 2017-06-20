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

LAST ACTIVE:

- When I log in, I should see the likes I got SINCE I LOGGED OUT
- When I open the browser being already logged in, I should see the likes since the last time I had the browser open.

DEMO FUNCTIONALITY:

What to showcase?
- Content popping up
- Likes going around

Requirements:
- Demo starts when user hits Start
		That will emit a websockets event.
- After 5 minutes, all the demo content gets erased from the database, 
	and also disappears from the globe
		This requires 2 separate things:
			- Eliminating all entities with demoId from the database
			- Cleaning up the globe without refreshing the page
- Only the user who clicked on demo gets to see it.
		For this, I can add a demoId to all models, which defaults to null.
		All routes will check content for either (!demoId || demoId === userId)

		My script simply sends websockets events to the user who started the demo. That solves the problem of making the demo only for the user that started it.
		I still need to actually save stuff to the database if I want the user to be able to interact with it.

		1.  Update content and like routes so that they only return results 
				where either (!demoId || demoId === req.user._Id)
		2.  Create demo button
			- On click, we register user with a random name, using the standard route
			- On successful registration, we pop an input field to type some text
			- On text submission, we create content with the normal route
			- On successful content creation, we emit a "start demo" event with { userId, contentId }




DEPLOYMENT:

surge build https://pale-blue.surge.sh