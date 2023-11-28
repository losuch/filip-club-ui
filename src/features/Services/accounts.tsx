import { useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Layout from '../../components/Layout/Layout';

const Accounts = () => {
  const navigate = useNavigate();
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
          }}
        >
          ACCOUNTS
        </Typography>
      </div>
    </Layout>
  );
};

export default Accounts;
