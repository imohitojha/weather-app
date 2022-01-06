import React from 'react';
import Footer from '../Components/footer/Footer';
import { render, screen } from '@testing-library/react';
import { render as renderer, unmountComponentAtNode } from 'react-dom';
import '@testing-library/jest-dom/extend-expect';

describe('Testing Footer Component', () => {

  let element = '';
  beforeEach(() => {
    element = document.createElement('div');
    document.body.appendChild(element);
  });

  afterEach(() => {
    unmountComponentAtNode(element);
    element.remove();
    element = null;
  });

  test('Should render Footer component with "Copyrights " text', () => {
    render(<Footer />);
    expect(screen.getByText("Copyrights © 2021 Weather App")).toBeInTheDocument();
  });
  test('Should have 1 a element in Footer component', () => {
    renderer(<Footer />, element);
    const count = element.getElementsByTagName('a').length;
    expect(count).toBeGreaterThan(1);
  });
  test('Should have the element with class row', () => {
    render(<Footer />);
    expect(screen.getByTestId('rowdiv')).toHaveClass('row');
  });
  test('Should have 1 i element in Footer component', () => {
    renderer(<Footer />, element);
    const count = element.getElementsByTagName('i').length;
    expect(count).toBeGreaterThanOrEqual(1);
  });
  test('Should have btn class on all a tags in the footer component', () => {
    renderer(<Footer />, element);
    const links = element.getElementsByTagName('a');
    for (let i = 1; i < links.length; i++) {
      expect(links[i]).toHaveClass('btn');
    }
  });
});


export default Footer;