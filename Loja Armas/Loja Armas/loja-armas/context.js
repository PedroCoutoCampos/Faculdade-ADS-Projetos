import React from 'react';

export const GlobalContext = React.createContext();
const Context = ({ children }) => {
  const [dados, setDados] = React.useState('');
  return (
    <GlobalContext.Provider value={{ dados, setDados }}>
      {children}
    </GlobalContext.Provider>
  );
};
export default Context;
