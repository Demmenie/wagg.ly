//28/05/24
//Wagg.ly/static/organise.js

// A function to fetch walkers data from the API endpoint
async function fetchWalkers() {
  try {
    const response = await fetch('/getWalkers'); // Send request to server
    const walkersData = await response.json();  // Parse JSON response

    return walkersData

  } catch (error) {
    console.error('Error fetching walkers:', error);
    // Handle errors appropriately (e.g., show an error message to the user)
  }
}

// Uses the walkers data to add elements into the walkers container
async function addWalkers() {
  const walkers = await fetchWalkers();

  for (let i = 0; i < walkers.length; i++) {
    let walker = walkers[i];

    // Fetching the container element
    const containerElement = document.getElementById('walkers-container');

    // Creating a new element for the profile
    const walkerElement = document.createElement('div');

    // Adding all the elements for each profile
    walkerElement.innerHTML = `
      <div id="profile-${i}" class="profile">
        <div class="name-card">
          <div class="card-content">
            <div class="column-1">
              <div class="profile-pic"></div>
            </div>
              <div class="column-2">
                <div class="profile-info">
                  <div class="person-name">${walker.name}</div>
                  <div class="bio">${walker.bio}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `; 

    // inseting the profile element into the container.
    containerElement.appendChild(walkerElement);
  }
}



// A function to fetch walkers data from the API endpoint
async function fetchOwners() {
  try {
    const response = await fetch('/getOwners'); // Send request to server
    const ownersData = await response.json();  // Parse JSON response

    return ownersData

  } catch (error) {
    console.error('Error fetching walkers:', error);
    // Handle errors appropriately (e.g., show an error message to the user)
  }
}

// Uses the owners data to add elements into the owners container
async function addOwners() {
  const owners = await fetchOwners();

  for (let i = 0; i < owners.length; i++) {
    let owner = owners[i];

    // Fetching the container element
    const containerElement = document.getElementById('owners-container');

    // Creating a new element for the profile
    const walkerElement = document.createElement('div');

    // Adding all the elements for each profile
    walkerElement.innerHTML = `
      <div id="profile-${i}" class="profile">
        <div class="name-card">
          <div class="card-content">
            <div class="column-1">
              <div class="profile-pic"></div>
            </div>
              <div class="column-2">
                <div class="profile-info">
                  <div class="person-name">${owner.name}</div>
                  <div class="bio">${owner.bio}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    // inseting the profile element into the container.
    containerElement.appendChild(walkerElement);
  }
}

addWalkers();
addOwners();