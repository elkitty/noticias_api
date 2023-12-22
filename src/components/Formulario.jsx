import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Box,
} from "@mui/material";
import useNoticias from "../hooks/useNoticias";

const CATEGORIAS = [
  { value: "general", label: "General" },
  { value: "business", label: "Negocios" },
  { value: "entertainment", label: "Entretenimiento" },
  { value: "health", label: "Salud" },
  { value: "science", label: "Ciencia" },
  { value: "sports", label: "Deportes" },
  { value: "technology", label: "Tecnología" },
];

const PAISES = [
  { value: "us", label: "Estados Unidos" },
  { value: "gb", label: "Inglaterra" },
  { value: "ar", label: "Argentina" },
  { value: "br", label: "Brasil" },
];

const Formulario = () => {
  const { categoria, pais, handleChangeCategoria, handleChangePais } =
    useNoticias();

  return (
    <form>
      <FormControl sx={{ m: 1 }}>
        <InputLabel>Categoría</InputLabel>
        <Select
          label="Categoría"
          onChange={handleChangeCategoria}
          value={categoria}
          sx={{ width: "100%" }}
          // sx={{ width: "100%" }}
        >
          {CATEGORIAS.map((categoria) => (
            <MenuItem key={categoria.value} value={categoria.value}>
              {categoria.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl sx={{ m: 1 }}>
        <InputLabel>País</InputLabel>
        <Select
          label="País"
          onChange={handleChangePais}
          value={pais}
          sx={{ width: "100%" }}
          // sx={{ width: "100%" }}
        >
          {PAISES.map((pais) => (
            <MenuItem key={pais.value} value={pais.value}>
              {pais.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {/* Agrega el botón según sea necesario */}
      {/* <Box sx={{ flex: 1, marginTop: 2 }}>
          <Button fullWidth variant="contained" color="primary">
            Buscar Noticias
          </Button>
        </Box> */}
    </form>
  );
};

export default Formulario;
