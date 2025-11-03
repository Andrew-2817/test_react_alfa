import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Radio, Input, Space, Typography, Tabs } from 'antd';
import { Link } from 'react-router-dom';
import { HeartOutlined, HeartFilled, PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { RootState } from '../store';
import { fetchProducts, setFilter, setSearchQuery, setCategoryFilter } from '../store/productsSlice';
import ProductList from '../components/ProductList';
import Pagination from '../components/Pagination';

const { Title } = Typography;
const { TabPane } = Tabs;

const Products: React.FC = () => {
  const dispatch = useDispatch();
  const { items, filter, categoryFilter, searchQuery, loading, dataLoaded } = useSelector(
    (state: RootState) => state.products
  );

  useEffect(() => {
    if (!dataLoaded) {
      dispatch(fetchProducts() as any);
    }
  }, [dispatch, dataLoaded]);

  const handleFilterChange = (e: any) => {
    dispatch(setFilter(e.target.value));
  };

  const handleCategoryFilterChange = (key: string) => {
    dispatch(setCategoryFilter(key));
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchQuery(e.target.value));
  };

  // Получаем уникальные категории из продуктов
  const categories = ['all', ...new Set(items.map(product => product.category))];

  const getCategoryDisplayName = (category: string) => {
    if (category === 'all') return 'All Categories';
    return category.charAt(0).toUpperCase() + category.slice(1);
  };

  return (
    <div style={{ padding: '24px' }}>
      <Space direction="vertical" style={{ width: '100%' }} size="large">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Title level={2}>Products</Title>
          <Link to="/create-product">
            <Button type="primary" icon={<PlusOutlined />}>
              Add Product
            </Button>
          </Link>
        </div>

        <Space direction="vertical" style={{ width: '100%' }} size="middle">
          {/* Табы для фильтрации по категориям */}
          <Tabs 
            activeKey={categoryFilter} 
            onChange={handleCategoryFilterChange}
            type="card"
            size="middle"
          >
            {categories.map(category => (
              <TabPane 
                tab={getCategoryDisplayName(category)} 
                key={category} 
              />
            ))}
          </Tabs>

          <Space>
            <Radio.Group value={filter} onChange={handleFilterChange}>
              <Radio.Button value="all">All Products</Radio.Button>
              <Radio.Button value="favorites">
                Favorites {filter === 'favorites' ? <HeartFilled style={{ color: 'red' }} /> : <HeartOutlined />}
              </Radio.Button>
            </Radio.Group>

            <Input
              placeholder="Search products..."
              prefix={<SearchOutlined />}
              allowClear
              value={searchQuery}
              onChange={handleSearchChange}
              style={{ width: 300 }}
            />
          </Space>
        </Space>

        {loading && !dataLoaded ? (
          <div>Loading products...</div>
        ) : (
          <>
            <ProductList />
            <Pagination />
          </>
        )}
      </Space>
    </div>
  );
};

export default Products;