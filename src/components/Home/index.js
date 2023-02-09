import "./style.css";

import { useState } from "react";

import { useFetch } from "../../hooks/useFetch";
import Card from "../Card";
import Form from "../Form";

const baseUrl = "http://localhost:3000/products";

const initialState = {
  name: "",
  price: "",
};

export default function Home() {
  const [values, setValues] = useState({ ...initialState });
  const [products, setProducts] = useState([]);

  const { data: items, httpConfig, loading } = useFetch(baseUrl);

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

    httpConfig(product, "POST");

    handleClear();
  };

  return (
    <div className="App">
      <h1>Lista de produtos</h1>
      <div className="container-loader">
        {loading && <div className="loader"></div>}
      </div>
      <div className="container">
        {items &&
          items.map((product) => <Card key={product.id} product={product} />)}
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
