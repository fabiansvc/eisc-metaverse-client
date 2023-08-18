
import { AuthProvider } from "./context/AuthContext";
import { AvatarProvider } from "./context/AvatarContext";
import { SocketProvider } from "./context/SocketContex";
import { UserProvider } from "./context/UserContext";
import RoutesEISCMetaverse from "./routes/RoutesEISCMetaverse";

const Experience = () => {
  return (
    <AuthProvider>
      <UserProvider>
        <AvatarProvider>
          <SocketProvider>
            <RoutesEISCMetaverse />
          </SocketProvider>
        </AvatarProvider>
      </UserProvider>
    </AuthProvider>
  );
};

export default Experience;
