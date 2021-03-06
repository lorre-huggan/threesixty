import React from 'react';
import { breakpoints, styledTheme } from '../../../styles/Mixins';
import { imgPath } from '../../../utils/request';
import { H1, Wrapper, Image, P, H5 } from '../../../styles/GlobalComponents';
import {
  Poster,
  StyledWrapper,
  InnerWrapper,
  BottomGradient,
  StyledBigBody,
} from '../HomeBanner/Banner.Styles';
import movieTrailer from 'movie-trailer';
import { ImHeart } from 'react-icons/im';

function Banner({
  opacity,
  hOpacity,
  movie,
  loading,
  error,
  trailerURL,
  setTrailerURL,
  setTrailerError,
  watchClick,
  like,
  handleLike,
}) {
  const { xl, lg } = breakpoints;

  //get youtube video id by passing movie title into movieTrailer func

  const handleClick = () => {
    watchClick();
    setTrailerError(false);
    if (trailerURL) {
      setTrailerURL('');
    } else {
      movieTrailer(
        movie.title || movie.original_name || movie.original_title || '',
        { id: true }
      )
        .then((url) => {
          setTrailerURL(url);
        })
        .catch(() => setTrailerError(true));
    }
  };

  const handleTitle = (num) => {
    if (movie.title?.length > num) {
      return (
        `${movie.title?.substring(0, num)}...` ||
        `${movie.original_title?.substring(0, num)}...`
      );
    } else {
      return `${movie.title}` || `${movie.original_title}`;
    }
  };

  // Animations

  const wrapperVar = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
      },
    },
    hidden: { opacity: 0, y: 10 },
  };

  const textVar = {
    visible: { opacity: 1, y: 0, transition: { duration: 1, delay: 0.2 } },
    hidden: { opacity: 0, y: 10 },
  };

  const posterVar = {
    visible: { opacity: 1, y: 0, transition: { duration: 1, delay: 0.8 } },
    hidden: { opacity: 0, y: 10 },
  };

  return (
    <Wrapper
      variants={wrapperVar}
      initial="hidden"
      animate="visible"
      width={xl}
      height="38"
      radius="2"
      lgWidth={lg}
      lgHeight="34"
      mdWidth="980"
    >
      {error && <H1>Oops </H1>}
      {loading && <H1>Loading...</H1>}
      {movie && (
        <Poster
          opacity={opacity}
          hOpacity={hOpacity}
          src={imgPath + movie?.backdrop_path}
        >
          <BottomGradient top />
          {error ? (
            <H5>We are working on this error</H5>
          ) : (
            <H1
              variants={textVar}
              initial="hidden"
              animate="visible"
              lgFontSize={styledTheme.header}
            >
              {handleTitle(30)}
            </H1>
          )}
          <StyledWrapper
            justify="left"
            align="left"
            direction="row"
            pos="absolute"
            bottom="0"
            left="0"
          >
            <InnerWrapper direction="column" padding="0" margin="2">
              <H5
                variants={textVar}
                initial="hidden"
                animate="visible"
                bottom="1"
              >
                {!error && 'Rated'} {!error && movie.vote_average * 10}
                {!error && '%'}
              </H5>
              {error ? (
                ''
              ) : (
                <P
                  variants={textVar}
                  initial="hidden"
                  animate="visible"
                  bottom="1"
                >{`${movie.overview?.substring(0, 480)}`}</P>
              )}
              {!error && (
                <Wrapper direction="row" align="center">
                  <ImHeart
                    style={{
                      marginRight: '1rem',
                      fontSize: '2.5rem',
                      cursor: 'pointer',
                      color: like ? styledTheme.error : '',
                    }}
                    onClick={handleLike}
                  />

                  <StyledBigBody
                    lgWidth="30"
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                    onClick={handleClick}
                  >
                    {trailerURL ? 'Stop' : 'Watch Trailer'}
                  </StyledBigBody>
                </Wrapper>
              )}
            </InnerWrapper>
          </StyledWrapper>
          {!error && (
            <Image
              variants={posterVar}
              initial="hidden"
              animate="visible"
              pos="absolute"
              bottom="2"
              right="2"
              src={imgPath + movie.poster_path}
              width="10"
              shadow
            />
          )}
          <BottomGradient bottom gradient />
        </Poster>
      )}
    </Wrapper>
  );
}

export default Banner;
