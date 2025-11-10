import React, { useState } from "react";

const useLoading = (state=false) => {
  const [isLoading, setIsLoading] = useState(state);

  const startLoading = () => {
    setIsLoading(true);
  };

  const stopLoading = () => {
    setIsLoading(false);
  };

  return {
    startLoading,
    stopLoading,
    isLoading,
  };
};

export default useLoading;
