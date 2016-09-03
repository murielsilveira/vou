self.onmessage = function(e) {
  return fetch('http://netflixroulette.net/api/api.php?director=Quentin%20Tarantino')
    .then(response => response.json())
    .then((data) => {
      postMessage(data)
    })
}
