import { Button } from '@mui/material';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useState } from 'react';
import { accountServiceType } from '../../types/types';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

const AccountTable = (props: {
  accounts: Array<accountServiceType>;
  onCreateNewAccount: any;
  onEditAccount: any;
}) => {
  const [accounts, setAccounts] = useState(props.accounts);
  const [accountDetails, setAccountDetails] = useState({
    accoundId: 0,
    email: '',
    role: '',
  });

  const hadleNewAccountButton = () => {
    props.onCreateNewAccount();
  };

  const handleEditAccountButton = (a: accountServiceType) => {
    props.onEditAccount(a);
  };
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Id</TableCell>
            <TableCell align="left">E-Mail</TableCell>
            <TableCell align="left">Role</TableCell>
            <TableCell align="right">
              <Button onClick={hadleNewAccountButton} variant="outlined">
                New Account
              </Button>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {accounts.map((row: accountServiceType) => (
            <TableRow
              key={row.accountId}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.accountId}
              </TableCell>
              <TableCell align="left">{row.email}</TableCell>
              <TableCell align="left">{row.role}</TableCell>
              <TableCell align="right">
                <Button
                  onClick={() => {
                    handleEditAccountButton(row);
                  }}
                >
                  <OpenInNewIcon />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default AccountTable;
