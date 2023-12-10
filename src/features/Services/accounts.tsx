import Typography from '@mui/material/Typography';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AccountTable from '../../components/Account/AccountTable';
import Layout from '../../components/Layout/Layout';
import { fetchAccounts } from '../../lib/filipclubApi';
import { accountServiceType } from '../../types/types';
import useAuthContext from '../Auth/authContext';

const Accounts = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [accessToken, setAccessToken] = useAuthContext();
  const [accounts, setAccounts] = useState(Array<accountServiceType>);

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
        {!loading && <AccountTable accounts={accounts} />}
      </div>
    </Layout>
  );
};

export default Accounts;
