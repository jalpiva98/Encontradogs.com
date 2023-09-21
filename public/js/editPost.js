// Edits a post on the webpage
const postId = window.location.pathname.split('/').pop();

// This is a function to handle updates and deletions
const handlePostAction = async (actionType) => {
  try {
    const url = `/api/posts/${postId}`;
    const method = actionType === 'update' ? 'PUT' : 'DELETE';

    if (actionType === 'update') {
      const title = document.querySelector('#title-update-pet-post').value.trim();
      const content = document.querySelector('#content-update-pet-post').value.trim();
      const category = document.querySelector('#category-update-pet-post').value.trim();
      const size = document.querySelector('#size-update-pet-post').value.trim();
      const color = document.querySelector('#color-update-pet-post').value.trim();
      const breed = document.querySelector('#breed-update-pet-post').value.trim();
      const location = document.querySelector('#location-update-pet-post').value.trim();
      const time = document.querySelector('#time-update-pet-post').value.trim();

      if (!title || !content) {
        return; // don't perform the action if title or content is missing
      }

      const bodyData = {
        title,
        content,
        category,
        size,
        color,
        breed,
        location,
        time
      };

      const response = await fetch(url, {
        method,
        body: JSON.stringify(bodyData),
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        throw new Error('Failed to update the post.');
      }
    } else if (actionType === 'delete') {
      const response = await fetch(url, { method });

      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        throw new Error('Failed to delete the post.');
      }
    }
  } catch (error) {
    console.error(error);
    alert(error.message);
  }
};

// Event listener for both update and delete buttons
const actionButtons = document.querySelectorAll('.action-pet-post');

actionButtons.forEach((button) => {
  button.addEventListener('click', (event) => {
    const actionType = event.target.getAttribute('data-action');
    handlePostAction(actionType);
  });
});
