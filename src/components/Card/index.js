import "./style.css";

export default function Card({ product }) {
  return (
    <div className="card">
      <h1>{product.name}</h1>
      <h4>R$: {product.price}</h4>
    </div>
  );
}
