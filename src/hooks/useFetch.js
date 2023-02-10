import { useState, useEffect } from "react";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const useFetch = (url) => {
  const [data, setData] = useState(null);

  const [config, setConfig] = useState(null);
  const [method, setMethod] = useState(null);
  const [callFetch, setCallFetch] = useState(false);

  const [itemId, setItemId] = useState(null);
  const [loading, setLoading] = useState(false);

  const httpConfig = (data, method) => {
    if (method === "POST") {
      setConfig({
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      setMethod(method);
    } else if (method === "DELETE") {
      setConfig({
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      setMethod(method);
      setItemId(data);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        const res = await fetch(url);
        const json = await res.json();
        setData(json);
      } catch (error) {
        console.log(error.message);
        toast.error("Erro ao carregar a página")
      }

      setLoading(false);
    };

    fetchData();
  }, [url, callFetch]);

  useEffect(() => {
    const httpRequest = async () => {
      let json;
      if (method === "POST") {
        try {
          let fetchOptions = [url, config];

          const res = await fetch(...fetchOptions);
          json = await res.json();
          toast.success("Salvo com sucesso");
        } catch (error) {
          console.log(error.message);
          toast.error("Erro ao salvar");
        }
      }
      if (method === "DELETE") {
        try {
          const deleteUrl = `${url}/${itemId}`;
          const res = await fetch(deleteUrl, config);
          json = await res.json();
          toast.success("Deletado com sucesso");
        } catch (error) {
          toast.error("Erro ao deletar");
        }
      }
      setCallFetch(json);
    };

    httpRequest();
  }, [config, method, url, itemId]);

  return { data, httpConfig, loading };
};
