import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import DashboardPage from "./pages/dashboard";
import AppLayout from "./components/layout/applayout";
import ProductsPage from "./pages/products";
import MovementsPage from "./pages/movements";
import CategoriesPage from "./pages/categories";
import FornecedorPage from "./pages/fornecedor";
import AlertaPage from "./pages/alerta";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="products" element={<ProductsPage />} />
          <Route path="movements" element={<MovementsPage />} />
          <Route path="categories" element={<CategoriesPage />} />
          <Route path="fornecedor" element={<FornecedorPage />} />
          <Route path="alerta" element={<AlertaPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
