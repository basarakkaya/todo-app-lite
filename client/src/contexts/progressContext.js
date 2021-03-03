import React from 'react';

// no default value
const progressContext = React.createContext();

/**
 * @function useProgress
 * @returns {Array} progressContext value, which is a state of [value, setter].
 */
export function useProgress() {
  // useContext is a hook that returns the context value
  // In this case, the context value is an [value, setter] array for the context state
  // useContext also subscribes to changes, and will update any time the context value updates
  //     we've memoized this so that it will only update when the progress value updates
  const context = React.useContext(progressContext);

  // throw an error if the context doesn't exist -- means we aren't in a provider
  if (!context) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }

  // otherwise return the context
  return context;
}

/**
 * @function ProgressProvider
 * @param {object} props - props to pass through from declared component
 * @returns {JSX.Element} Provider component
 */
export function ProgressProvider(props) {
  const [progress, setProgress] = React.useState(false);

  // value for the context provider will be array of [value, setter] for progress state
  // useMemo just ensures that the provider value will only update when progress updates
  // No need to test this -- React tests useMemo for us!
  const value = React.useMemo(() => [progress, setProgress], [progress]);

  // Return a Provider component with the [value, setter] array as the value, passing through the props
  return <progressContext.Provider value={value} {...props} />;
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { ProgressProvider, useProgress };
