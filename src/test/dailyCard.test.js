import React from 'react';
import { render, screen } from '@testing-library/react';
import { render as renderer, unmountComponentAtNode } from 'react-dom';
import '@testing-library/jest-dom/extend-expect';
import DailyCard from '../Components/dailyCard/DailyCard';

describe('Testing DailyCard Component', () => {

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

  test('Should render DailyCard component', () => {
    render(<DailyCard />);
  });

  test('Should have the element with classname forecast_days', () => {
    render(<DailyCard />);
    expect(screen.getByTestId("forecast")).toHaveClass("forecast-days");
  });
  test('Should render img element in the DailyCard component ', () => {
    renderer(<DailyCard />, element);
    const count = element.getElementsByTagName('img').length;
    expect(count).toBeGreaterThanOrEqual(1);
  });
  test('image should have alt text', () => {
    render(<DailyCard />);
    expect(screen.getByAltText("Sunny")).toBeInTheDocument();
  });
 
  test('Should have the element with class forecast-days-row', () => {
    render(<DailyCard />);
    expect(screen.getByTestId("forecast_row")).toHaveClass("forecast-days__row");
  });
  test('Should have the element with classname forecast_days__low', () => {
    render(<DailyCard />);
    expect(screen.getByTestId("low")).toHaveClass("forecast-days__low");
  });
  
  test('Should have div tag in DailyCard component', () => {
    renderer(<DailyCard />, element);
    const count = element.getElementsByTagName('div').length;
    expect(count).toBeGreaterThanOrEqual(1);
  });
  test('Should render a component with "Low " text', () => {
    render(<DailyCard />);
    expect(screen.getByText("Low")).toBeInTheDocument();
  });
});



export default DailyCard;