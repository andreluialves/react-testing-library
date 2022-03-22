import React from 'react';
import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

// import { createMemoryHistory} from 'history';

test('Teste se o topo da aplicação contém um conjunto fixo de links de navegação', () => {
  renderWithRouter(<App />);
  // const { history } = renderWithRouter(<App />);
  // const { pathname } = history.location;

  // Home
  const homeLink = screen.getByRole('link', { name: /home/i });
  expect(homeLink).toBeInTheDocument();

  // userEvent.click(homeLink);
  // expect(pathname).toBe('/');

  // const hometTitle = screen.getByRole('heading', { name: /encountered pokémons/i });
  // expect(hometTitle).toBeInTheDocument();

  // About
  const aboutLink = screen.getByRole('link', { name: /about/i });
  expect(aboutLink).toBeInTheDocument();

  // userEvent.click(homeAbout);
  // expect(pathname).toBe('/about');

  // const aboutTitle = screen.getByRole('heading', { name: /about pokédex/i });
  // expect(aboutTitle).toBeInTheDocument();

  // Favorite
  const favoriteLink = screen.getByRole('link', { name: /favorite pokémons/i });
  expect(favoriteLink).toBeInTheDocument();

  // userEvent.click(homeFavorite);
  // expect(pathname).toBe('/favorites');

  // const favoriteTitle = screen.getByRole('heading', { name: /favorite pokémons/i });
  // expect(favoriteTitle).toBeInTheDocument();
});
