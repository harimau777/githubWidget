function getProfile(location) {
  //Set the query to send to GitHub based on whether location is supplied:
  if (location) {
    const query = `https://api.github.com/search/users?q=repos:%3E0+location:${location}&per_page=1`;  //Queries GitHub for profiles at the user's location
  } else {
    const query = 'https://api.github.com/search/users?q=repos:%3E0&per_page=1';  //Queries GitHub for all profiles with at least 1 repo
  }

  //Randomly select a profile:
  //Send the query and extract the "total_count" field
  const userCount = min(/*Send the query and extract the total_count field*/, 1000);  //GitHub's API only returns the first 1000 results
  const randUserOffset = Math.floor(Math.random() * userCount) + 1;
  //Get the randomly selected username
  if (location) {
    const query = `https://api.github.com/search/users?q=repos:%3E0+location:${location}&page=${randUserOffset}&per_page=100`;  //Queries GitHub for profiles at the user's location
  } else {
    const query = `https://api.github.com/search/users?q=repos:%3E0&page=${randUserOffset}&per_page=1`;  //Queries GitHub for all profiles with at least 1 repo
  }
  //Send the query and extract the items[0].login field, this is the username
  //Get /users/:username, extract login, html_url, avatar_url, and name
}