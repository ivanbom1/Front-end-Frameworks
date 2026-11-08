import { useState } from "react";
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import SearchBar from "./components/SearchBar";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import NotFoundPage from "./pages/NotFoundPage";
import { AppProvider } from "./context/AppContext";
import HeaderComponent from "./components/HeaderComp";

const App = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <AppProvider>
    <BrowserRouter>
      <div className="app-layout">
        <HeaderComponent
            searchQuery={searchQuery}
            onChange={setSearchQuery}
          />
        <Routes>
          <Route path="/" element={<HomePage searchQuery={searchQuery} />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </BrowserRouter>
    </AppProvider>
  );
};

export default App;
