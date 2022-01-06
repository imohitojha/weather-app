import Search from '../Components/search/Search';
import { render, screen, within } from '@testing-library/react';
import { render as renderer, unmountComponentAtNode } from "react-dom";
import React from 'react';
import '@testing-library/jest-dom/extend-expect';

describe('Weather App Search Component Tests', () => {
    let element='';
  beforeEach(() => {
    element=document.createElement('div');
    document.body.appendChild(element);
  });
  afterEach(() => {
    unmountComponentAtNode(element);
    element.remove();
    element = null;
  });
  test('Renders Search component', () => {
    render(<Search/>);
  });
  test('Should render Search component with Weather Search text', () => {
    render(<Search/>);
    expect(screen.getByText('Weather Search')).toBeInTheDocument();
  }); 
  test('Should have container-fluid class in the Search Component', () => {
    render(<Search/>);
    expect(screen.getByTestId('containerClass')).toHaveClass('container-fluid');
  });
  test('Should have row class in Search component', () => {
    renderer(<Search/>, element);
    const count = element.getElementsByClassName('row').length;
    expect(count).toBeGreaterThanOrEqual(3); 
  });
});