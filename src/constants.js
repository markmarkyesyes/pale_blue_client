const constants = {
	baseUrl: process.env.NODE_ENV === "production" ? "https://paleblue-server.herokuapp.com" : 'http://localhost:3000'
}

export default constants;