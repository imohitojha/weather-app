import React from 'react';
import { render, screen } from '@testing-library/react';
import { render as renderer, unmountComponentAtNode } from 'react-dom';
import '@testing-library/jest-dom/extend-expect';
import Favourite from '../Components/favourite/Favourite';

describe('Testing favourite card Component', () => {

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

  test('Should render favourite component', () => {
    render(<Favourite />);
  });

  test('Should have the element with classname container', () => {
    render(<Favourite />);
    expect(screen.getByTestId("cont1")).toHaveClass("container");
  });
  test('Should have the element with classname row', () => {
    render(<Favourite />);
    expect(screen.getByTestId("row1")).toHaveClass("row");
  });
  test('Should render div element in the Favourite component ', () => {
    renderer(<Favourite />, element);
    const count = element.getElementsByTagName('div').length;
    expect(count).toBeGreaterThanOrEqual(1);
  });
  
});



export default Favourite;