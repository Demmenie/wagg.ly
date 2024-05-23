//08/07/2023
//Aethra/web/static/organise.js
//Chico Demmenie

function organise(){
  console.log("Hello");

  function getWalkers() {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", '/getWalkers', false ); // false for synchronous request
    xmlHttp.send( null );
    return xmlHttp.responseText;
  }

  let walkers = getWalkers();
  console.log(walkers);

  const container = document.getElementById(
    tagName).getElementsByClassName("profile-container")[0]
  console.log(postID);
  
  for (let i = 0; i<walkers.length; i++) {
    let walker = walkers[i];
    console.log(walker)
    
    let profile = document.createElement("div").setAttribute("class", "profile");

  }
}
