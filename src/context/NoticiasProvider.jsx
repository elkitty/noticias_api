import axios from "axios";
import { useState, useEffect, createContext } from "react";

const NoticiasContext = createContext();

const NoticiasProvider = ({ children }) => {
  const [categoria, setCategoria] = useState("technology");
  const [pais, setPais] = useState("us");
  const [noticias, setNoticias] = useState([]);
  const [pagina, setPagina] = useState(1);
  const [totalNoticias, setTotalNoticias] = useState(0);
  const [totalPaginas, setTotalPaginas] = useState(0); // Agrega esta línea
  const [isLoading, setIsLoading] = useState(true);

  const cargarNoticiasIniciales = async () => {
    try {
      setIsLoading(true);
      const url = `https://newsapi.org/v2/top-headlines?country=${pais}&category=${categoria}&pageSize=10&apiKey=${
        import.meta.env.VITE_API_KEY
      }`;

      const { data } = await axios(url);
      setNoticias(data.articles);
      setTotalNoticias(data.totalResults);
      setTotalPaginas(Math.ceil(data.totalResults / 50)); // Calcula el total de páginas
      setIsLoading(false);
    } catch (error) {
      console.error("Error al cargar las noticias iniciales:", error);
      setIsLoading(false);
    }
  };

  const consultarApi = async (page) => {
    const url = `https://newsapi.org/v2/top-headlines?country=${pais}&page=${page}&category=${categoria}&pageSize=10&apiKey=${
      import.meta.env.VITE_API_KEY
    }`;

    try {
      const { data } = await axios(url);
      setNoticias(data.articles);
      setTotalNoticias(data.totalResults);
      setTotalPaginas(Math.ceil(data.totalResults / 50)); // Calcula el total de páginas
      setIsLoading(false);
    } catch (error) {
      console.error("Error al consultar la API:", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    cargarNoticiasIniciales();
  }, [categoria, pais]);

  useEffect(() => {
    consultarApi(pagina);
  }, [pagina]);

  const handleChangeCategoria = (e) => {
    setCategoria(e.target.value);
    setPagina(1); // Reiniciar la página al cambiar la categoría
  };

  const handleChangePais = (e) => {
    setPais(e.target.value);
    setPagina(1); // Reiniciar la página al cambiar el país
  };

  const handleChangePagina = (e, valor) => {
    setPagina(valor);
  };

  useEffect(() => {
    // Desplázate hacia arriba al cambiar de página
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pagina]);

  return (
    <NoticiasContext.Provider
      value={{
        categoria,
        handleChangeCategoria,
        noticias,
        totalNoticias,
        handleChangePagina,
        handleChangePais,
        pagina,
        pais,
        isLoading,
        totalPaginas,
      }}
    >
      {children}
    </NoticiasContext.Provider>
  );
};

export { NoticiasProvider };
export default NoticiasContext;
