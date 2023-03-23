import { BrowserRouter, Link, Route, Routes } from "react-router-dom"
import Header from "./components/Header"
import Menu from "./components/Menu/Menu"
import Explore from "./pages/Explore"
import Home from "./pages/Home"
import NotFound from "./pages/NotFound"

function App() {
  return (
    <BrowserRouter>
      <Header />
      <main className="bg-darkblue-sub">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Menu />
    </BrowserRouter>
  )
}

export default App
