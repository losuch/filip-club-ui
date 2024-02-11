import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import React, { useState } from 'react';
import { filmServiceType } from '../../types/types';

const FilmForm = (props: {
  titel: string;
  open: boolean;
  onSave: any;
  onCancel: any;
  film: filmServiceType;
}) => {
  const [open, setOpen] = useState(props.open);
  const [film, setFilm] = useState(props.film);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilm((D) => ({ ...D, [e.target.id]: e.target.value }));
  };

  const handleSave = () => {
    props.onSave(film);
  };

  const handleClose = () => {
    props.onCancel();
  };

  return (
    <React.Fragment>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{props.titel}</DialogTitle>
        <DialogContent>
          <TextField
            margin="normal"
            id="name"
            label="Name"
            type="text"
            fullWidth
            variant="standard"
            value={film.name}
            required
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            id="ytLink"
            label="URL"
            type="text"
            fullWidth
            variant="standard"
            value={film.ytLink}
            required
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave} variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default FilmForm;
