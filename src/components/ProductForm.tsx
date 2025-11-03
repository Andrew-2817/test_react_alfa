import React from 'react';
import { Form, Input, InputNumber, Button, Select } from 'antd';
import { Product, ProductFormData } from '../types/product';

const { TextArea } = Input;
const { Option } = Select;

interface ProductFormProps {
  initialValues?: Product;
  onSubmit: (values: ProductFormData) => void;
  submitText: string;
}

const ProductForm: React.FC<ProductFormProps> = ({ 
  initialValues, 
  onSubmit, 
  submitText 
}) => {
  const [form] = Form.useForm();

  const onFinish = (values: ProductFormData) => {
    onSubmit(values);
    form.resetFields();
  };

  const categories = [
    'electronics',
    'jewelery',
    "men's clothing",
    "women's clothing",
  ];

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      initialValues={initialValues}
      style={{ maxWidth: 600 }}
    >
      <Form.Item
        label="Title"
        name="title"
        rules={[
          { required: true, message: 'Please input product title!' },
          { min: 3, message: 'Title must be at least 3 characters!' }
        ]}
      >
        <Input placeholder="Enter product title" />
      </Form.Item>

      <Form.Item
        label="Description"
        name="description"
        rules={[
          { required: true, message: 'Please input product description!' },
          { min: 10, message: 'Description must be at least 10 characters!' }
        ]}
      >
        <TextArea 
          rows={4} 
          placeholder="Enter product description" 
        />
      </Form.Item>

      <Form.Item
        label="Price"
        name="price"
        rules={[
          { required: true, message: 'Please input product price!' },
          { type: 'number', min: 0.01, message: 'Price must be greater than 0!' }
        ]}
      >
        <InputNumber
          style={{ width: '100%' }}
          placeholder="Enter product price"
          min={0.01}
          step={0.01}
        />
      </Form.Item>

      <Form.Item
        label="Image URL"
        name="image"
        rules={[
          { required: true, message: 'Please input image URL!' },
          { type: 'url', message: 'Please enter a valid URL!' }
        ]}
      >
        <Input placeholder="Enter image URL" />
      </Form.Item>

      <Form.Item
        label="Category"
        name="category"
        rules={[{ required: true, message: 'Please select a category!' }]}
      >
        <Select placeholder="Select a category">
          {categories.map(category => (
            <Option key={category} value={category}>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" block>
          {submitText}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ProductForm;