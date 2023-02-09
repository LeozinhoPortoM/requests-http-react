import "./style.css";

export default function Form({ values, handleChangeValue, handleSave }) {
  return (
    <fieldset>
      <legend>Cadastrar produto</legend>
      <form onSubmit={handleSave}>
        <label>
          Nome:
          <input
            type="text"
            name="name"
            value={values.name}
            onChange={handleChangeValue}
          />
        </label>
        <label>
          Preço:
          <input
            type="number"
            name="price"
            value={values.price}
            onChange={handleChangeValue}
          />
        </label>
        <input type="submit" value="Salvar" />
      </form>
    </fieldset>
  );
}
