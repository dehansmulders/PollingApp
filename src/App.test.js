import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';
import { TextField } from "@material-ui/core"

test('the app has rendered', () => {
  render(<App />);
  screen.getByText("Poll Creator 2000");
});

test('user can add a new option to the list', () => {
  const onChange = jest.spyOn(TextField.prototype, 'onChange');
  const inputField = screen.getByText(/Type an answer:/i);
  const addButton = screen.getByText("Add");
  
  fireEvent.change(inputField, {target: {value: "TestOption"}});
  fireEvent.click(addButton)

  screen.getByText("TestOption")
});
