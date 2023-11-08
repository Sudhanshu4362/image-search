

import Home from "./pages/home/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PageNotFound from "./pages/404/PageNotFound";
import ImageSearch from "./components/ImageSearch";

function App() {

  return (
    <BrowserRouter>
    <ImageSearch/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>

    </BrowserRouter>
  );
}

export default App;
