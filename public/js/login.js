// this is a function to handle Hearthstone blog login

const hearthstoneLoginHandler = async (event) => {
    event.preventDefault();
  
    const usernameInput = document.querySelector('#username-hearthstone-login');
    const passwordInput = document.querySelector('#password-hearthstone-login');
    
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
  
  const hearthstoneLoginForm = document.querySelector('.hearthstone-login-form');
  if (hearthstoneLoginForm) {
    hearthstoneLoginForm.addEventListener('submit', hearthstoneLoginHandler);
  }
  