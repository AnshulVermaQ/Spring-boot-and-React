import { Route, Routes, useLocation } from "react-router-dom"
import MenuBar from "./components/MenuBar"
import DashBoard from "./pages/Dashboard/DashBoard"
import ManageCategory from "./pages/ManageCategory/ManageCategory"
import ManageUsers from "./pages/ManageUsers/ManageUsers"
import ManageItems from "./pages/ManageItems/ManageItems"
import Explore from "./pages/Explore/Explore"
import { Toaster } from "react-hot-toast"
import Login from "./pages/login/Login"
import OrderHistory from "./pages/OrderHistory/OrderHistory"

const App = () => {

  const location = useLocation();

  return (


    <div>

      {location.pathname!== '/login' && <MenuBar/>}

      <Routes>

        <Route path="/dashboard" element={<DashBoard/>} />
        <Route path="/category" element={<ManageCategory/>} />
        <Route path="/users" element={<ManageUsers/>} />
        <Route path="/items" element={<ManageItems/>} />
        <Route path="/explore" element={<Explore/>} />
        <Route path="/" element={<DashBoard/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/orders" element={<OrderHistory/>} />
        
      </Routes>
      <Toaster/>
    </div>
  )
}

export default App
