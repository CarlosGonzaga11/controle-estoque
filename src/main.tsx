import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ProductProvider } from "./context/useProductContext.tsx";
import { FornecedorProvider } from "./context/useFornecedorContext.tsx";
import { MovementsProvider } from "./context/useMovementsContext.tsx";
import { CategorieProvider } from "./context/useCategoryContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ProductProvider>
      <FornecedorProvider>
        <MovementsProvider>
          <CategorieProvider>
            <App />
          </CategorieProvider>
        </MovementsProvider>
      </FornecedorProvider>
    </ProductProvider>
  </StrictMode>
);
