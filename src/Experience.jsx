import { AuthProvider } from "./context/AuthContext";
import { UserProvider } from "./context/UserContext";
import { AvatarProvider } from "./context/AvatarContext";
import RoutesEISCMetaverse from "./routes/RoutesEISCMetaverse";

/**
 * Component representing the entire experience of the EISC Metaverse
 * It wraps the application with context providers and defines the main routes
 */
const Experience = () => {
  return (
    <AuthProvider>
      <UserProvider>
        <AvatarProvider>
          <RoutesEISCMetaverse />
        </AvatarProvider>
      </UserProvider>
    </AuthProvider>
  );
};

export default Experience;
