import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Teste o componente <Pokemon.js />', () => {
  test('Verifica se um card com as informações do pokemon é renderizado', () => {
    renderWithRouter(<App />);
    // O nome correto do Pokémon deve ser mostrado na tela
    const pokemonType = screen.getByTestId('pokemon-type');
    expect(pokemonType).toHaveTextContent('Electric');

    // O peso médio do pokémon deve ser exibido na página
    const pokemonValue = screen.getByTestId('pokemon-weight');
    expect(pokemonValue).toBeInTheDocument();

    // Verifica se a imagem do Pokémon é exibida, contendo um atributo src e um atributo alt
    const pokemonImg = screen.getByAltText(/sprite/i);
    expect(pokemonImg.src).toContain('png');
    expect(pokemonImg).toBeInTheDocument();
  });

  test('Verifica se o card do Pokémon contém um link para exibir mais detalhes', () => {
    renderWithRouter(<App />);
    const detailLink = screen.getByRole('link', { name: /more details/i });
    return expect(detailLink).toBeInTheDocument();
  });

  test('Verifica se o link do Pokémon, redireciona para mais detalhes', () => {
    renderWithRouter(<App />);
    const detailLink = screen.getByRole('link', { name: /more details/i });
    userEvent.click(detailLink);
    const detailTitle = screen.getByRole('heading', { name: /details/i, level: 2 });
    expect(detailTitle).toBeInTheDocument();
  });

  test('Verifica se o link do Pokémon, direciona para /pokemon/<id>', () => {
    const { history } = renderWithRouter(<App />);
    const detailLink = screen.getByRole('link', { name: /more details/i });

    userEvent.click(detailLink);
    const { pathname } = history.location;
    expect(pathname).toContain('pokemons');
  });

  test('Verifica se existe um ícone de estrela nos Pokémons favoritados.', () => {
    const { history } = renderWithRouter(<App />);
    const detailLink = screen.getByRole('link', { name: /more details/i });

    userEvent.click(detailLink);
    const { pathname } = history.location;
    expect(pathname).toContain('pokemons');

    const favoriteCheckbox = screen.getByRole('checkbox');
    userEvent.click(favoriteCheckbox);

    const favoriteImg = screen.getByAltText(/is marked as favorite/i);
    expect(favoriteImg).toHaveAttribute('src', '/star-icon.svg');
  });
});
