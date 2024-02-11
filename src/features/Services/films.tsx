import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import FilmItem from '../../components/Film/FilmItem';
import FilmForm from '../../components/Film/FilmForm';
import React, { useCallback, useEffect, useState } from 'react';
import Layout from '../../components/Layout/Layout';
import {
  fetchFilms,
  createNewFilm,
  updateFilm,
  removeFilm,
} from '../../lib/filipclubApi';
import { filmServiceType } from '../../types/types';
import useAuthContext from '../Auth/authContext';
import ConfirmDeleteFilm from '../../components/Film/ConfirmDeleteFilm';
import NewFilmButton from '../../components/Film/NewFilmButton';
import { hasUserAdminRole } from '../../lib/util';

const Films = () => {
  const [films, setFilms] = useState(Array<filmServiceType>());
  const [accessToken, setAccessToken] = useAuthContext();
  const [loading, setLoading] = useState(true);
  const [openEdit, setOpenEdit] = useState(false);
  const [editFilm, setEditFilm] = useState({});
  const [filmFormTitel, setFilmFormTitel] = useState('');
  const [openConfirmDelete, setOpenConfirmDelete] = useState(false);
  const [deleteFilm, setDeleteFilm] = useState({});

  const handlerFetchFilms = useCallback(async () => {
    setLoading(true);
    const res = await fetchFilms(atob(accessToken));
    if (res.error) {
      setLoading(false);
      return;
    }
    // setAccessToken(token);

    setFilms(res.films);
    setLoading(false);
  }, [accessToken]);

  useEffect(() => {
    //  setLoading(true);
    if (accessToken !== '') {
      handlerFetchFilms();
    }
  }, [accessToken, handlerFetchFilms]);

  const handleOnEdit = (p: filmServiceType) => {
    setFilmFormTitel('Edit Film');
    setEditFilm(p);
    setOpenEdit(true);
  };

  const handleOnDelete = (filmId: number, name: string) => {
    setDeleteFilm({ id: filmId, name: name });
    setOpenConfirmDelete(true);
    console.log('Delelete film: ', name);
  };

  const handleOnSaveFilmForm = async (film: filmServiceType) => {
    if (film.filmId === 0) {
      // new film
      console.log('new film');
      const res = await createNewFilm(film, atob(accessToken));
    } else {
      // update film
      console.log('update film');
      const res = await updateFilm(film, atob(accessToken));
    }
    setOpenEdit(false);
    handlerFetchFilms();
  };

  const handleOnCancelFilmForm = () => {
    setOpenEdit(false);
  };

  const handlerNewFilmOnClick = () => {
    setFilmFormTitel('New Film');
    setEditFilm({
      filmId: 0,
      name: '',
      description: '',
      price: 0,
    });
    setOpenEdit(true);
  };

  const handleConfirmDeleteFilm = async (id: number) => {
    console.log('delete film with ID: ', id);
    const resDelete = await removeFilm(id, atob(accessToken));
    setOpenConfirmDelete(false);
    handlerFetchFilms();
  };

  const handleCancelDelete = () => {
    setOpenConfirmDelete(false);
  };

  return (
    <Layout>
      <div>
        {openEdit && (
          <FilmForm
            titel={filmFormTitel}
            key={editFilm.filmId}
            open={openEdit}
            onSave={handleOnSaveFilmForm}
            onCancel={handleOnCancelFilmForm}
            film={editFilm}
          />
        )}
        {openConfirmDelete && (
          <ConfirmDeleteFilm
            open={openConfirmDelete}
            filmName={deleteFilm.name}
            confirmDelete={handleConfirmDeleteFilm}
            cancelDelete={handleCancelDelete}
            filmId={deleteFilm.id}
          />
        )}
        <Typography
          variant="h6"
          sx={{
            mr: 2,

            fontFamily: 'monospace',
            fontWeight: 700,
            letterSpacing: '.3rem',
            color: 'inherit',
            textDecoration: 'none',
            textAlign: 'center',
          }}
        >
          FILMS
        </Typography>
        {!loading && (
          <Container sx={{ py: 8 }} maxWidth="md">
            <Grid container spacing={4}>
              {films.map((film) => (
                <React.Fragment key={film.filmId}>
                  <FilmItem
                    film={film}
                    key={film.filmId}
                    onEdit={handleOnEdit}
                    onDelete={handleOnDelete}
                  />
                </React.Fragment>
              ))}
              {hasUserAdminRole(accessToken) && (
                <NewFilmButton onClick={handlerNewFilmOnClick} />
              )}
            </Grid>
          </Container>
        )}
      </div>
    </Layout>
  );
};

export default Films;
