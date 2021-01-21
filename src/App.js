import React, { useEffect, useState } from 'react';
import { AuthContext } from './contexts/Auth';
import Routes from './components/Routes';
import { getItemFromLS, setItemInLS } from './utils/helpers/localStorage';
import { BrowserRouter as Router } from 'react-router-dom';

function App() {

  const existingTokens = getItemFromLS('token');
  const [authTokens, setAuthTokens] = useState(existingTokens);

  const setTokens = (data) => {
    setItemInLS("token", data);
    setAuthTokens(data);
  };

  return (
    <AuthContext.Provider value={{ authTokens, setAuthTokens: setTokens }}>
      <Router>
        <Routes />
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
