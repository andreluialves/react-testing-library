import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Teste o componente <PokemonDetails.js />', () => {
  test('Verifica se informações detalhadas do Pokémon são mostradas na tela.', () => {
    renderWithRouter(<App />);
    // A página deve conter um texto <name> Details, onde <name> é o nome do Pokémon
    const detailsButton = screen.getByRole('link', { name: /more details/i });
    userEvent.click(detailsButton);

    const detailTitle = screen.getByRole('heading', {
      name: /details/i,
      level: 2,
    });

    expect(detailTitle).toBeInTheDocument();

    // Não deve existir o link de navegação para os detalhes do Pokémon selecionado
    expect(detailsButton).not.toBeInTheDocument();

    // A seção de detalhes deve conter um heading h2 com o texto Summary
    const detailSection = screen.getByRole('heading', {
      name: /summary/i,
      level: 2,
    });

    expect(detailSection).toBeInTheDocument();

    // A seção de detalhes deve conter um parágrafo com o resumo do Pokémon específico sendo visualizado
    const detailParagraph = screen.getByText(/this intelligent pokémon roasts hard/i);

    expect(detailParagraph).toBeInTheDocument();
  });

  test('Verifica se há na página os mapas com as localizações do pokémon', () => {
    renderWithRouter(<App />);
    /* Na seção de detalhes deverá existir um heading h2 com o texto
      Game Locations of <name>; onde <name> é o nome do Pokémon exibido.
    */
    const detailsButton = screen.getByRole('link', { name: /more details/i });
    userEvent.click(detailsButton);

    const gameLocationTitle = screen.getByRole('heading', {
      name: /game Locations of/i,
      level: 2,
    });

    expect(gameLocationTitle).toBeInTheDocument();

    // Todas as localizações do Pokémon devem ser mostradas na seção de detalhes;
    // A imagem da localização deve ter um atributo alt com o texto <name> location, onde <name> é o nome do Pokémon;
    // A imagem da localização deve ter um atributo src com a URL da localização;
    const locations = screen.getAllByAltText(/location/i);
    expect(locations).toHaveLength(2);

    locations.forEach((item) => {
      expect(item.src).toContain('png');
    });

    // Devem ser exibidos, o nome da localização e uma imagem do mapa em cada localização
    const locationNameOne = screen.getByText('Kanto Viridian Forest');

    expect(locationNameOne).toBeInTheDocument();

    const locationNameTwo = screen.getByText('Kanto Power Plant');

    expect(locationNameTwo).toBeInTheDocument();
  });

  test('Verifica se é possível favoritar um pokémon pela página de detalhes.', () => {
    renderWithRouter(<App />);
    // A página deve exibir um checkbox que permite favoritar o Pokémon
    const detailsButton = screen.getByRole('link', { name: /more details/i });
    userEvent.click(detailsButton);

    const favoriteCheck = screen.getByRole('checkbox');

    expect(favoriteCheck).toBeInTheDocument();

    // Cliques alternados no checkbox devem adicionar e remover respectivamente o Pokémon da lista de favoritos
    userEvent.click(favoriteCheck);
    const favoriteIcon = screen.getByAltText(/is marked as favorite/i);

    expect(favoriteIcon).toBeInTheDocument();

    // O label do checkbox deve conter o texto Pokémon favoritado?
    const favoriteLabel = screen.getByLabelText(/pokémon favoritado/i);

    expect(favoriteLabel).toBeInTheDocument();
  });
});
