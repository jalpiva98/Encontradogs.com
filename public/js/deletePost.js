//deletes a post on the webpage

const deletePost = async (postId) => {
    try {
      const response = await fetch(`/api/posts/${postId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
  
      if (response.ok) {
        // document.location.reload(); 
        document.location.replace("/dashboard");
      } else {
        throw new Error("Failed to delete post.");
      }
    } catch (error) {
      console.error(error);
      alert("Failed to delete post.");
    }
  };
  
  const deletePostHandler = (event) => {
    if (event.target.matches(".delete-post")) {
      const postId = event.target.getAttribute("data-post-id");
      deletePost(postId);
    }
  };
  
  document.addEventListener("click", deletePostHandler);
  