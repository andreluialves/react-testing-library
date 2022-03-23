import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import { FavoritePokemons } from '../components';

test('Teste o componente <FavoritePokemons.js />', () => {
  renderWithRouter(<FavoritePokemons />);
  // Teste se é exibido na tela a mensagem No favorite pokemon found, se a pessoa não tiver pokémons favoritos.
  const NotFoundText = screen.getByText(/no favorite pokemon found/i);
  expect(NotFoundText).toBeInTheDocument();
});
