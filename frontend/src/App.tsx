import { HashRouter, Route, Routes } from "react-router-dom";
import { PhoneProvider } from "./context/phone-context";
import { CreatePhone } from "./pages/create-phone";
import { ListPhones } from "./pages/list-phones";
function App() {
  return (
    <PhoneProvider>
      <HashRouter>
        <Routes>
          <Route path="/" element={<ListPhones />} />
          <Route path="/add-phone" element={<CreatePhone />} />
        </Routes>
      </HashRouter>
    </PhoneProvider>
  );
}

export default App;
