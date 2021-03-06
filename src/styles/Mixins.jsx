import { css } from 'styled-components';

export const flex = css`
  display: flex;
  flex-direction: ${({ direction }) => (direction ? direction : 'column')};
  align-items: ${({ align }) => (align ? align : 'center')};
  justify-content: ${({ justify }) => (justify ? justify : 'center')};
`;

export const media = {
  smallMobile: `@media screen and (max-width: 320px)`,
  mediumMobile: `@media screen and (max-width: 375px)`,
  largeMobile: `@media screen and (max-width: 425px)`,
  tablet: `@media screen and (max-width: 768px)`,
  laptop: `@media screen and (max-width: 1024px)`,
  large: `@media screen and (max-width: 1440px)`,
  desktop: `@media screen and (max-width: 2560px)`,
};

export const styledTheme = {
  error: '#ef476f',
  warning: '#ffd166',
  success: '#06d6a0',
  secondary: '#118ab2',
  primary: '#073b4c',
  textPrimary: '#f8f9fa',
  textSecondary: '#212529',
  headerFont: `'Playfair Display', serif;`,
  body: '16px',
  bodyBig: '18px',
  subHeader: '38px',
  header: '56px',
  headline: '68px',
  heroHeadline: '96px',
  superHero: '128px',
};

export const breakpoints = {
  sm: 375,
  md: 768,
  lg: 1024,
  xl: 1440,
  xxl: 2560,
};
