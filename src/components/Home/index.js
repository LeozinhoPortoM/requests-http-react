import { useEffect, useState } from "react";
import Card from "../Card";
import Form from "../Form";
import "./style.css";

const baseUrl = "http://localhost:3000/products";

const initialState = {
  name: "",
  price: "",
};

export default function Home() {
  const [values, setValues] = useState({ ...initialState });
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(baseUrl);
      const data = await res.json();
      setProducts(data);
    }
    fetchData();
  }, []);

  const handleClear = () => {
    setValues(initialState);
  };

  const handleChangeValue = (value) => {
    setValues((preValue) => ({
      ...preValue,
      [value.target.name]: value.target.value,
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();

    const product = values;

    const res = await fetch(baseUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    });

    const addedProduct = await res.json();
    setProducts((prevProducts) => [...prevProducts, addedProduct]);

    handleClear();
  };

  return (
    <div className="App">
      <h1>Lista de produtos</h1>
      <div className="container">
        {products.map((product) => (
          <Card key={product.id} product={product} />
        ))}
      </div>
      <div className="add-product">
        <Form
          values={values}
          handleSave={handleSave}
          handleChangeValue={handleChangeValue}
        />
      </div>
    </div>
  );
}
