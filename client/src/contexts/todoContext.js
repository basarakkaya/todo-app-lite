import React from 'react';

// no default value
const todoContext = React.createContext();

/**
 * @function useTodo
 * @returns {Array} todoContext value, which is a state of [value, setter].
 */
export function useTodo() {
  // useContext is a hook that returns the context value
  // In this case, the context value is an [value, setter] array for the context state
  // useContext also subscribes to changes, and will update any time the context value updates
  //     we've memoized this so that it will only update when the todo list value updates
  const context = React.useContext(todoContext);

  // throw an error if the context doesn't exist -- means we aren't in a provider
  if (!context) {
    throw new Error('useTodo must be used within a TodoProvider');
  }

  // otherwise return the context
  return context;
}

/**
 * @function TodoProvider
 * @param {object} props - props to pass through from declared component
 * @returns {JSX.Element} Provider component
 */
export function TodoProvider(props) {
  const [todos, setTodos] = React.useState([]);

  // value for the context provider will be array of [value, setter] for todos state
  // useMemo just ensures that the provider value will only update when todos updates
  // No need to test this -- React tests useMemo for us!
  const customSetTodos = (args) =>
    setTodos(args.sort((a, b) => a.order - b.order));

  const value = React.useMemo(() => [todos, customSetTodos], [todos]);

  // Return a Provider component with the [value, setter] array as the value, passing through the props
  return <todoContext.Provider value={value} {...props} />;
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { TodoProvider, useTodo };
