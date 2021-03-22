import { act, fireEvent, render, screen } from "@testing-library/react";
import { shallow } from 'enzyme';
import '@testing-library/jest-dom/extend-expect';
import App from "./App";

it("the app has rendered", () => {
  render(<App />);
  screen.getByText("Poll Creator 2000");
});

describe("poll_create", () => {
  it("create section initialized correctly", () => {
    const { getByTestId } = render(<App />);
    const editOptionList = getByTestId("edit-option-list");
    const addOptionField = getByTestId("add-option-field");
    const addOptionButton = getByTestId("add-option-button");

    expect(editOptionList).toBeInTheDocument();
    expect(addOptionField).toBeInTheDocument();
    expect(addOptionButton).toBeInTheDocument();
  });

  it("2 options exist", () => {
    const { getAllByTestId } = render(<App />);
    const optionItems = getAllByTestId("edit-option-list-item");

    expect(optionItems).toHaveLength(2);
  });

  it("user can add a new option to the list", async () => {
    const { getByTestId, getAllByTestId } = render(<App />);
    //const { getByTestId, getAllByTestId } = screen;
    const addOptionField = getByTestId("add-option-field");
    const addOptionButton = getByTestId("add-option-button");

    //Type in TestOption
    await act(async () => {
      fireEvent.change(addOptionField, { target: { value: "TestOption" } });
    }) 

    expect(addOptionField).toHaveValue("TestOption");
    //Submit with button
    await act(async () => {
      fireEvent.click(addOptionButton)
    }) 

    const optionItems = getAllByTestId("edit-option-list-item");
    expect(optionItems).toHaveLength(3);

    expect(optionItems[2]).toHaveValue("TestOption");
  });
});
