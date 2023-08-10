import { AuthProvider } from "./context/authContext";
import { AvatarProvider } from "./context/avatarContext";
import { UserProvider } from "./context/userContext";
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
