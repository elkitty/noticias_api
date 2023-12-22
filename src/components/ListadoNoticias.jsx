import { Grid, Typography } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import useNoticias from "../hooks/useNoticias";
import Noticia from "../components/noticia";

const ListadoNoticias = () => {
  const { noticias, totalNoticias, handleChangePagina, pagina } = useNoticias();

  const totalPaginas = Math.ceil(totalNoticias / 10); // Cambia el divisor a 10

  // Filtrar las noticias para excluir aquellas con la URL "https://removed.com"
  const noticiasFiltradas = noticias ? noticias.filter(noticia => noticia.url !== 'https://removed.com') : [];

  return (
    <>
      <Typography
        textAlign={"center"}
        marginY={5}
        variant="h4"
        component={"h3"}
      >
        Últimas Noticias
      </Typography>
      <Grid container spacing={2}>
        {noticiasFiltradas.map((noticia) => (
          <Noticia key={noticia.url} noticia={noticia} />
        ))}
      </Grid>

      <Stack
        sx={{
          marginY: 5,
        }}
        spacing={2}
        direction={"row"}
        justifyContent={"center"}
        alignItems="center"
      >
        <Pagination
          count={isNaN(totalPaginas) ? 1 : totalPaginas}
          color="primary"
          onChange={handleChangePagina}
          page={pagina}
        />
      </Stack>
    </>
  );
};

export default ListadoNoticias;
