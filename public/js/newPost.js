//this is for new posts on the website

const newPetPostFormHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector('#title-new-pet-post').value.trim();
  const content = document.querySelector('#content-new-pet-post').value.trim();
  const category = document.querySelector('#category-new-pet-post').value.trim();
  const size = document.querySelector('#size-new-pet-post').value.trim();
  const color = document.querySelector('#color-new-pet-post').value.trim();
  const breed = document.querySelector('#breed-new-pet-post').value.trim();
  const location = document.querySelector('#location-new-pet-post').value.trim();
  const time = document.querySelector('#time-new-pet-post').value.trim();

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

const newPetPostForm = document.querySelector('.new-pet-post-form');
if (newPetPostForm) {
  newPetPostForm.addEventListener('submit', newPetPostFormHandler);
}

  