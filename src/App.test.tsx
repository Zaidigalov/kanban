import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';
import AddButton from './components/addButton/AddButton';
import SelectButton from './components/selectButton/SelectButton';
import Task from './components/task/Task';
import { TaskContext } from './components/context/context';
import { BrowserRouter, MemoryRouter, Route, Routes } from 'react-router-dom';
import EditPage from './components/editPage/EditPage';

const mockTasks = [{ id: 0, name: 'task', description: 'task', status: "backlog" }];
const mockUpdateTasks = jest.fn();

describe('App', function () {

  it('render App', function () {
    render(<App />);
    expect(screen.getByText(/Awesome Kanban Board/i)).toBeInTheDocument();
    expect(screen.getByText(/Backlog/i)).toBeInTheDocument();
    expect(screen.getAllByText(/card/i).length).toBeGreaterThan(0);
  })

  it('shows input when the Add button is clicked', function () {
    render(<AddButton />);
    expect(screen.queryByTestId('input')).toBeNull();
    fireEvent.click(screen.getByText(/Add/i));
    expect(screen.getByTestId('input')).toBeInTheDocument();
  });

  it('disabled button when the task array is empty', function () {
    render(<SelectButton className='' />);
    expect(screen.getByText(/Add/i)).toBeDisabled();
  });

  it('adds a new task', function () {
    render(<App />);
    fireEvent.click(screen.getByTestId(/addButton/i));
    const input = screen.getByTestId('input');
    expect(input).toBeInTheDocument();
    fireEvent.change(input, { target: { value: 'new task' } });
    fireEvent.click(screen.getByText(/Submit/i));
    expect(screen.getByText('new task')).toBeInTheDocument();
  });

  it('shows settings and edit button on hover and click', () => {
    render(
      <BrowserRouter>
        <TaskContext.Provider value={{ tasks: mockTasks, updateTasks: mockUpdateTasks, addTask: mockUpdateTasks }}>
          <Task id={0} name="task" />
        </TaskContext.Provider>
      </BrowserRouter>
    );
    fireEvent.mouseOver(screen.getByTestId('task'));
    const settingsButton = screen.getByTestId('settings');
    expect(settingsButton).toBeInTheDocument();

    fireEvent.click(settingsButton);
    const editButton = screen.getByTestId('editButton');
    expect(editButton).toBeInTheDocument();

  });

  it('renders edit page on edit button click', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <TaskContext.Provider value={{ tasks: mockTasks, updateTasks: mockUpdateTasks, addTask: mockUpdateTasks }}>
          <Routes>
            <Route path="/" element={<Task id={0} name="task" />} />
            <Route path="/edit" element={<EditPage />} />
          </Routes>
        </TaskContext.Provider>
      </MemoryRouter>
    );
    fireEvent.mouseOver(screen.getByTestId('task'));
    fireEvent.click(screen.getByTestId('settings'));
    fireEvent.click(screen.getByTestId('editButton'));
    expect(screen.getByTestId('edit-page')).toBeInTheDocument();
  });

  it('updates task description and navigates back to the main page on save', async () => {
    const newDescription = 'New task description';
    const taskToEdit = mockTasks[0];

    render(
      <MemoryRouter initialEntries={[`/edit?task=${taskToEdit.id}`]}>
        <TaskContext.Provider value={{ tasks: mockTasks, updateTasks: mockUpdateTasks, addTask: mockUpdateTasks }}>
          <Routes>
            <Route path="/" element={<Task id={taskToEdit.id} name={taskToEdit.name} />} />
            <Route path="/edit" element={<EditPage />} />
          </Routes>
        </TaskContext.Provider>
      </MemoryRouter>
    );

    const textArea = screen.getByTestId('text-area');
    fireEvent.change(textArea, { target: { value: newDescription } });

    const saveButton = screen.getByTestId('edit-save');
    fireEvent.click(saveButton);

    expect(mockUpdateTasks).toHaveBeenCalledWith(expect.arrayContaining([
      expect.objectContaining({ id: taskToEdit.id, description: newDescription })
    ]));
    expect(screen.queryByTestId('edit-page')).not.toBeInTheDocument();
  });
})