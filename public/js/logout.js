// this handles the logout
const hearthstoneLogout = async () => {
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
  
  const hearthstoneLogoutButton = document.querySelector('#hearthstone-logout');
  if (hearthstoneLogoutButton) {
    hearthstoneLogoutButton.addEventListener('click', hearthstoneLogout);
  }
  