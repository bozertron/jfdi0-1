# Unit Test Master Reference

## JfdiHubUpdated Component Tests (jfdi/components/jfdi-hub-updated.test.tsx)

```typescript
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { JfdiHubUpdated } from './jfdi-hub-updated';
import { AppProvider } from '@/contexts/AppContext';
import * as AppContext from '@/contexts/AppContext';
import '@testing-library/jest-dom';

// Mock the fetch function
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve([]),
  })
) as jest.Mock;

// Mock the AppContext
jest.mock('@/contexts/AppContext', () => ({
  ...jest.requireActual('@/contexts/AppContext'),
  useApp: jest.fn(),
}));

describe('JfdiHubUpdated', () => {
  beforeEach(() => {
    (AppContext.useApp as jest.Mock).mockReturnValue({ user: null });
  });

  test('renders Login component when user is not authenticated', () => {
    render(
      <AppProvider>
        <JfdiHubUpdated />
      </AppProvider>
    );
    expect(screen.getByText('Login')).toBeInTheDocument();
  });

  test('renders main content when user is authenticated', () => {
    (AppContext.useApp as jest.Mock).mockReturnValue({ user: { id: '1', name: 'Test User' } });
    render(
      <AppProvider>
        <JfdiHubUpdated />
      </AppProvider>
    );
    expect(screen.getByText('JFDI')).toBeInTheDocument();
    expect(screen.getByText('Vee - Time and Communication')).toBeInTheDocument();
    expect(screen.getByText('Maestro - Execution')).toBeInTheDocument();
  });

  test('fetches workflows when user is authenticated', async () => {
    (AppContext.useApp as jest.Mock).mockReturnValue({ user: { id: '1', name: 'Test User' } });
    render(
      <AppProvider>
        <JfdiHubUpdated />
      </AppProvider>
    );
    await waitFor(() => expect(global.fetch).toHaveBeenCalledWith('/api/workflows'));
  });

  test('renders sidebar buttons', () => {
    (AppContext.useApp as jest.Mock).mockReturnValue({ user: { id: '1', name: 'Test User' } });
    render(
      <AppProvider>
        <JfdiHubUpdated />
      </AppProvider>
    );
    expect(screen.getByText('Create')).toBeInTheDocument();
    expect(screen.getByText('Admin')).toBeInTheDocument();
    expect(screen.getByText('Projects')).toBeInTheDocument();
    expect(screen.getByText('Maestro')).toBeInTheDocument();
  });

  test('renders VeeUI component', () => {
    (AppContext.useApp as jest.Mock).mockReturnValue({ user: { id: '1', name: 'Test User' } });
    render(
      <AppProvider>
        <JfdiHubUpdated />
      </AppProvider>
    );
    expect(screen.getByText('Vee - Time and Communication')).toBeInTheDocument();
    expect(screen.getByText('Next Meeting: Product Team Sync')).toBeInTheDocument();
  });

  test('renders MaestroUI component', () => {
    (AppContext.useApp as jest.Mock).mockReturnValue({ user: { id: '1', name: 'Test User' } });
    render(
      <AppProvider>
        <JfdiHubUpdated />
      </AppProvider>
    );
    expect(screen.getByText('Maestro - Execution')).toBeInTheDocument();
    expect(screen.getByText('Decision Required: Headphone Amplifier PR Budget')).toBeInTheDocument();
  });

  test('chat input functionality', () => {
    (AppContext.useApp as jest.Mock).mockReturnValue({ user: { id: '1', name: 'Test User' } });
    render(
      <AppProvider>
        <JfdiHubUpdated />
      </AppProvider>
    );
    const chatInputs = screen.getAllByPlaceholderText('Type your message...');
    fireEvent.change(chatInputs[0], { target: { value: 'Test message' } });
    expect(chatInputs[0]).toHaveValue('Test message');
  });
});
```

These tests cover the main functionality of the JfdiHubUpdated component, including:
1. Rendering the Login component when the user is not authenticated
2. Rendering the main content when the user is authenticated
3. Fetching workflows when the user is authenticated
4. Rendering sidebar buttons
5. Rendering VeeUI and MaestroUI components
6. Testing chat input functionality

## Dashboard Component Tests (jfdi/components/Dashboard.test.tsx)

