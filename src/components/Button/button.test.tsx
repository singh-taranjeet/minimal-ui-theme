import React from 'react';
import { render, screen } from "@testing-library/react"
import { Button } from ".";

describe("Test button ", () => {
    test("Renders button with text", () => {

        const buttonName = "Test button";

        render(<Button>{buttonName}</Button>);

        const button = screen.getByRole("button", {name: buttonName});

        expect(button.textContent).toBe(buttonName);
    });

    test("Renders button link", () => {

        const buttonName = "Test button";
        const href = "www.example.com";

        render(<Button href={href}>{buttonName}</Button>);

        const button = screen.getByRole("link", {name: buttonName});

        expect(button.textContent).toBe(buttonName);
    });
    
})