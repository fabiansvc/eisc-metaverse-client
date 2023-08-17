
import { AuthProvider } from "./context/AuthContext";
import { AvatarProvider } from "./context/AvatarContext";
import { UserProvider } from "./context/UserContext";
import RoutesEISCMetaverse from "./routes/RoutesEISCMetaverse";

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
