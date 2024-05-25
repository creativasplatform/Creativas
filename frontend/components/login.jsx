import React from 'react';
import useUser from '../hooks/useUser.jsx';

const UserComponent = () => {
  const { isLoggedIn, address, login, logout } = useUser();

  return (
    <div>
      <p>Logged in: {isLoggedIn ? 'Yes' : 'No'}</p>
      {isLoggedIn && <p>Address: {address}</p>}
      <button onClick={isLoggedIn ? logout : login}>{isLoggedIn ? 'Logout' : 'Login'}</button>
    </div>
  );
};

export default UserComponent;
