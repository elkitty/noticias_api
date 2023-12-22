import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import placeholderURL from "../images/placeholder_noticas.png";
import { Skeleton } from '@mui/material';

const Noticia = ({ noticia }) => {
  const { author, urlToImage, url, title, description, isLoading } = noticia;

  // Usa el placeholder si urlToImage es falsy o vacío
  const imagenURL = urlToImage || placeholderURL;

  const truncateString = (str, num) => {
    if (typeof str === "string" && str.length > num) {
      return str.slice(0, num) + "...";
    } else {
      return str;
    }
  };

  return (
    <Grid item md={6} lg={4}>
      <Card>
        {!isLoading ? (
          <CardMedia
            component="img"
            alt={`Imagen de la noticia ${title}`}
            image={imagenURL}
            height={"250"}
          />
        ) : (
          <Skeleton variant="rectangular" height={250} animation="wave" />
        )}

        <CardContent>
          <Typography variant="body1" color="error">
            {!isLoading ? author : <Skeleton width={"50%"} animation="wave" />}
          </Typography>
          <Typography variant="h5" component="div">
            {!isLoading ? title : <Skeleton width={"80%"} animation="wave" />}
          </Typography>
          <Typography variant="body2" sx={{ paddingTop: "0.5em" }}>
            {!isLoading ? truncateString(description, 80) : <Skeleton height={40} animation="wave" />}
          </Typography>
        </CardContent>
        <CardActions>
          {!isLoading ? (
            <Link
              href={url}
              target="_blank"
              variant="button"
              color={"primary"}
              width={"100%"}
              textAlign={"center"}
              sx={{ textDecoration: "none" }}
            >
              Leer Noticia
            </Link>
          ) : (
            <Skeleton width={"100%"} height={40} animation="wave" />
          )}
        </CardActions>
      </Card>
    </Grid>
  );
};

export default Noticia;
