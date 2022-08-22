import React from 'react';

export const useWindowSize = () => {
  const [windowSize, setWindowSize] = React.useState(window.innerWidth);

  React.useEffect(() => {
    function handleResize() {
      setWindowSize(window.innerWidth);
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [setWindowSize]);
  
  return windowSize;
}