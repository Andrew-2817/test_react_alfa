import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Layout, Typography } from 'antd';
import { store } from './store';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import CreateProduct from './pages/CreateProduct';
import EditProduct from './pages/EditProduct';

const { Header, Content } = Layout;
const { Title } = Typography;

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <Layout style={{ minHeight: '100vh' }}>
          <Header style={{ display: 'flex', alignItems: 'center' }}>
            <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>
              <Title level={3} style={{ color: 'white', margin: 0 }}>
                Product Store
              </Title>
            </Link>
          </Header>
          <Content>
            <Routes>
              <Route path="/" element={<Products />} />
              <Route path="/products" element={<Products />} />
              <Route path="/products/:id" element={<ProductDetail />} />
              <Route path="/create-product" element={<CreateProduct />} />
              <Route path="/edit-product/:id" element={<EditProduct />} />
            </Routes>
          </Content>
        </Layout>
      </Router>
    </Provider>
  );
};

export default App; 