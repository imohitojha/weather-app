import React from 'react';
import { render, screen } from '@testing-library/react';
import { render as renderer, unmountComponentAtNode } from 'react-dom';
import '@testing-library/jest-dom/extend-expect';
import Filter from '../Components/filter/Filter';

describe('Testing Filter Component', () => {

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

  test('Should render Filter component', () => {
    render(<Filter />);
  });

  test('Should have the dropdown for the search in Filter component ', () => {
    render(<Filter />);
    expect(screen.getByTestId("dropdown")).toHaveClass("form-select");
  });
  test('Should have the city in the dropdown', () => {
    render(<Filter />);
    expect(screen.getByTestId("city")).toBeInTheDocument();
  });
    test('Should have the coordinates in the dropdown', () => {
      render(<Filter />);
      expect(screen.getByTestId("coord")).toBeInTheDocument();
    });
    test('Should have the zip in the dropdown', () => {
      render(<Filter />);
      expect(screen.getByTestId("zip")).toBeInTheDocument();
    });
    test('Should have the endpoints display div in the Filter component', () => {
      render(<Filter />);
      expect(screen.getByTestId("endpoints_col")).toHaveClass("col-md-10")
    });

  
  test('Should have div tag in Filter component', () => {
    renderer(<Filter />, element);
    const count = element.getElementsByTagName('div').length;
    expect(count).toBeGreaterThanOrEqual(1);
  });
  test('Should render a component with "Search weather by " text', () => {
    render(<Filter />);
    expect(screen.getByText("Search Weather By:")).toBeInTheDocument();
  });
});



export default Filter;