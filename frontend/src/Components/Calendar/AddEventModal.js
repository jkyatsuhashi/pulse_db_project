import React, { useState } from 'react';
import { Modal, Button, Form, Input, DatePicker } from 'antd';
import dayjs from 'dayjs';

const AddEventModal = ({ open, onCancel, onAddEvent }) => {
  const [form] = Form.useForm();
  
  const handleSubmit = () => {
    form.validateFields().then(values => {
      // Format date to YYYY-MM-DD before sending to backend
      const formattedDate = values.date.format('YYYY-MM-DD');
      onAddEvent({ ...values, date: formattedDate });
      form.resetFields();
    });
  };

  return (
    <Modal
      open={open}
      title="Add New Event"
      onCancel={onCancel}
      onOk={handleSubmit}
    >
      <Form form={form} layout="vertical">
        <Form.Item name="location" label="Location" rules={[{ required: true, message: 'Please enter the location' }]}>
          <Input />
        </Form.Item>
        <Form.Item name="date" label="Date" rules={[{ required: true, message: 'Please select a date' }]}>
          <DatePicker format="YYYY-MM-DD" />
        </Form.Item>
        <Form.Item name="title" label="Title" rules={[{ required: true, message: 'Please enter title for event'}]}> 
            <Input />
        </Form.Item>
        <Form.Item name="type" label="Type"> 
            <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddEventModal;
