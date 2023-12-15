import Typography from '@mui/material/Typography';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AccountTable from '../../components/Account/AccountTable';
import Layout from '../../components/Layout/Layout';
import {
  createNewAccount,
  fetchAccounts,
  updateAccount,
} from '../../lib/filipclubApi';
import { accountServiceType } from '../../types/types';
import useAuthContext from '../Auth/authContext';
import NewAccountForm from '../../components/Account/NewAccountForm';
import UpdateAccountForm from '../../components/Account/UpdateAccountForm';

const Accounts = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [accessToken, setAccessToken] = useAuthContext();
  const [accounts, setAccounts] = useState(Array<accountServiceType>);
  const [openNewAccountForm, setOpenNewAccountForm] = useState(false);
  const [openUpdateAccountForm, setOpenUpdateAccountForm] = useState(false);
  // const [accountDetailsTitel, setAccountDetailsTitel] = useState('');
  const [accountDetails, setAccountDetails] = useState({
    accountId: 0,
    email: '',
    password: '',
    role: '',
  });

  const handlerFetchAccounts = useCallback(async () => {
    setLoading(true);
    const res = await fetchAccounts(atob(accessToken));
    if (res.error) {
      setLoading(false);
      return;
    }
    setAccounts(res.accounts);
    setLoading(false);
  }, [accessToken]);

  useEffect(() => {
    if (accessToken !== '') {
      handlerFetchAccounts();
    }
  }, [accessToken, handlerFetchAccounts]);

  const handleOnCreateNewAccount = () => {
    setOpenNewAccountForm(true);
  };

  const handleOnEditAccount = (a: accountServiceType) => {
    setOpenUpdateAccountForm(true);
    setAccountDetails({
      accountId: a.accountId,
      email: a.email,
      password: '',
      role: a.role,
    });
  };

  const handleOnCancel = () => {
    setAccountDetails({
      accountId: 0,
      email: '',
      password: '',
      role: '',
    });
    setOpenNewAccountForm(false);
    setOpenUpdateAccountForm(false);
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAccountDetails((D: any) => ({ ...D, [e.target.id]: e.target.value }));
  };

  const hadleOnSaveNewAccount = useCallback(async (a: accountServiceType) => {
    const res = await createNewAccount(a, atob(accessToken));
    if (res.error) {
      return;
    }
    setOpenNewAccountForm(false);
    setAccountDetails({
      accountId: 0,
      email: '',
      password: '',
      role: '',
    });
    handlerFetchAccounts();
  }, []);

  const hadleOnSaveUpdateAccount = useCallback(
    async (a: accountServiceType) => {
      const res = await updateAccount(a, atob(accessToken));
      if (res.error) {
        return;
      }
      setOpenUpdateAccountForm(false);
      setAccountDetails({
        accountId: 0,
        email: '',
        password: '',
        role: '',
      });
      handlerFetchAccounts();
    },
    []
  );

  return (
    <Layout>
      <div>
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
            marginBottom: 3,
          }}
        >
          ACCOUNTS
        </Typography>
        {openNewAccountForm && (
          <NewAccountForm
            open={openNewAccountForm}
            account={accountDetails}
            onCancel={handleOnCancel}
            onSave={hadleOnSaveNewAccount}
            onChange={handleOnChange}
            titel="New Account"
          />
        )}
        {openUpdateAccountForm && (
          <UpdateAccountForm
            open={openUpdateAccountForm}
            account={accountDetails}
            onCancel={handleOnCancel}
            onSave={hadleOnSaveUpdateAccount}
            onChange={handleOnChange}
            titel="Edit Account"
          />
        )}
        {!loading && (
          <AccountTable
            accounts={accounts}
            onCreateNewAccount={handleOnCreateNewAccount}
            onEditAccount={handleOnEditAccount}
          />
        )}
      </div>
    </Layout>
  );
};

export default Accounts;
