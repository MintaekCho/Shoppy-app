import { Outlet } from "react-router-dom";
import { AuthContextProvider } from "./components/context/AuthContextProvider";
import Header from "./components/Header";

function App() {
  return (
    <AuthContextProvider>
      <Header />
      <Outlet />
    </AuthContextProvider>
  );
}

export default App;
