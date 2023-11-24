import React, { useContext } from 'react';
import Snackbar from '@mui/material/Snackbar';
import { Theme } from '@mui/material/styles';
import makeStyles from '@mui/styles/makeStyles';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import NotificationContext, { defaultAlertProps } from './context';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    zIndex: 99999,
    // width: "100%",
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Index = () => {
  const classes = useStyles();

  const { alert, setAlert } = useContext(NotificationContext);

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }
    setAlert(defaultAlertProps);
  };
  return (
    <div>
      {' '}
      <Snackbar
        open={alert.open}
        autoHideDuration={1000}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        data-testid={alert.message}
        className={classes.root}
      >
        <Alert
          onClose={handleClose}
          severity={alert.error ? 'error' : 'success'}
          style={{ width: '100%' }}
        >
          {alert.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Index;
