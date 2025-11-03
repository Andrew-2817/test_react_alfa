import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Card, Button, MenuProps } from 'antd';
import { HeartOutlined, HeartFilled, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Product } from '../types/product';
import { toggleLike, deleteProduct } from '../store/productsSlice';

const { Meta } = Card;

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(toggleLike(product.id));
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(deleteProduct(product.id));
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/edit-product/${product.id}`);
  };

  const handleCardClick = () => {
    navigate(`/products/${product.id}`);
  };

  const truncateText = (text: string, maxLength: number) => {
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };

  return (
    <Card
      hoverable
      style={{ width: 300, margin: '16px' }}
      cover={
        <img 
          alt={product.title} 
          src={product.image} 
          style={{ height: 200, objectFit: 'contain' }}
        />
      }
      actions={[
        <Button 
          type="text" 
          icon={product.isLiked ? <HeartFilled style={{ color: 'red' }} /> : <HeartOutlined />}
          onClick={handleLike}
        />,
        <Button 
          type="text" 
          icon= {<EditOutlined />}
          onClick={handleEdit}
        />,
        <Button 
          type="text" 
          icon={<DeleteOutlined />}
          onClick={handleDelete}
        />,
      ]}
      onClick={handleCardClick}
    >
      <Meta
        title={truncateText(product.title, 50)}
        description={
          <div>
            <p>{truncateText(product.description, 100)}</p>
            <p style={{ fontWeight: 'bold', color: '#1890ff', margin: 0 }}>
              ${product.price}
            </p>
            <p style={{ color: '#666', fontSize: '12px', margin: 0 }}>
              {product.category}
            </p>
          </div>
        }
      />
    </Card>
  );
};

export default ProductCard;