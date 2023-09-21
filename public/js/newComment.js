//this is for new comments on the page
const newPetCommentFormHandler = async (event) => {
    event.preventDefault();
 
    const post_id = parseInt(window.location.pathname.split('/').pop());

    const content = document.querySelector('#content-new-pet-comment').value.trim();
  
    if (content) {
      try {
        const response = await fetch(`/api/comments`, {
          method: 'POST',
          body: JSON.stringify({ comment_text: content, post_id }),
          headers: { 'Content-Type': 'application/json' },
        });
  
        if (response.ok) {
          document.location.reload();
        } else {
          throw new Error('Failed to create a comment. Please try again.');
        }
      } catch (error) {
        console.error(error);
        alert(error.message); 
      }
    } else {
      alert('Please enter your comment before submitting.');
    }
  };
  
  const newPetCommentForm = document.querySelector('.new-pet-comment-form');
  if (newPetCommentForm) {
    newPetCommentForm.addEventListener('submit', newPetCommentFormHandler);
  }
  