import Footer from './Footer';
import Nav from './Nav';

const Layout = ({ children }) => {
  return (
    <>
      <Nav />
      <div
        style={{
          padding: '120px 4%',
          height: '100&',
        }}
      >
        {children}
      </div>
      <Footer />
    </>
  );
};

export default Layout;
