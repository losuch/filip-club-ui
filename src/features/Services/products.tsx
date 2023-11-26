import { useNavigate } from 'react-router-dom';
import { removeLocalInfo } from '../../lib/util';
import Layout from '../../components/Layout/Layout';

const Products = () => {
  const navigate = useNavigate();
  return (
    <Layout>
      <div>
        <button
          onClick={() => {
            removeLocalInfo();
            navigate('/');
          }}
        >
          Logout
        </button>
      </div>
    </Layout>
  );
};

export default Products;
