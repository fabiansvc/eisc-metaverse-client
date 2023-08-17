import { createContext, useContext, useState } from "react";

export const userContext = createContext();

export const useUser = () => {
  const context = useContext(userContext);
  if (!context) {
    console.error("Error creating user context");
  }
  return context;
};

export function UserProvider({ children }) {
  const [user, setUser] = useState({
    animation: "Idle",
    position: [0, 0, 0],
    rotation: [0, 0, 0],
    avatarUrl: "",
    isTeacher: null,
    type: "",
  });

  return (
    <userContext.Provider value={{ user, setUser }}>
      {children}
    </userContext.Provider>
  );
}
