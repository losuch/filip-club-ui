import { Card, CardActions, CardContent, Grid } from '@mui/material';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import React, { useState } from 'react';
import useAuthContext from '../../features/Auth/authContext';
import { hasUserAdminRole } from '../../lib/util';
import { filmServiceType } from '../../types/types';

const FilmItem = (props: {
  film: filmServiceType;
  onEdit: any;
  onDelete: any;
}) => {
  const [film, setFilm] = useState(props.film);
  const [accessToken, setAccessToken] = useAuthContext();

  const handleOnEdit = () => {
    props.onEdit(film);
  };

  const handleOnDelete = () => {
    props.onDelete(film.filmId, film.name);
  };

  return (
    <Grid item key={film.filmId} xs={12} sm={6} md={6}>
      <Card
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography gutterBottom variant="h5" component="h2">
            {film.name}
          </Typography>
          <div style={{ padding: 20 }}>
            <iframe
              title={film.name}
              src={film.ytLink}
              loading="eager"
              allowFullScreen
              width="100%"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            ></iframe>
          </div>
        </CardContent>
        <CardActions>
          {hasUserAdminRole(accessToken) && (
            <React.Fragment>
              <Button size="small" variant="contained" onClick={handleOnEdit}>
                Edit
              </Button>
              <Button
                size="small"
                variant="outlined"
                color="error"
                onClick={handleOnDelete}
              >
                Delete
              </Button>
            </React.Fragment>
          )}
        </CardActions>
      </Card>
    </Grid>
  );
};

export default FilmItem;
