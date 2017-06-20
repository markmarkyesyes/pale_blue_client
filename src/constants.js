const constants = {
  baseUrl: process.env.NODE_ENV === "production"
    ? "https://paleblue-server.herokuapp.com"
    : "http://localhost:3000",
  gMapsGeolocationAPIKey: "AIzaSyCqa_bnnQYos7hWkGMIkBADas6rpwZIpQg",
  gMapsTimezoneAPIKey: "AIzaSyBhKNM9ECm0U37KopFZdQWVQpIX31hKIkU",
  gMapsAPIKey: "AIzaSyCTOWnuM7u2vpGWG6wDhRI2kE7zhRHGFxs"
};

export default constants;
