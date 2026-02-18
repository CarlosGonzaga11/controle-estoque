import type { MovementsProps } from "../types/Movements";
import type { Product } from "../types/Product";

export function calcValorUnit(
  movements: MovementsProps[],
  products: Product[]
) {
  return products.map((product) => {
    const y = movements.reduce((total, move) => {
      if (product.nome !== move.produto) return total;

      if (move.tipo === "saida") {
        return total - move.quantidade;
      }
      if (move.tipo === "entrada") {
        return total + move.quantidade;
      }
      console.log("total", total);
      return total;
    }, 0);
    const finalQuantidade = product.quantidade + y;
    const finalValor = finalQuantidade * product.preco_c;
    console.log(`Produto: ${product.nome}`);
    console.log("Quantidade Final:", finalQuantidade);
    console.log("Valor Final em Estoque:", finalValor);
    return {
      ...product,
      quantidade: finalQuantidade,
      valorTotal: finalValor,
    };
  });
}

export function calcValorTotal(
  movements: MovementsProps[],
  products: Product[]
) {
  const total = calcValorUnit(movements, products);
  const somaTudo = total.reduce((total, valor) => {
    return total + valor.preco_c * valor.quantidade;
  }, 0);
  console.log("total", somaTudo);
  return somaTudo;
}

// produto A = {

//   nome: Carlos,
//   valor: 10,
//   quantidade: 5
// }
// movimento = {
//   produto : Carlos,
//   quantidade : 5,
//   tipo: entrada
// }
// movimento = {
//   produto : Carlos,
//   quantidade : 5,
//   tipo: saida
// }
