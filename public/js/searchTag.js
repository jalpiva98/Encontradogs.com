function handleSearch() {
  event.preventDefault();
  // Get the user's input
  const searchInput = document.querySelector("#search-input").value.toLowerCase();
 const options = {method:'GET'}
  // Make an HTTP request to your server's / route with the search query
  fetch(`/api/posts/searchs?search=${searchInput}`, options)
    .then((response) => {
      console.log("Search Input:", searchInput);
      if (!response.ok) {
        throw new Error("Network error");
      }
      return response.json();
    })
    .then((matchingPosts) => {
      // Update the display to show only matching posts
      console.log("Response received:", matchingPosts);
      displayPosts(matchingPosts);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
// Add an event listener to the search button
const searchButton = document.querySelector("#search-button");
searchButton.addEventListener("click", handleSearch);