```typescript
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Dashboard from './Dashboard';
import { AppProvider } from '../contexts/AppContext';
import * as AppContext from '../contexts/AppContext';
import '@testing-library/jest-dom';

// Mock the fetch function
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve([]),
  })
) as jest.Mock;

// Mock the AppContext
jest.mock('../contexts/AppContext', () => ({
  ...jest.requireActual('../contexts/AppContext'),
  useApp: jest.fn(),
}));

describe('Dashboard', () => {
  beforeEach(() => {
    (AppContext.useApp as jest.Mock).mockReturnValue({ user: 'TestUser' });
  });

  test('renders welcome message with user name', () => {
    render(
      <AppProvider>
        <Dashboard />
      </AppProvider>
    );
    expect(screen.getByText('Welcome to Your Dashboard, TestUser!')).toBeInTheDocument();
  });

  test('renders tab buttons', () => {
    render(
      <AppProvider>
        <Dashboard />
      </AppProvider>
    );
    expect(screen.getByText('Workflows')).toBeInTheDocument();
    expect(screen.getByText('Vee')).toBeInTheDocument();
    expect(screen.getByText('Maestro')).toBeInTheDocument();
    expect(screen.getByText('Create')).toBeInTheDocument();
    expect(screen.getByText('Data Compiler')).toBeInTheDocument();
  });

  test('switches tabs when clicking on tab buttons', () => {
    render(
      <AppProvider>
        <Dashboard />
      </AppProvider>
    );
    fireEvent.click(screen.getByText('Vee'));
    expect(screen.getByText('Vee LLM Interface')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Data Compiler'));
    expect(screen.getByText('Data Compiler Component')).toBeInTheDocument();
  });

  test('fetches workflows on component mount', async () => {
    render(
      <AppProvider>
        <Dashboard />
      </AppProvider>
    );
    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(2));
    expect(global.fetch).toHaveBeenCalledWith('/api/workflows?userId=TestUser');
    expect(global.fetch).toHaveBeenCalledWith('/api/workflows?shared=true');
  });

  test('creates a new workflow', async () => {
    render(
      <AppProvider>
        <Dashboard />
      </AppProvider>
    );

    fireEvent.change(screen.getByPlaceholderText('Workflow Name'), { target: { value: 'Test Workflow' } });
    fireEvent.change(screen.getByPlaceholderText('Workflow Description'), { target: { value: 'Test Description' } });
    fireEvent.change(screen.getByPlaceholderText('Steps (comma-separated)'), { target: { value: 'Step 1, Step 2' } });
    fireEvent.click(screen.getByText('Create Workflow'));

    await waitFor(() => expect(global.fetch).toHaveBeenCalledWith(
      '/api/workflows?userId=TestUser&shared=false',
      expect.objectContaining({
        method: 'POST',
        body: JSON.stringify({
          name: 'Test Workflow',
          description: 'Test Description',
          steps: ['Step 1', 'Step 2'],
        }),
      })
    ));
  });

  test('displays personal and shared workflows', async () => {
    const mockPersonalWorkflows = [
      { _id: '1', name: 'Personal Workflow 1', description: 'Description 1', steps: ['Step 1', 'Step 2'] },
    ];
    const mockSharedWorkflows = [
      { _id: '2', name: 'Shared Workflow 1', description: 'Description 2', steps: ['Step 3', 'Step 4'] },
    ];

    global.fetch = jest.fn()
      .mockImplementationOnce(() => Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockPersonalWorkflows),
      }))
      .mockImplementationOnce(() => Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockSharedWorkflows),
      }));

    render(
      <AppProvider>
        <Dashboard />
      </AppProvider>
    );

    await waitFor(() => {
      expect(screen.getByText('Personal Workflow 1')).toBeInTheDocument();
      expect(screen.getByText('Shared Workflow 1')).toBeInTheDocument();
    });
  });
});
```

These tests cover the main functionality of the Dashboard component, including:
1. Rendering the welcome message with the user's name
2. Rendering and interacting with tab buttons
3. Fetching workflows on component mount
4. Creating a new workflow
5. Displaying personal and shared workflows

To run these tests, you'll need to set up Jest and React Testing Library in your project if they're not already set up. You may also need to add some configuration to handle TypeScript and module aliases used in the project.