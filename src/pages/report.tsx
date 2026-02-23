import { Download, Printer, Calendar, ChevronDown } from "lucide-react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useRef } from "react";
import { calcValorTotal } from "../utils/calcValor";
import { useProducts } from "../hook/useProduct";
import { useMovementsContext } from "../hook/useMovements";
import { calcEstoque } from "../utils/calcEstoque";
import CardAlertaEstoque from "../components/dashboard/CardAlertaEstoque";
import CardTopEstoque from "../components/report/cardTopEstoque";
export default function ReportPage() {
  const { products } = useProducts();
  const { movements } = useMovementsContext();
  const targetPDFRef = useRef<HTMLDivElement>(null);

  async function handleDownload() {
    if (!targetPDFRef.current) return;

    const canvas = await html2canvas(targetPDFRef.current, {
      scale: 2,
      useCORS: true,
      backgroundColor: "#ffffff",

      onclone: (clonedDoc) => {
        const root = clonedDoc.body;

        root.querySelectorAll("*").forEach((el) => {
          const element = el as HTMLElement;

          // REMOVE qualquer cor OKLCH
          element.style.backgroundColor = "#ffffff";
          element.style.color = "#000000";
          element.style.borderColor = "#e5e7eb";

          // REMOVE efeitos que quebram PDF
          element.style.boxShadow = "none";
          element.style.backdropFilter = "none";
          element.style.filter = "none";
        });
      },
    });

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("relatorio.pdf");
  }

  const qntMoveSaida = movements.filter((movement) => movement.tipo == "saida");

  const qntMoveEntrada = movements.filter(
    (movement) => movement.tipo == "entrada"
  );
  const valorEntradaProdutos = movements
    .filter((m) => m.tipo === "entrada")
    .reduce((soma, m) => soma + m.quantidade, 0);

  const valorSaidaProdutos = movements
    .filter((m) => m.tipo === "saida")
    .reduce((soma, m) => soma + m.quantidade, 0);

  const saldoMovements = valorEntradaProdutos - valorSaidaProdutos;

  const estoque = calcEstoque(products, movements);

  const produtoMaiorEstoque = products
    .map((product) => {
      const produtosEstoqe = estoque.find(
        (est) => est.produto === product.nome
      );
      if (!produtosEstoqe) return null;
      return {
        id: product.id,
        nome: product.nome,
        qnt: produtosEstoqe.quantidade,
        estoque_min: product.estoque_minimo,
      };
    })
    .filter(
      (
        p
      ): p is {
        id: string;
        nome: string;
        qnt: number;
        estoque_min: number;
      } => p !== null
    );

  console.log("produtos com maior estoque", produtoMaiorEstoque);

  const produtosEmAlerta = products.filter((item) => {
    const estoqueProduto = estoque.find((e) => e.produto === item.nome);
    if (!estoqueProduto) return false;
    return estoqueProduto.quantidade <= item.estoque_minimo;
  });
  return (
    <div ref={targetPDFRef}>
      <header className=" flex justify-between items-start ">
        <div className="mb-8">
          <h2 className="font-bold text-2xl pb-2">Relatórios</h2>
          <p className="text-sm">
            Visualize e exporte relatórios do seu estoque
          </p>
        </div>
        <div className="items-center flex gap-2">
          <div className="border border-gray-300 py-1 px-1 flex justify-between items-center gap-4 text-sm rounded">
            <span className="p-1">
              <Calendar size={16} />
            </span>
            <span className="p-1">Este mês</span>
            <span className="p-1">
              <ChevronDown size={16} />
            </span>
          </div>
          <div className="border-gray-300 border py-1 px-4 flex items-center gap-2 text-sm font-semibold rounded">
            <button onClick={handleDownload} className="flex items-center">
              <span className="p-1">
                <Printer size={16} />
              </span>
              <span className="p-1">Imprimir</span>
            </button>
          </div>
          <div className="border py-1 px-2 flex items-center gap-4 text-sm font-bold bg-[#7557A5] text-white rounded">
            <span className="p-1">
              <Download size={16} />
            </span>
            <span className="p-1">Exportar CSV</span>
          </div>
        </div>
      </header>
      <section className="grid grid-cols-1 sm:grid-cols-4 gap-2">
        <div className="p-4 rounded flex flex-col shadow-lg bg-white/80 backdrop-blur-2xl">
          <div className="flex flex-col p-2">
            <span className="text-sm">Valor Total em Estoque</span>
            <span className="font-bold text-xl mt-4">
              R$ {calcValorTotal(movements, products)}
            </span>
          </div>
        </div>
        {/* */}

        <div className="bg-white/80 backdrop-blur-2xl p-4 rounded flex flex-col">
          <div className="flex flex-col p-2">
            <span className="text-sm">Total de Produtos</span>
            <span className="font-bold text-xl mt-4">{products.length}</span>
          </div>
        </div>
        {/**/}
        <div className="bg-white/80 backdrop-blur-2xl p-4 rounded flex flex-col">
          <div className="flex flex-col p-2">
            <span className="text-sm">Produtos com estoque baixo</span>
            <span className="font-bold text-xl mt-4">
              {produtosEmAlerta.length}
            </span>
          </div>
        </div>

        {/**/}
        <div className="p-4 rounded flex flex-col bg-white/80 backdrop-blur-2xl">
          <div className="flex flex-col p-2">
            <span className="text-[16px]">Movimentação no Período</span>
            <span className="font-bold text-xl mt-4">{movements.length}</span>
          </div>
        </div>
      </section>
      <section className="py-6 rounded  grid grid-cols-1 sm:grid-cols-2 gap-4   ">
        <div className="p-4 rounded  py-6 flex flex-col gap-2 bg-white/80 backdrop-blur-2xl">
          <h3 className="font-bold text-2xl">Resumo de Movimentações</h3>
          <div className="mt-4 shadow-lg bg-green-100 rounded p-2 flex justify-between px-4 items-center">
            <div className=" flex flex-col">
              <span className="font-bold text-green-500">Entradas</span>
              <span className="font-light text-gray-500">
                {qntMoveEntrada.length} movimentações
              </span>
            </div>
            <div className="font-bold text-lg text-green-500">
              +{valorEntradaProdutos}
            </div>
          </div>
          {/*** */}
          <div className="shadow-lg bg-red-100 rounded p-2 flex justify-between px-4 items-center">
            <div className=" flex flex-col">
              <span className="font-bold text-red-500">Saidas</span>
              <span className="font-light text-gray-500">
                {qntMoveSaida.length} movimentações
              </span>
            </div>
            <div className="text-lg font-bold text-red-500">
              -{valorSaidaProdutos}
            </div>
          </div>

          <div className="flex rounded justify-between shadow-lg p-4 items-center">
            <span>Saldo do Periodo</span>
            <span className="text-3xl">{saldoMovements}</span>
          </div>
        </div>

        {/**                                    */}
        <div className="rounded p-4 bg-white/80 backdrop-blur-2xl py-6 flex flex-col gap-2">
          <h3 className="mb-4 font-bold text-2xl">
            Produtos com maior estoque
          </h3>
          {/* <div className=" shadow-lg bg-green-100 rounded p-2 flex justify-between px-4 items-center">
            <div className=" flex flex-row gap-4 items-center">
              <span className="bg-red-500 rounded-full p-1 px-2.5 font-bold text-sm">
                1
              </span>
              <span className="font-bold text-green-500">Carlos</span>
            </div>

            <div className="font-bold text-lg text-green-500">+0</div>
          </div> */}
          {produtoMaiorEstoque
            .sort((a, b) => b.qnt - a.qnt)
            .slice(0, 3)
            .map((produto) => (
              <CardTopEstoque
                key={produto.id}
                nome={produto.nome}
                estoqueProduto={produto.qnt}
                estoque_minimo={produto.estoque_min}
              />
            ))}
        </div>
      </section>
    </div>
  );
}
