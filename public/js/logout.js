// this handles the logout
const petLogout = async () => {
    try {
      const response = await fetch('/api/users/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/'); 
      } else {
        throw new Error('Failed to log out. Please try again.');
      }
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };
  
  const petLogoutButton = document.querySelector('#pet-logout');
  if (petLogoutButton) {
    petLogoutButton.addEventListener('click', petLogout);
  }
  