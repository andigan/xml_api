
// creates a new XMLHTTPRequest
// open to get it started
// send to send it

// function getRepositories() {
//   const req = new XMLHttpRequest()
//   req.open("GET", 'https://api.github.com/users/andigan/repos')
//   req.send()
// }


function getRepositories() {
  const req = new XMLHttpRequest()

  // now we're adding an eventlistener to the request
  // that fires when data is loaded and executes
  // the callback
  req.addEventListener("load", showRepositories);
  // what does true do?
//  req.open("GET", 'https://api.github.com/users/andigan/repos', true)
  req.open("GET", 'https://www.googleapis.com/books/v1/volumes?q=ruby+programming')

  req.send()


  // other methods

  // this will point to req
  req.onload = function () {
    let data = JSON.parse (this.response);
    console.log(data);

  }


}

// the callback:
// how does this work?
// does addEventListener have a consistent expectation
// for it's callback parameters?

// function showRepositories(event, data) {
//   //this is set to the XMLHttpRequest object that fired the event
//   // this equals req object
//   // which has a responseText once it is loaded up somehow
//   console.log(this.responseText)
//   let repoList = "<ul>"
//   for(var i=0;i < this.responseText.length; i++) {
//     repoList += "<li>" + this.responseText[i]["name"] + "</li>"
//   }
//   repoList += "</ul>"
//   document.getElementById("repositories").innerHTML = repoList
// }


// function showRepositories(event, data) {
// //  parse the response data into json
//   var repos = JSON.parse(this.responseText)
//   console.log(repos)
//
//
//   const repoList = `<ul>${repos.map(r => '<li>' + r.name + '</li>').join('')}</ul>`
//   document.getElementById("repositories").innerHTML = repoList
// }


function showRepositories(event, data) {
  var repos = JSON.parse(this.responseText)
  console.log(repos)
  const repoList = `<ul>${repos.map(r => '<li>' + r.name + ' - <a href="#" data-repo="' + r.name + '" onclick="getCommits(this)">Get Commits</a></li>').join('')}</ul>`
  document.getElementById("repositories").innerHTML = repoList
}

function getCommits(el) {
  const name = el.dataset.repo
  const req = new XMLHttpRequest()
  req.addEventListener("load", showCommits);
  req.open("GET", 'https://api.github.com/repos/andigan/' + name + '/commits')
  req.send()
}

function showCommits() {
  const commits = JSON.parse(this.responseText)
  const commitsList = `<ul>${commits.map(commit => '<li><strong>' + commit.author.login + '</strong> - ' + commit.commit.message + '</li>').join('')}</ul>`
  document.getElementById("commits").innerHTML = commitsList
}
