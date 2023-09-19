// Function to handle the search
function handleSearch() {
    event.preventDefault();
    // Get the user's input
    const searchInput = document.querySelector("#search-input").value.toLowerCase();

    console.log(searchInput)
  
    // Filter the posts
    const matchingPosts = posts.filter(post => {
      const title = post.title.toLowerCase();
      const content = post.content.toLowerCase();
  
      return title.includes(searchInput) || content.includes(searchInput);
    });
  
    // Update the display to show only matching posts
    // You'll need to adjust this part based on your template engine
    // Here, we assume you have a function displayPosts that takes an array of posts
    displayPosts(matchingPosts);
  }
  
  // Add an event listener to the search button
  const searchButton = document.querySelector("#search-button");
  searchButton.addEventListener("click", handleSearch);