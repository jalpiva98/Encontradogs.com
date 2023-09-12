//edits a post on the webpage

const postId = window.location.pathname.split('/').pop();

// this a function to handle updates and deletions
const handlePostAction = async (actionType) => {
  try {
    const url = `/api/posts/${postId}`;
    const method = actionType === 'update' ? 'PUT' : 'DELETE';

    if (actionType === 'update') {
      console.log('ppppppp');
      const title = document.querySelector('#title-update-hearthstone-post').value.trim();
      const content = document.querySelector('#content-update-hearthstone-post').value.trim();

      if (!title || !content) {
        return; // don't perform the action if title or content is missing
      }

      const response = await fetch(url, {
        method,
        body: JSON.stringify({ title, content }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        throw new Error('Failed to update a Hearthstone post.');
      }
    } else if (actionType === 'delete') {
      const response = await fetch(url, { method });

      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        throw new Error('Failed to delete a Hearthstone post.');
      }
    }
  } catch (error) {
    console.error(error);
    alert(error.message); 
  }
};

// event listener for both update and delete buttons
// you have to make sure the button you need has this class 
//made mistake of not adding it haha
const actionButtons = document.querySelectorAll('.action-hearthstone-post');

actionButtons.forEach((button) => {
  button.addEventListener('click', (event) => {
    const actionType = event.target.getAttribute('data-action');
    handlePostAction(actionType);
  });
});
