self.onmessage = function(e) {
  return getTarantinoMovies()
    .then(data => postMessage(data))
    .catch(err => {
      debugger
      return 'You are offline'
    })
}

function getFoursquare() {
  const CLIENT_ID = '<KEY>'
  const CLIENT_SECRET = '<KEY>'
  return fetch('https://api.foursquare.com/v2/venues/search?client_id=' + CLIENT_ID + '&client_secret=' + CLIENT_SECRET + '&v=20130815&ll=40.7,-74&query=sushi')
    .then(response => response.json())
    .then(data => {
      console.log(data)
      return data.response.venues.reduce((prev, next) => {
        return prev + '<p>' + next.name + '</p>'
      }, '')
    })
}

function getTarantinoMovies() {
  return fetch('http://netflixroulette.net/api/api.php?director=Quentin%20Tarantino')
    .then(response => response.json())
    .then(data => {
      return data.reduce((prev, next) => prev + '<p>' + next.show_title + '</p>', '')
    })
}
