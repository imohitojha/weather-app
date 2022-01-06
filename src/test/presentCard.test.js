import PresentCard from '../Components/presentCard/PresentCard';
import { render, screen } from '@testing-library/react';
import { render as renderer, unmountComponentAtNode } from "react-dom";
import React from 'react';
import '@testing-library/jest-dom/extend-expect';

describe('Weather App Present Card Tests', () => {
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
  test('Renders Present Card component', () => {
    render(<PresentCard />);
  });
  test('Should have flex class in the Present Card Component', () => {
    render(<PresentCard />);
    expect(screen.getByTestId('flexClass')).toHaveClass('d-flex');
  });
  test('Should have div tag in Present Card component', () => {
    renderer(<PresentCard/>, element);
    const count = element.getElementsByTagName('div').length;
    expect(count).toBeGreaterThanOrEqual(1); 
  });
  test('Should have img tag in Present Card component', () => {
    renderer(<PresentCard/>, element);
    const count = element.getElementsByTagName('img').length;
    expect(count).toBe(1); 
  });
  test('Should have locaition_date class in the Present Card Component', () => {
    render(<PresentCard />);
    expect(screen.getByTestId('locationDate')).toHaveClass('location-and-date');
  });
  test('Should have current_temperature class in the Present Card Component', () => {
    render(<PresentCard />);
    expect(screen.getByTestId('currentTemperature')).toHaveClass('current-temperature');
  });
  test('Should have current_stats class in the Present Card Component', () => {
    render(<PresentCard />);
    expect(screen.getByTestId('currentStats')).toHaveClass('current-stats');
  });
  test('Should have one button in Present Card component', () => {
    renderer(<PresentCard/>, element);
    const count = element.getElementsByTagName('button').length;
    expect(count).toBe(1); 
  });
  test('Should have component with "Sunset" Label', () => {
    render(<PresentCard />);
    expect(screen.getByText('Sunset')).toBeInTheDocument();
  });

  test('Should have component with "Sunrise" Label', () => {
    render(<PresentCard />);
    expect(screen.getByText('Sunrise')).toBeInTheDocument();
  });

  test('Should have component with "Pressure" Label', () => {
    render(<PresentCard />);
    expect(screen.getByText('Pressure')).toBeInTheDocument();
  });

  test('Should have component with "Wind" Label', () => {
    render(<PresentCard />);
    expect(screen.getByText('Wind')).toBeInTheDocument();
  });

  test('Should have component with "Low" Label for minimum temperature', () => {
    render(<PresentCard />);
    expect(screen.getByText('Low')).toBeInTheDocument();
  });

  test('Should have component with "High" Label for maximum temperature', () => {
    render(<PresentCard />);
    expect(screen.getByText('High')).toBeInTheDocument();
  });
});