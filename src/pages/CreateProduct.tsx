import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button, Space, Typography } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import ProductForm from '../components/ProductForm';
import { addProduct } from '../store/productsSlice';
import { ProductFormData } from '../types/product';

const { Title } = Typography;

const CreateProduct: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (values: ProductFormData) => {
    dispatch(addProduct(values));
    navigate('/products');
  };

  return (
    <div style={{ padding: '24px', maxWidth: 600, margin: '0 auto' }}>
      <Space direction="vertical" style={{ width: '100%' }} size="large">
        <Button 
          type="text" 
          icon={<ArrowLeftOutlined />} 
          onClick={() => navigate('/products')}
        >
          Back to Products
        </Button>

        <Title level={2}>Create New Product</Title>

        <ProductForm 
          onSubmit={handleSubmit}
          submitText="Create Product"
        />
      </Space>
    </div>
  );
};

export default CreateProduct;