import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import { NotFound } from '../components';

test('Teste o componente <FavoritePokemons.js />', () => {
  renderWithRouter(<NotFound />);

  // Teste se página contém um heading h2 com o texto Page requested not found
  const notFoundTitle = screen.getByRole('heading', {
    name: /page requested not found/i,
    level: 2,
  });
  expect(notFoundTitle).toBeInTheDocument();

  // Teste se página mostra a imagem https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif
  const favoriteImg = screen.getByAltText(/Pikachu crying because the page/i);
  expect(favoriteImg).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
});
