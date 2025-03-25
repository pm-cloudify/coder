import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import AppRouter from "./router/AppRouter";

function App() {
  return (
    <div className="second-layer-body">
      <AuthProvider>
        <BrowserRouter>
          <AppRouter></AppRouter>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
