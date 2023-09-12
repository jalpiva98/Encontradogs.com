// sign uppp
const hearthstoneSignupFormHandler = async (event) => {
    event.preventDefault();
  
    const username = document.querySelector('#username').value.trim();
    const email = document.querySelector('#email').value.trim();
    const password = document.querySelector('#password').value.trim();
  
    if (username && email && password) {
      try {
        console.log("About to send POST request to /api/users/")
        const response = await fetch('/api/users/signup', {
          method: 'POST',
          body: JSON.stringify({ username, email, password }),
          headers: { 'Content-Type': 'application/json' },
        });
  
        if (response.ok) {
          document.location.replace('/dashboard');
        } else {
          throw new Error('Failed to sign up. Please try again.');
        }
      } catch (error) {
        console.error(error);
        alert(error.message);
      }
    } else {
      alert('Please fill in all fields before submitting.');
    }
  };
  
  const hearthstoneSignupForm = document.querySelector('#signup-form');
  if (hearthstoneSignupForm) {
    hearthstoneSignupForm.addEventListener('submit', hearthstoneSignupFormHandler);
  }
  