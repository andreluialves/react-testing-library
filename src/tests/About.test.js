import React from 'react';
import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import { About } from '../components';

test('Teste o componente <About.js />', () => {
  renderWithRouter(<About />);
  // Teste se a página contém as informações sobre a Pokédex.
  const aboutPage = screen.getByText(/about pokédex/i);
  expect(aboutPage).toBeInTheDocument();

  // Teste se a página contém um heading h2 com o texto About Pokédex
  const aboutTitle = screen.getByRole('heading', {
    name: /about pokédex/i,
    level: 2,
  });
  expect(aboutTitle).toBeInTheDocument();

  // Teste se a página contém dois parágrafos com texto sobre a Pokédex.
  const aboutParagraphOne = screen.getByText(/this application simulates a Pokédex/i);
  expect(aboutParagraphOne).toBeInTheDocument();

  const aboutParagraphTwo = screen.getByText(/one can filter Pokémons by type/i);
  expect(aboutParagraphTwo).toBeInTheDocument();

  // Teste se a página contém a seguinte imagem de uma Pokédex
  const aboutImg = screen.getByRole('img');
  expect(aboutImg).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
});
