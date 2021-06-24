import './App.css';
import React, {  useReducer } from 'react';
import { globalReducer, initialState } from './store/reducers/globalReducers';
import { GlobalContext } from './store/context/GlobalContext';
import Main from './views/Main';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { white } from './constants/Colors';

function App() {
  const [state, dispatch] = useReducer(globalReducer, initialState);
  React.useEffect(() => {
    const user = localStorage.getItem('sign_in');
    const parsedUser = JSON.parse(user);
    if(parsedUser) {
      dispatch({type: 'SIGN_IN', token: parsedUser.token, user: parsedUser.user});
    }
  },[]);
  const theme = createMuiTheme({
    palette: {
      type: 'light',
      background: {
        paper: white
      }
    },
  });
  return (
    <ThemeProvider theme={theme}>
    <GlobalContext.Provider value={{state: state, dispatch: dispatch}}>
      <Main />
    </GlobalContext.Provider>
    </ThemeProvider>
  );
}

export default App;
