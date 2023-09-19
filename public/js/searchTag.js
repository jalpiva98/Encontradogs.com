// Function to handle the search
function handleSearch() {
    event.preventDefault();
    // Get the user's input
    const searchInput = document.querySelector("#search-input").value.toLowerCase();
  
    // Make an HTTP request to your server's / route with the search query
    fetch(`/api/posts?search=${searchInput}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network error");
        }
        return response.json();
      })
      .then((matchingPosts) => {
        // Update the display to show only matching posts
        // You'll need to adjust this part based on your template engine
        // Here, we assume you have a function displayPosts that takes an array of posts
        displayPosts(matchingPosts);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
  
  // Add an event listener to the search button
  const searchButton = document.querySelector("#search-button");
  searchButton.addEventListener("click", handleSearch);