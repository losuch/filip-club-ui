import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import React, { useState } from 'react';
import { accountServiceType } from '../../types/types';

const UpdateAccountForm = (props: {
  account: accountServiceType;
  open: boolean;
  onCancel: any;
  onSave: any;
  onChange: any;
  onDelete: any;
  titel: string;
}) => {
  const [repeatePassword, setRepeatePassword] = useState('');
  const [repeatePasswordError, setRepeatePasswordError] = useState(false);
  const handleOnChangeRepeatePassword = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRepeatePassword(e.target.value);
  };
  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (props.account.password === repeatePassword) {
      setRepeatePasswordError(false);
      props.onSave(props.account);
    } else {
      console.log('unmatch password');
      setRepeatePasswordError(true);
    }
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    props.onChange(e);
  };
  const handleClose = () => {
    props.onCancel();
  };

  const handleDeleteButton = () => {
    props.onDelete(props.account.accountId);
  };

  return (
    <React.Fragment>
      <Dialog open={props.open} onClose={handleClose}>
        <form onSubmit={handleSubmit}>
          <DialogTitle>{props.titel}</DialogTitle>
          <DialogContent>
            <TextField
              margin="normal"
              id="email"
              label="E-Mail"
              type="email"
              fullWidth
              variant="standard"
              value={props.account.email}
              disabled
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              id="password"
              label="New Password"
              type="password"
              fullWidth
              variant="standard"
              value={props.account.password}
              inputProps={{ minLength: 6 }}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              id="repeatePassword"
              label="Repeate Password"
              type="password"
              fullWidth
              variant="standard"
              value={repeatePassword}
              error={repeatePasswordError}
              onChange={handleOnChangeRepeatePassword}
            />
            <TextField
              margin="normal"
              id="role"
              label="Role"
              type="text"
              fullWidth
              variant="standard"
              value={props.account.role}
              required
              onChange={handleChange}
            />
          </DialogContent>
          <DialogActions>
            <Button
              onClick={handleDeleteButton}
              variant="contained"
              color="error"
              sx={{ position: 'absolute', left: 8 }}
            >
              Delete
            </Button>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit" variant="contained">
              Save
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </React.Fragment>
  );
};

export default UpdateAccountForm;
