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
          <Route
            path="/edit-phone/:id"
            element={<CreatePhone isEdit={true} />}
          />
        </Routes>
      </HashRouter>
    </PhoneProvider>
  );
}

export default App;
