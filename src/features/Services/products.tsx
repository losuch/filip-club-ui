import { useNavigate } from 'react-router-dom';
import { removeLocalInfo } from '../../lib/util';

const Products = () => {
  const navigate = useNavigate();
  return (
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
  );
};

export default Products;
