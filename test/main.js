// Create a request variable and assign a new XMLHttpRequest object to it.
var request = new XMLHttpRequest()

// Open a new connection, using the GET request on the URL endpoint
request.open('GET', 'http://localhost:3000/medicals', true)

request.onload = function() {
  // Begin accessing JSON data here

// Begin accessing JSON data here
var data = JSON.parse(this.response)

data.forEach(i => {
  // Log each movie's title
  console.log(i.value);
  console.log(i.sensor);
})


}

// Send request
request.send()