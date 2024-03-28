import { createContext, useContext, useReducer } from 'react';
import Message from '../components/Message';

const AuthContext = createContext();

const initialState = {
  user: null,
  isAuthenticated: false,
  wrongCredentials: null,
};

function reducer(state, action) {
  switch (action.type) {
    case 'login':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        wrongCredentials: false,
      };
    case 'logout':
      return { ...state, user: null, isAuthenticated: false };
    case 'loginError':
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        wrongCredentials: true,
      };
    default:
      throw new Error('Unknown action');
  }
}

const FAKE_USER = {
  name: 'Jack',
  email: 'jack@example.com',
  password: 'qwerty12345',
  avatar: 'https://i.pravatar.cc/100?u=zz',
};

function AuthProvider({ children }) {
  const [{ user, isAuthenticated, wrongCredentials }, dispatch] = useReducer(
    reducer,
    initialState
  );

  function login(email, password) {
    if (email === FAKE_USER.email && password === FAKE_USER.password)
      dispatch({ type: 'login', payload: FAKE_USER });
  }

  function logout() {
    dispatch({ type: 'logout' });
  }

  function loginError() {
    console.log('object');
    dispatch({ type: 'loginError' });
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        logout,
        loginError,
        FAKE_USER,
        wrongCredentials,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw new Error('AuthContext was used outside AuthProvider');
  return context;
}

export { AuthProvider, useAuth, FAKE_USER };
