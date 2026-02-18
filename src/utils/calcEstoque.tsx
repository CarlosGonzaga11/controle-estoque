//
import type { Product } from "../types/Product";
import type { MovementsProps } from "../types/Movements";

export function calcEstoque(products: Product[], movements: MovementsProps[]) {
  return products.map((product) => {
    const saldo = movements.reduce((total, move) => {
      if (move.produto !== product.nome) return total;

      return move.tipo === "saida"
        ? total - move.quantidade
        : total + move.quantidade;
    }, 0);

    return {
      produto: product.nome,
      quantidade: product.quantidade + saldo,
    };
  });
}
