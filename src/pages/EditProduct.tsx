import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Space, Typography, message } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import ProductForm from '../components/ProductForm';
import { updateProduct } from '../store/productsSlice';
import { ProductFormData } from '../types/product';
import { RootState } from '../store';

const { Title } = Typography;

const EditProduct: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const products = useSelector((state: RootState) => state.products.items);
  
  const product = products.find(p => p.id === parseInt(id || ''));

  useEffect(() => {
    if (!product) {
      message.error('Product not found');
      navigate('/products');
    }
  }, [product, navigate]);

  const handleSubmit = (values: ProductFormData) => {
    if (product) {
      const updatedProduct = {
        ...values,
        id: product.id,
        isLiked: product.isLiked, // Сохраняем состояние лайка
      };
      dispatch(updateProduct(updatedProduct));
      message.success('Product updated successfully!');
      navigate('/products');
    }
  };

  if (!product) {
    return null;
  }

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

        <Title level={2}>Edit Product</Title>

        <ProductForm 
          initialValues={product}
          onSubmit={handleSubmit}
          submitText="Update Product"
        />
      </Space>
    </div>
  );
};

export default EditProduct;