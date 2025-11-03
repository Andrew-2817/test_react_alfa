import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Product, ProductFormData } from '../types/product';

interface ProductsState {
  items: Product[];
  loading: boolean;
  error: string | null;
  filter: 'all' | 'favorites';
  categoryFilter: string; // Добавляем фильтр по категории
  currentPage: number;
  itemsPerPage: number;
  searchQuery: string;
  dataLoaded: boolean;
}

const initialState: ProductsState = {
  items: [],
  loading: false,
  error: null,
  filter: 'all',
  categoryFilter: 'all', // По умолчанию показываем все категории
  currentPage: 1,
  itemsPerPage: 8,
  searchQuery: '',
  dataLoaded: false,
};

// Асинхронный thunk для загрузки продуктов
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    const response = await fetch('https://fakestoreapi.com/products');
    const data = await response.json();
    return data.map((product: any) => ({
      ...product,
      isLiked: false,
    }));
  }
);

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    toggleLike: (state, action: PayloadAction<number>) => {
      const product = state.items.find(item => item.id === action.payload);
      if (product) {
        product.isLiked = !product.isLiked;
      }
    },
    deleteProduct: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    addProduct: (state, action: PayloadAction<ProductFormData>) => {
      const newProduct: Product = {
        ...action.payload,
        id: Math.max(0, ...state.items.map(p => p.id)) + 1,
        isLiked: false,
      };
      state.items.unshift(newProduct);
    },
    updateProduct: (state, action: PayloadAction<Product>) => {
      const index = state.items.findIndex(item => item.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },
    setFilter: (state, action: PayloadAction<'all' | 'favorites'>) => {
      state.filter = action.payload;
      state.currentPage = 1;
    },
    setCategoryFilter: (state, action: PayloadAction<string>) => {
      state.categoryFilter = action.payload;
      state.currentPage = 1;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
      state.currentPage = 1;
    },
    resetDataLoaded: (state) => {
      state.dataLoaded = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
        state.dataLoaded = true;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch products';
        state.dataLoaded = false;
      });
  },
});

export const {
  toggleLike,
  deleteProduct,
  addProduct,
  updateProduct,
  setFilter,
  setCategoryFilter,
  setCurrentPage,
  setSearchQuery,
  resetDataLoaded,
} = productsSlice.actions;

export default productsSlice.reducer;