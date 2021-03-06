$( document ).ready(function() {


  $('#artist_search_form').submit(function (event) {
    // prevent page reload
    event.preventDefault();

    searchArtistRequest();
  });



  // Example api url: https://api.spotify.com/v1/search?type=artist&q=michael+jackson
  function searchArtistRequest () {
    // get input string from form
    var input = document.getElementById('artist_input').value
    // prepare the query string
    let query = input.split(' ').join('+')

    const req = new XMLHttpRequest()

    req.addEventListener("load", showArtists);
    req.open('GET', `https://api.spotify.com/v1/search?type=artist&q=${query}`);
    req.send();
  }



  // var a = document.createElement('a');
  // var linkText = document.createTextNode("my title text");
  // a.appendChild(linkText);
  // a.title = "my title text";
  // a.href = "http://example.com";
  // document.body.appendChild(a)



  function showArtists() {
    // var list_item_element = document.createElement("li")
      var artists_list = document.getElementById("artists_list")
      artists_list.innerHTML = ""
      temp_response = JSON.parse(this.responseText)
      temp_response['artists']['items'].forEach(function(item, index) {
      //  console.log(item['name'], item['id'])

      var a_element = document.createElement('a')
      var link_text = document.createTextNode(item['name'])
      a_element.appendChild(link_text)
      a_element.title = item['name']
      a_element.href = '#'
      a_element.setAttribute('id', item['id'])
      a_element.classList.add('artist_link')
      artists_list.appendChild(a_element)
      artists_list.appendChild(document.createElement('br'))

      // list_item_element.textContent = item['name']
      // artists_list.appendChild(list_item_element)
     })
  }


  $(document).on("click",".artist_link",function() {

      var id = this.getAttribute('id')
      $.ajax({
        url: `https://api.spotify.com/v1/artists/${id}/albums`,
        success: renderAlbums
      })



  });

  function renderAlbums(data) {
    //data['items'][0]['name']
    let $albumList = $('#albums_list')
    $albumList.html('')

    data['items'].forEach(function(album){
      //console.log(album['name'])
      $albumList.append(`<li class='album_name'>${album['name']}</li>`)


    })
  }















  //
  // function getRepositories() {
  //   const req = new XMLHttpRequest()
  //
  //   // now we're adding an eventlistener to the request
  //   // that fires when data is loaded and executes
  //   // the callback
  //   req.addEventListener("load", showRepositories);
  //   // what does true do?
  // //  req.open("GET", 'https://api.github.com/users/andigan/repos', true)
  //   req.open("GET", 'https://www.googleapis.com/books/v1/volumes?q=ruby+programming')
  //
  //   req.send()
  //
  //
  //   // other methods
  //
  //   // this will point to req
  //   req.onload = function () {
  //     let data = JSON.parse (this.response);
  //     console.log(data);
  //
  //   }
  //
  //
  // }
  //
  // // the callback:
  // // how does this work?
  // // does addEventListener have a consistent expectation
  // // for it's callback parameters?
  //
  // // function showRepositories(event, data) {
  // //   //this is set to the XMLHttpRequest object that fired the event
  // //   // this equals req object
  // //   // which has a responseText once it is loaded up somehow
  // //   console.log(this.responseText)
  // //   let repoList = "<ul>"
  // //   for(var i=0;i < this.responseText.length; i++) {
  // //     repoList += "<li>" + this.responseText[i]["name"] + "</li>"
  // //   }
  // //   repoList += "</ul>"
  // //   document.getElementById("repositories").innerHTML = repoList
  // // }
  //
  //
  // // function showRepositories(event, data) {
  // // //  parse the response data into json
  // //   var repos = JSON.parse(this.responseText)
  // //   console.log(repos)
  // //
  // //
  // //   const repoList = `<ul>${repos.map(r => '<li>' + r.name + '</li>').join('')}</ul>`
  // //   document.getElementById("repositories").innerHTML = repoList
  // // }
  //
  //
  // function showRepositories(event, data) {
  //   var repos = JSON.parse(this.responseText)
  //   console.log(repos)
  //   const repoList = `<ul>${repos.map(r => '<li>' + r.name + ' - <a href="#" data-repo="' + r.name + '" onclick="getCommits(this)">Get Commits</a></li>').join('')}</ul>`
  //   document.getElementById("repositories").innerHTML = repoList
  // }
  //
  // function getCommits(el) {
  //   const name = el.dataset.repo
  //   const req = new XMLHttpRequest()
  //   req.addEventListener("load", showCommits);
  //   req.open("GET", 'https://api.github.com/repos/andigan/' + name + '/commits')
  //   req.send()
  // }
  //
  // function showCommits() {
  //   const commits = JSON.parse(this.responseText)
  //   const commitsList = `<ul>${commits.map(commit => '<li><strong>' + commit.author.login + '</strong> - ' + commit.commit.message + '</li>').join('')}</ul>`
  //   document.getElementById("commits").innerHTML = commitsList
  // }

















});
