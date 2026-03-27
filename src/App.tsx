import { Route, Routes } from "react-router-dom";
import ClientLayout from "./layouts/ClientLayout";
import Home from "./pages/client/Home";
import Product from "./pages/client/Product";
import ProductDetail from "./pages/client/ProductDetail";
import AdminLayout from "./layouts/AdminLayout";
import Admin from "./pages/admin/Admin";
import AdminProduct from "./pages/admin/AdminProduct";
import ProductAdd from "./pages/admin/ProductAdd";
import Register from "./pages/client/Register";
import Login from "./pages/client/Login";
import Cart from "./pages/client/Cart";
import Contact from "./pages/client/Contact";
import ProductEdit from "./pages/admin/ProductEdit";
import Wishlist from "./pages/client/Wishlist";
import AdminUsers from "./pages/admin/AdminUsers";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<ClientLayout />}>
          <Route index element={<Home />} />
          <Route path="product" element={<Product />} />
          <Route path="product/:id" element={<ProductDetail />} />
          <Route path="cart" element={<Cart />} />
          <Route path="wishlist" element={<Wishlist />} />
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
          <Route path="contact" element={<Contact />} />
        </Route>

        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Admin />} />
          <Route path="product" element={<AdminProduct />} />
          <Route path="product/add" element={<ProductAdd />} />
          <Route path="product/edit/:id" element={<ProductEdit />} />
          <Route path="users" element={<AdminUsers />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
