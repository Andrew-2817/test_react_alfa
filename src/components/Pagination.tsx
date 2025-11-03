import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Pagination as AntPagination } from 'antd';
import { RootState } from '../store';
import { setCurrentPage } from '../store/productsSlice';

const Pagination: React.FC = () => {
  const dispatch = useDispatch();
  const { items, filter, categoryFilter, searchQuery, currentPage, itemsPerPage } = useSelector(
    (state: RootState) => state.products
  );

  const filteredProducts = items.filter(product => {
    const matchesFilter = filter === 'all' || product.isLiked;
    const matchesCategory = categoryFilter === 'all' || product.category === categoryFilter;
    const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesCategory && matchesSearch;
  });

  const totalItems = filteredProducts.length;

  const handlePageChange = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  if (totalItems <= itemsPerPage) {
    return null;
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', margin: '20px 0' }}>
      <AntPagination
        current={currentPage}
        total={totalItems}
        pageSize={itemsPerPage}
        onChange={handlePageChange}
        showSizeChanger={false}
      />
    </div>
  );
};

export default Pagination;