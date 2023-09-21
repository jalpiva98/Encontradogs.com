// this is a function to handle pet blog login

const petLoginHandler = async (event) => {
    event.preventDefault();
  
    const usernameInput = document.querySelector('#username-pet-login');
    const passwordInput = document.querySelector('#password-pet-login');
    
    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();
  
    if (username && password) {
      try {
        const response = await fetch('/api/users/login', {
          method: 'POST',
          body: JSON.stringify({ username, password }),
          headers: { 'Content-Type': 'application/json' },
        });
  
        if (response.ok) {
          document.location.replace('/');
        } else {
          throw new Error('Failed to log in. Please check your credentials.');
        }
      } catch (error) {
        console.error(error);
        alert(error.message); 
      }
    } else {
      alert('Please provide both username and password.');
    }
  };
  
  const petLoginForm = document.querySelector('.pet-login-form');
  if (petLoginForm) {
    petLoginForm.addEventListener('submit', petLoginHandler);
  }
  