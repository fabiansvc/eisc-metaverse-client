import { AuthProvider } from "./context/authContext";
import { AvatarProvider } from "./context/avatarContext";
import RoutesEISCMetaverse from "./routes/RoutesEISCMetaverse";	

const Experience = () => {
  return (
    <AuthProvider>
      <AvatarProvider>
        <RoutesEISCMetaverse/>
      </AvatarProvider>
    </AuthProvider>
  )
}

export default Experience;
