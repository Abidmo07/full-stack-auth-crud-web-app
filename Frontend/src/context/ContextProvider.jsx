import { createContext, useContext, useState } from "react";

const StateContext = createContext({
  user: null,
  token: null,
  setUser: () => {},
  setToken: () => {},
});
// eslint-disable-next-line react/prop-types
export const ContextProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [token, _setToken] = useState(localStorage.getItem("Access_Token"));
  const setToken = (token) => {
    _setToken(token);
    if (token) {
      localStorage.setItem("Access_Token", token);
    } else {
      localStorage.removeItem("Access_Token");
    }
  };
  return (
    <StateContext.Provider
      value={{
        user,
        token,
        setUser,
        setToken,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};
// eslint-disable-next-line react-refresh/only-export-components
export const useStateContext = () => useContext(StateContext);
