import "./style.css";

export default function Card({ product, handleRemove }) {
  return (
    <div className="card">
      <h1>{product.name}</h1>
      <h4>R$: {product.price}</h4>
      <div className="card-button">
        <button>Editar</button>
        <button onClick={() => handleRemove(product.id)}>Excluir</button>
      </div>
    </div>
  );
}
