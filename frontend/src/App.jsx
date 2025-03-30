import Wallet from "./components/Wallet";
import Home from "./pages/Home";
import { BrowserRouter,Routes,Route, Navigate } from "react-router-dom";
import useWeb3Store from "./store/web3Store";
import Navbar from "./components/Navbar";
function App() {
  const web3State = useWeb3Store();
  const {selectedAccount} = web3State;
  return (
    <>
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path="/" element={!selectedAccount ? <Wallet /> : <Navigate to="/home" />} />
          <Route path="/home" element={selectedAccount ? <Home /> : <Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
