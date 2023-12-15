import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import React, { useState } from 'react';
import { accountServiceType } from '../../types/types';

const NewAccountForm = (props: {
  account: accountServiceType;
  open: boolean;
  onCancel: any;
  onSave: any;
  onChange: any;
  onRoleChange: any;
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

  const handleChangeRole = (e: SelectChangeEvent) => {
    props.onRoleChange(e);
  };

  const handleClose = () => {
    props.onCancel();
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
              required
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              id="password"
              label="Password"
              type="password"
              fullWidth
              variant="standard"
              value={props.account.password}
              required
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
              required
              onChange={handleOnChangeRepeatePassword}
            />
            <FormControl fullWidth sx={{ marginTop: 1 }}>
              <InputLabel id="role" required>
                Role
              </InputLabel>
              <Select
                name="role"
                labelId="role"
                id="role"
                value={props.account.role}
                label="Role"
                variant="standard"
                required
                onChange={handleChangeRole}
              >
                <MenuItem value={'USER'}>USER</MenuItem>
                <MenuItem value={'ADMIN'}>ADMIN</MenuItem>
              </Select>
            </FormControl>
          </DialogContent>
          <DialogActions>
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

export default NewAccountForm;
