import React from 'react';
import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import { FavoritePokemons } from '../components';

test('Teste o componente <FavoritePokemons.js />', () => {
  renderWithRouter(<FavoritePokemons />);
  // Teste se é exibido na tela a mensagem No favorite pokemon found, se a pessoa não tiver pokémons favoritos.
  const favoriteStar = screen.getByRole('img');
  // expect(favoriteStar).toHaveAttribute('src', '/star-icon.svg');
  expect(favoriteStar).not.toBeInTheDocument();

  const favoriteTitle = screen.getByRole('heading', {
    name: /favorite pokémons/i,
    level: 2,
  });
  expect(favoriteTitle).toBeInTheDocument();
});
