import React from 'react';
import { useSelector } from 'react-redux';
import { Row, Col, Empty } from 'antd';
import { RootState } from '../store';
import ProductCard from './ProductCard';

const ProductList: React.FC = () => {
  const { items, filter, categoryFilter, searchQuery, currentPage, itemsPerPage } = useSelector(
    (state: RootState) => state.products
  );

  // Фильтрация по лайкам, категории и поиску
  const filteredProducts = items.filter(product => {
    const matchesFilter = filter === 'all' || product.isLiked;
    const matchesCategory = categoryFilter === 'all' || product.category === categoryFilter;
    const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesCategory && matchesSearch;
  });

  // Пагинация
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

  if (paginatedProducts.length === 0) {
    return <Empty description="No products found" />;
  }

  return (
    <Row gutter={[16, 16]} justify="center">
      {paginatedProducts.map(product => (
        <Col key={product.id}>
          <ProductCard product={product} />
        </Col>
      ))}
    </Row>
  );
};

export default ProductList;