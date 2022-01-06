import Register from '../Components/register/Register'
import { BrowserRouter as Router} from "react-router-dom";
import '@testing-library/jest-dom';
import React from 'react';
import { render, screen } from '@testing-library/react';
import {render as renderer,unmountComponentAtNode} from 'react-dom';
import '@testing-library/jest-dom/extend-expect';

// Test Module for Register Component
describe('Register test case',()=>{
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
    test('Register should be rendered', () => {
        render(<Router><Register/></Router>);
    });

    // Test 2
    test('Register should have "Register" text', () => {
        render(<Router><Register/></Router>);
        expect(screen.getByTestId('register-heading')).toHaveTextContent("Register");
    });

    // Test 3
    test('Register should have "form" tag', () => {
        renderer(<Router><Register/></Router>,element);
        const count = element.getElementsByTagName('form').length;
        expect(count).toBe(1);
    });
    
    // Test 4
    test('Register should have "text-center" class', () => {
        render(<Router><Register/></Router>);
        expect(screen.getByTestId('register-heading')).toHaveClass('text-center')
    });

    // Test 5
    test('Register should have six "input" tags', () => {
        renderer(<Router><Register/></Router>,element);
        expect(element.getElementsByTagName('input').length).toBe(6);
    });

    // Test 6
    test('Register should have two "conditons-register" class', () => {
        render(<Router><Register/></Router>);
        expect(document.getElementsByClassName('conditons-register').length).toBe(2);
    })

    // Test 7
    test('Register should contain "register-container" class in the first opening tag', () => {
        render(<Router><Register/></Router>);
        expect(document.getElementsByClassName("register-container").length).toBe(1);
 })
    
    // Test 8
    test('Register should have one img tag for the logo', () => {
        render(<Router><Register/></Router>);
        expect(document.getElementsByTagName('img').length).toBe(1);
    })

    // Test 9
    test('Register should have SignUp Button with "btn-success" class', () => {
        render(<Router><Register/></Router>);
        expect(screen.getByTestId('Regbtn')).toHaveClass('btn-success');
    });
});

export default Register;