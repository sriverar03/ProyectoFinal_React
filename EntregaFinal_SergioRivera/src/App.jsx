import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ItemListContainer } from "./components/ItemListContainer";
import { Navbar } from "./components/Navbar";
import { Error404 } from "./components/Error404";
import { ItemDetailContainer } from "./components/ItemDetailContainer";
import { CartItems } from "./components/CartItems";
import CartContextProvider from "./context/CardContext";
import { Footer } from "./components/Footer";

function App() {
  let mensaje = "Esta Página  esta en Construcción..";

  return (
    <CartContextProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path={"/"} element={<ItemListContainer data={mensaje} />} />
          <Route path={"/productos"} element={<ItemListContainer />} />
          <Route path={"/producto/:id"} element={<ItemDetailContainer />} />
          <Route path={"/categoria/:id"} element={<ItemListContainer />} />
          <Route path={"/carrito"} element={<CartItems />} />
          <Route path={"*"} element={<Error404 />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </CartContextProvider>
  );
}

export default App;
