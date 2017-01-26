/*  Note: Since the GitHub API does not have built in support for getting a random user our strategy is to:
    1.  Search GitHub for profiles with at least one repo and who are at the user's location (if the user's location is
        available).
    2.  Randomly select a number between 1 and the number of user's found.
    3.  Perform a second search and lookup the username corresponding to the random number.
    4.  Lookup the user profile corresponding to the username

    We can access the first 1000 results; however, at most 100 results will be returned on a page.
    Therefore, the second search (step 3) is necessary since we do not know what page to ask for until we
    have randomly selected one of the results.
    A separate profile lookup (step 4) is neccessary since the search results do not include the profile's
    real name.
    A limitation of this approach is that we can only access the first 1000 profiles returned by a search
    even if there are more than 1000 profiles at a given location.
*/

function getProfile(location, success, error) {
  //Set the query to send to GitHub based on whether location is supplied:
  let query;
  if (location) {
    query = `q=repos:%3E0+location:${JSON.stringify(location)}&per_page=1`;  //Queries GitHub for profiles at the user's location
  } else {
    query = 'q=repos:%3E0&per_page=1';  //Queries GitHub for all profiles with at least 1 repo
  }

  //Search GitHub and find the number of users returned by the search:
  searchGithub(query)
  .then((data) => {
    //Randomly select one of the users:
    searchGithub(query + `&page=${randomUserOffset(data.total_count)}`)
    .then((data) => {
      //Lookup the random user's profile:
      getUser(data.items[0].login)
      .then((data) => {
        success({
          name: data.name,
          login: data.login,
          profile: data.html_url,
          avatar: data.avatar_url
        });
      })
      .catch(() => error());
    })
    .catch(() => error());
  })
  .catch(() => error());
}

function searchGithub(query) {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: `https://api.github.com/search/users?${query}`,
      dataType: 'json',
      error: () => reject(),
      success: (data) => resolve(data)
    });
  });
}

function getUser(loginName) {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: `https://api.github.com/users/${loginName}`,
      dataType: 'json',
      error: () => reject(),
      success: (data) => resolve(data)
    });
  });
}

function randomUserOffset(userCount) {
  //Note: We take the minimum of userCount or 1000 since GitHub's API only returns the first 1000 results
  return Math.floor(Math.random() * Math.min(userCount, 1000)) + 1;
}

export {getProfile};
