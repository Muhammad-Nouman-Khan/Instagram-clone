import React, { createContext, useContext, useState } from "react";

const UploadContext = createContext();

export const UploadProvider = ({ children }) => {
  const [isUploadOpen, setIsUploadOpen] = useState(false);

  const openUploadBar = () => setIsUploadOpen(true);
  const closeUploadBar = () => {
    setIsUploadOpen(false);
  };

  return (
    <UploadContext.Provider
      value={{ isUploadOpen, openUploadBar, closeUploadBar }}
    >
      {children}
    </UploadContext.Provider>
  );
};

export const useUpload = () => {
  return useContext(UploadContext);
};
