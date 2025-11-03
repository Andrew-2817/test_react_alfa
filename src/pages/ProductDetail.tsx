import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Button, Card, Descriptions, Space, Typography } from 'antd';
import { ArrowLeftOutlined, EditOutlined } from '@ant-design/icons';
import { RootState } from '../store';

const { Title } = Typography;

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const products = useSelector((state: RootState) => state.products.items);
  
  const product = products.find(p => p.id === parseInt(id || ''));

  if (!product) {
    return (
      <div style={{ padding: '24px', textAlign: 'center' }}>
        <Title level={2}>Product not found</Title>
        <Button type="primary" onClick={() => navigate('/products')}>
          Back to Products
        </Button>
      </div>
    );
  }

  const handleEdit = () => {
    navigate(`/edit-product/${product.id}`);
  };

  return (
    <div style={{ padding: '24px', maxWidth: 800, margin: '0 auto' }}>
      <Space direction="vertical" style={{ width: '100%' }} size="large">
        <Space>
          <Button 
            type="text" 
            icon={<ArrowLeftOutlined />} 
            onClick={() => navigate('/products')}
          >
            Back to Products
          </Button>
          <Button 
            type="primary" 
            icon={<EditOutlined />}
            onClick={handleEdit}
          >
            Edit Product
          </Button>
        </Space>

        <Card
          cover={
            <img 
              alt={product.title} 
              src={product.image} 
              style={{ 
                maxHeight: 400, 
                objectFit: 'contain', 
                padding: '20px',
                backgroundColor: '#f5f5f5'
              }}
            />
          }
        >
          <Title level={2}>{product.title}</Title>
          
          <Descriptions bordered column={1}>
            <Descriptions.Item label="Description">
              {product.description}
            </Descriptions.Item>
            <Descriptions.Item label="Price">
              <span style={{ fontWeight: 'bold', color: '#1890ff' }}>
                ${product.price}
              </span>
            </Descriptions.Item>
            <Descriptions.Item label="Category">
              {product.category}
            </Descriptions.Item>
            <Descriptions.Item label="Status">
              {product.isLiked ? (
                <span style={{ color: 'red' }}>❤️ In favorites</span>
              ) : (
                'Not in favorites'
              )}
            </Descriptions.Item>
          </Descriptions>
        </Card>
      </Space>
    </div>
  );
};

export default ProductDetail;