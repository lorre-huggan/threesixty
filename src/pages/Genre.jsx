import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { baseURL, FETCH_CATEGORIES, request } from '../utils/request';
import useFetch from '../hooks/useFetch';
import Card from '../components/Card/Card';
import { breakpoints, styledTheme } from '../styles/Mixins';
import { H1, Wrapper } from '../styles/GlobalComponents';
import styled from 'styled-components';
import Pagination from '@mui/material/Pagination';

export const Grid = styled.div`
  width: ${breakpoints.xl};
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto;
  grid-gap: 0.5rem;
`;

function Genre() {
  const { xl, md } = breakpoints;
  const { id } = useParams();
  const [numOfPages, setNumOfPages] = useState(10);
  const [page, setPage] = useState(1);
  const { data, loading, error, results } = useFetch(
    baseURL + FETCH_CATEGORIES(id, page)
  );
  const [genre, setGenre] = useState({});

  useEffect(() => {
    setNumOfPages(results?.total_pages);
    console.log(numOfPages);
  }, [results, numOfPages]);

  useEffect(() => {
    fetch(baseURL + request.fetchGenre)
      .then((res) => {
        if (!res.ok) {
          throw Error('Could not fetch resource');
        }
        return res.json();
      })
      .then((data) => {
        setGenre(
          data.genres?.filter((cat) => {
            return cat.id == id;
          })
        );
      })

      .catch((err) => {
        if (err.name === 'AbortError') {
          console.log('fetch aborted');
        } else {
          console.log('error');
        }
      });
  }, [id]);

  const handlePagination = (e, v) => {
    setPage(v);
    window.scroll(0, 0);
  };

  return (
    <Wrapper
      width={xl}
      style={{
        overflow: 'visible',
      }}
    >
      <H1 style={{ marginBottom: '2rem' }}>{genre[0]?.name}</H1>
      <Grid>
        {data.map((d) => (
          <Link to={`/film/${d.id}`}>
            <Card grid poster={d.poster_path} />
          </Link>
        ))}
      </Grid>
      <Wrapper
        justify="center"
        align="center"
        width={md}
        style={{
          marginBottom: '4rem',
          marginTop: '4rem',
          backgroundColor: styledTheme.textPrimary,
          padding: '2rem',
          borderRadius: '8px',
        }}
      >
        <Pagination
          onChange={handlePagination}
          count={numOfPages}
          variant="outlined"
          shape="rounded"
          color="warning"
          size="large"
          page={page}
          siblingCount={2}
          boundaryCount={2}
        />
      </Wrapper>
    </Wrapper>
  );
}

export default Genre;
