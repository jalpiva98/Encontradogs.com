//this is for new posts on the website

const newHearthstonePostFormHandler = async (event) => {
    event.preventDefault();
  
    const title = document.querySelector('#title-new-hearthstone-post').value.trim();
    const content = document.querySelector('#content-new-hearthstone-post').value.trim();
  
    if (title && content) {
      try {
        const response = await fetch('/api/posts', {
          method: 'POST',
          body: JSON.stringify({ title, content }),
          headers: { 'Content-Type': 'application/json' },
        });
  
        if (response.ok) {
          document.location.replace('/dashboard');
        } else {
          throw new Error('Failed to create a new post. Please try again.');
        }
      } catch (error) {
        console.error(error);
        alert(error.message);
      }
    } else {
      alert('Please fill in both the title and content before submitting.');
    }
  };
  
  const newHearthstonePostForm = document.querySelector('.new-hearthstone-post-form');
  if (newHearthstonePostForm) {
    newHearthstonePostForm.addEventListener('submit', newHearthstonePostFormHandler);
  }
  