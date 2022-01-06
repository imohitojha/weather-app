import Header from '../Components/header/Header';
import {render, screen} from '@testing-library/react';
import { render as renderer, unmountComponentAtNode } from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import React from 'react';
import '@testing-library/jest-dom/extend-expect';

describe('Weather App Header Tests', () => {
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
  test('Renders Header component', () => {
    render(<Router><Header /></Router>);
  });
  test('Should render header component with Cloud Text', () => {
    render(<Router><Header /></Router>);
    expect(screen.getByText('Cloudy')).toBeInTheDocument();
  }); 
  test('Should have nav tag in header component', () => {
    renderer(<Router><Header /></Router>, element);
    const count = element.getElementsByTagName('nav').length;
    expect(count).toBe(1); 
  });
  test('Should have NavBar class in the Header Component', () => {
    render(<Router><Header /></Router>);
    expect(screen.getByTestId('navBar')).toHaveClass('navbar');
  });
  test('Should have li tag in header component', () => {
    renderer(<Router><Header /></Router>, element);
    const count = element.getElementsByTagName('li').length;
    expect(count).toBeGreaterThanOrEqual(1); 
  });
  test('Should render header component with Home link Text', () => {
    render(<Router><Header /></Router>);
    expect(screen.getByText('Home')).toBeInTheDocument();
  }); 
  test('Should render header component with Search link Text', () => {
    render(<Router><Header /></Router>);
    expect(screen.getByText('Search')).toBeInTheDocument();
  }); 
  test('Should render header component with Favourites link Text', () => {
    render(<Router><Header /></Router>);
    expect(screen.getByText('Favourites')).toBeInTheDocument();
  });
  test('Should render header component with Login link Text', () => {
    render(<Router><Header /></Router>);
    expect(screen.getByText('Login')).toBeInTheDocument();
  });
  test('Should render header component with Register link Text', () => {
    render(<Router><Header /></Router>);
    expect(screen.getByText('Register')).toBeInTheDocument();
  });

});