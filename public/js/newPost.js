//this is for new posts on the website

const newHearthstonePostFormHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector('#title-new-hearthstone-post').value.trim();
  const content = document.querySelector('#content-new-hearthstone-post').value.trim();
  const category = document.querySelector('#category-new-hearthstone-post').value.trim();
  const size = document.querySelector('#size-new-hearthstone-post').value.trim();
  const color = document.querySelector('#color-new-hearthstone-post').value.trim();
  const breed = document.querySelector('#breed-new-hearthstone-post').value.trim();
  const location = document.querySelector('#location-new-hearthstone-post').value.trim();
  const time = document.querySelector('#time-new-hearthstone-post').value.trim();

  if (title && content && category && size && color && breed && location && time) {
    try {
      const response = await fetch('/api/posts', {
        method: 'POST',
        body: JSON.stringify({ 
          title, 
          content,
          category,
          size,
          color,
          breed,
          location,
          time
        }),
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
    alert('Please fill in all the fields before submitting.');
  }
};

const newHearthstonePostForm = document.querySelector('.new-hearthstone-post-form');
if (newHearthstonePostForm) {
  newHearthstonePostForm.addEventListener('submit', newHearthstonePostFormHandler);
}

  