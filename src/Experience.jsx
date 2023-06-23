import { AuthProvider } from "./context/authContext";
import RoutesEISCMetaverse from "./routes/RoutesEISCMetaverse";	

const Experience = () => {
  return (
    <AuthProvider>
      <RoutesEISCMetaverse/>
    </AuthProvider>
  )
}

export default Experience;
