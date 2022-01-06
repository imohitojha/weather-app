import Login from '../Components/login/Login'
import { BrowserRouter as Router} from "react-router-dom";
import '@testing-library/jest-dom';
import React from 'react';
import { render, screen } from '@testing-library/react';
import {render as renderer,unmountComponentAtNode} from 'react-dom';
import '@testing-library/jest-dom/extend-expect';

// Test Module for Login Component
describe('Login Test Cases', () => {
    let element;

    beforeEach(()=>{
        element= document.createElement('div');
        document.body.appendChild(element);
    });

    afterEach(()=>{
        unmountComponentAtNode(element);
        element.remove();
        element=null;
    });

    // Test 1
    test('Login should be rendered', () => {
        render(<Router><Login/></Router>);
    });

    // Test 2
    test('Login should have "Login" text', () => {
        render(<Router><Login/></Router>);
        expect(screen.getByTestId('login-heading')).toHaveTextContent("Login");
    });

    // Test 3
    test('Login should have "form" tag', () => {
        renderer(<Router><Login/></Router>,element);
        const count = element.getElementsByTagName('form').length;
        expect(count).toBe(1);
    });
    
    // Test 4
    test('Login should have "text-center" class', () => {
        render(<Router><Login/></Router>);
        expect(screen.getByTestId('login-heading')).toHaveClass('text-center')
    });

    // Test 5
    test('Login should have two "input" tags', () => {
        renderer(<Router><Login/></Router>,element);
        expect(element.getElementsByTagName('input').length).toBe(2);
    });

    // Test 6
    test('Login should contain "card" class in the first opening tag', () => {
        renderer(<Router><Login/></Router>,element);
        expect(element.firstElementChild.firstElementChild).toHaveClass('card');
    })
    
    // Test 7
    test('Login should have one img tag for the logo', () => {
        render(<Router><Login/></Router>);
        expect(document.getElementsByTagName('img').length).toBe(1);
    })

    // Test 8
    test('Login should have Login Button with "btn-success" class', () => {
        render(<Router><Login/></Router>);
        expect(screen.getByTestId('btnLogin1')).toHaveClass('btn-success');
    });

    // Test 9
    test('Login should have Register Button with "btn-success" class', () => {
        render(<Router><Login/></Router>);
        expect(screen.getByTestId('btnLogin2')).toHaveClass('btn-success');
    });

});

export default Login;