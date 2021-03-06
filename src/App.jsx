import Main from './pages/Main';
import { useEffect, useState } from 'react';
import Nav from './components/Nav/Nav';
import { ThemeProvider } from 'styled-components';
import { styledTheme } from './styles/Mixins';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Film from './pages/Film';
import Genre from './pages/Genre';
import Trending from './pages/Trending';
import Search from './pages/Search';
import { SearchContext } from './contexts/SearchContext';
import Menu from './components/Menu/Menu';
import { MenuContext } from './contexts/MenuContext';
import { QueryContext } from './contexts/QueryContext';
import SmallScreen from './components/SmallScreen';
import SignUp from './pages/SignUp';
import appReducer, { initialState } from './reducers/appReducer';
import { AppProvider } from '../src/contexts/AppProvider';
import AuthContextProvider from './contexts/AuthContext';
import SignIn from './pages/SignIn';

import Profile from './pages/Profile';

function App() {
  const [searchData, setSearchData] = useState();
  const [openMenu, setOpenMenu] = useState(false);
  const [menuLoading, setMenuLoading] = useState(false);
  const [queryData, setQueryData] = useState({});
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [width, setWidth] = useState('');

  useEffect(() => {
    if (window.innerWidth <= 1020) {
      setIsSmallScreen(true);
    } else {
      setIsSmallScreen(false);
    }
  }, [width]);

  const updateDimensions = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener('resize', updateDimensions);
  });

  return (
    <Router>
      <ThemeProvider theme={styledTheme}>
        <AuthContextProvider>
          <SearchContext.Provider value={{ searchData, setSearchData }}>
            <MenuContext.Provider
              value={{ openMenu, setOpenMenu, menuLoading, setMenuLoading }}
            >
              <QueryContext.Provider value={{ queryData, setQueryData }}>
                {isSmallScreen ? (
                  <SmallScreen />
                ) : (
                  <AppProvider initialState={initialState} reducer={appReducer}>
                    <Nav />
                    <Menu />
                    <Switch>
                      <Route path="/" exact>
                        <Main />
                      </Route>
                      <Route path="/film/:id">
                        <Film />
                      </Route>
                      <Route path="/genre/:id">
                        <Genre />
                      </Route>
                      <Route path="/trending">
                        <Trending />
                      </Route>
                      <Route path="/search">
                        <Search />
                      </Route>
                      <Route path="/signup">
                        <SignUp />
                      </Route>
                      <Route path="/login">
                        <SignIn />
                      </Route>
                      <Route path="/profile">
                        <Profile />
                      </Route>
                    </Switch>
                  </AppProvider>
                )}
              </QueryContext.Provider>
            </MenuContext.Provider>
          </SearchContext.Provider>
        </AuthContextProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;
