import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import pokemons from '../data';
import App from '../App';

describe('Verifica o componente <Pokedex.js />', () => {
  test('Teste se página contém um heading h2 com o texto Encountered pokémons', () => {
    renderWithRouter(<App />);
    const pokedexTitle = screen.getByRole('heading', {
      name: /encountered pokémons/i,
      level: 2,
    });
    expect(pokedexTitle).toBeInTheDocument();
  });

  test('Verifica se é exibido o próximo Pokémon quando o botão é clicado', () => {
    renderWithRouter(<App />);
    // Verifica se o botão contém o texto Próximo pokémon;
    const nextButton = screen.getByRole('button', { name: /Próximo pokémon/i });
    expect(nextButton).toBeInTheDocument();

    // Verifica se ao clicarmos no botão, os próximos pokemons são mostrados, um por vez
    // Pega os dados dos pokemons
    pokemons.forEach((item, index) => {
      const nextIndex = index === (pokemons.length - 1) ? 0 : index + 1;

      const pokemonName = screen.getByText(item.name);
      expect(pokemonName).toBeInTheDocument();

      userEvent.click(nextButton);
      const nextPokemonName = pokemons[nextIndex].name;
      const nextPokemon = screen.getByText(nextPokemonName);
      return expect(nextPokemon).toBeInTheDocument();
    });

    const pokemonsById = screen.getAllByTestId('pokemon-name');
    expect(pokemonsById.length).toBe(1);
  });

  test('Verifica se a Pokédex tem os botões de filtro.', () => {
    renderWithRouter(<App />);
    const pokemonAmount = 7;
    const filterButtons = screen.getAllByTestId('pokemon-type-button');
    expect(filterButtons.length).toBe(pokemonAmount);

    pokemons.forEach((item) => {
      const pokemonByType = screen.getByRole('button', { name: item.type });
      return expect(pokemonByType).toBeInTheDocument();
    });
  });

  test('Verifica se a Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(<App />);
    const allPokemonsButton = screen.getByRole('button', {
      name: 'All',
    });
    expect(allPokemonsButton).toBeInTheDocument();

    userEvent.click(allPokemonsButton);
    const nextButton = screen.getByRole('button', { name: /Próximo pokémon/i });

    userEvent.click(nextButton);
    const pokemonsType = pokemons.map((item) => item.type);
    const valid = pokemonsType.length > 1;
    expect(valid).toBe(true);

    const allPokemonsBtnConfirm = () => {
      const allPokemonsBtnSelect = screen.getByRole('button',
        { name: 'All' });
      return expect(allPokemonsBtnSelect).toBeInTheDocument();
    };

    window.onload = allPokemonsBtnConfirm();
  });
});
