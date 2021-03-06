import React, { useContext, useEffect, useState } from 'react';
import { Wrapper, H5, BigBody, P } from '../../styles/GlobalComponents';
import { breakpoints, styledTheme } from '../../styles/Mixins';
import { Link, useLocation } from 'react-router-dom';
import { Box } from '@mui/system';
import SearchForm from '../Search/SearchForm';
import { MenuContext } from '../../contexts/MenuContext';
import { useAuth } from '../../contexts/AuthContext';
import { FaUserCircle } from 'react-icons/fa';
import { VscThreeBars } from 'react-icons/vsc';
import useUser from '../../hooks/useUser';

function Nav() {
  const { xl, lg } = breakpoints;
  const { openMenu, setOpenMenu } = useContext(MenuContext);
  const { currentUser } = useAuth();
  const { userData } = useUser();
  const location = useLocation();
  const [hide, setHide] = useState(false);
  const [onAccount, setOnAccount] = useState(false);

  useEffect(() => {
    if (location.pathname === '/signup') {
      setHide(true);
    } else if (location.pathname === '/login') {
      setHide(true);
    } else {
      setHide(false);
    }
  }, [location]);

  useEffect(() => {
    if (location.pathname === '/profile') {
      setOnAccount(true);
    } else {
      setOnAccount(false);
    }
  }, [location]);

  const handleMenu = () => {
    if (openMenu) {
      setOpenMenu(false);
    } else {
      setOpenMenu(true);
    }
  };

  const handleClick = () => {
    if (openMenu) {
      setOpenMenu(false);
    }
  };

  return (
    <Wrapper
      width={xl}
      justify="space-between"
      align="center"
      height="8"
      direction="row"
      lgWidth={lg}
      mdWidth="980"
      pos="relative"
      idx="999"
      mbottom={currentUser ? '1.5' : ''}
      hide={hide ? 'hide' : ''}
    >
      <Wrapper margin="0">
        <Link onClick={handleClick} to="/">
          <H5 color={styledTheme.warning} lgFontSize={styledTheme.bodyBig}>
            ThreeSixtyTrailers
          </H5>
        </Link>
      </Wrapper>
      <Box
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: '490px',
        }}
      >
        <Link onClick={handleClick} to="/">
          <BigBody
            uppercase
            weight="700"
            cursor
            hover
            space="5"
            mdFontSize={styledTheme.body}
          >
            Home
          </BigBody>
        </Link>
        <Link onClick={handleClick} to="/trending">
          <BigBody
            uppercase
            weight="700"
            cursor
            hover
            space="5"
            mdFontSize={styledTheme.body}
          >
            Trending
          </BigBody>
        </Link>
        <Link onClick={handleClick} to={'/genre/16'}>
          <BigBody
            uppercase
            weight="700"
            cursor
            hover
            space="1"
            mdFontSize={styledTheme.body}
          >
            Anime
          </BigBody>
        </Link>
        <BigBody
          onClick={handleMenu}
          uppercase
          weight="700"
          cursor
          hover
          space="5"
          color={openMenu ? styledTheme.error : ''}
          mdFontSize={styledTheme.body}
        >
          {openMenu ? 'Close' : 'Menu'}
        </BigBody>

        <P
          style={{
            position: 'absolute',
            bottom: '0',
            left: '0',
            fontSize: '1rem',
          }}
          space="1"
          mdFontSize={styledTheme.body}
          weight="700"
          color={styledTheme.success}
        >
          {currentUser && (
            <Wrapper direction="row" align="center">
              <FaUserCircle
                style={{
                  marginRight: '0.5rem',
                  color: styledTheme.success,
                  fontSize: '1.5rem',
                }}
              />
              <Wrapper align="center">{userData.name}</Wrapper>
            </Wrapper>
          )}
        </P>
        <P
          style={{
            position: 'absolute',
            bottom: '0',
            right: '0',
            fontSize: '1rem',
          }}
          uppercase
          space="1"
          mdFontSize={styledTheme.body}
          weight="700"
          color={styledTheme.success}
        >
          {currentUser && (
            <Link to={onAccount ? '/' : '/profile'}>
              <Wrapper direction="row" align="center">
                <VscThreeBars
                  style={{
                    marginRight: '0.25rem',
                    color: styledTheme.success,
                    fontSize: '1.5rem',
                  }}
                />
                <Wrapper align="center">
                  {onAccount ? 'Close' : 'My Account'}
                </Wrapper>
              </Wrapper>
            </Link>
          )}
        </P>
      </Box>
      <Box>
        <SearchForm />
      </Box>
    </Wrapper>
  );
}

export default Nav;
