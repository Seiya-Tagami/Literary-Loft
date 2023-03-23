import { BrowserRouter, Link, Route, Routes } from "react-router-dom"
import Header from "./components/Header"
import Menu from "./components/Menu/Menu"
import Explore from "./pages/Explore"
import Home from "./pages/Home"

function App() {
  return (
    <BrowserRouter>
      <Header />
      <main className="bg-darkblue-sub">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
        </Routes>
      </main>
      <Menu />
    </BrowserRouter>
  )
}

export default App
