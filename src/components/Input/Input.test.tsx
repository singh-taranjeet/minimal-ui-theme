import React from 'react';
import { fireEvent, render, screen } from "@testing-library/react";
import { Input } from '.';

function renderInput() {
    render(<Input value="" onChange={onChange} label="test input" />);
    screen.getByRole("input");
}

function onChange() {
    console.log("called");
}

describe("Test Input", () => {
    test("Check if value is changed", () => {
        renderInput();
        const input = screen.getByLabelText("test input");
        fireEvent.change(input, "dsfdf");
        expect(input.nodeValue).toBe("dsfdf");
    })
})