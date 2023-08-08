import { AuthProvider } from "./context/authContext";
import { UserProvider } from "./context/userContext";
import RoutesEISCMetaverse from "./routes/RoutesEISCMetaverse";

const Experience = () => {
  return (
    <AuthProvider>
      <UserProvider>
        <RoutesEISCMetaverse />
      </UserProvider>
    </AuthProvider>
  );
};

export default Experience;
