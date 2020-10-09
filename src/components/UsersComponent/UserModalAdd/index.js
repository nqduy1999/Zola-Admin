/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { Modal, Button, Form, Input, Select } from 'antd';
import { RGX } from '../../../core/validators';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import {
  addUserAction,
  dispatchDefaultAction,
  fetchUsersAction
} from '../../../redux/actions/Users.action';

const { Option } = Select;
const { PHONE_NUMBER_RGX, PASSWORD_RGX, NAME_RGX } = RGX;

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 }
};
const tailLayout = {
  wrapperCol: { span: 24 }
};

const UserModalAdd = ({ ...props }) => {
  const [form] = Form.useForm();
  const { showModal, handleCloseModalRoot } = props;
  const dispatch = useDispatch();
  const { message, dataErr } = useSelector(state => state.UsersReducer);

  useEffect(() => {
    if (message.length > 0) {
      toast.success(`${message}`, {
        position: 'top-right',
        autoClose: 2000
      });
      dispatch(fetchUsersAction());
    } else {
      if (dataErr) {
        dataErr.map(item => {
          toast.error(`${item.msg}`, {
            position: 'top-right',
            autoClose: 2000
          });
          return item;
        });
      }
    }
    dispatch(dispatchDefaultAction());
  }, [message]);

  const onFinish = values => {
    dispatch(addUserAction(values));
    form.resetFields();
  };

  return (
    <>
      <Modal
        title="Add User"
        visible={showModal}
        onCancel={() => handleCloseModalRoot(false)}
        footer={false}
      >
        <Form
          {...layout}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          form={form}
        >
          <Form.Item
            label="Username"
            name="name"
            rules={[
              { required: true, message: 'Please input your name!' },
              {
                max: 32,
                min: 6,
                message: 'UserName must be between 6 and 32 characters'
              },
              {
                pattern: NAME_RGX,
                message: 'The name must not have any special characters'
              }
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              { required: true, message: 'Please input your password!' },

              {
                pattern: PASSWORD_RGX,
                message: 'Password must be between 16 and 32 characters'
              }
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            label="Phone Number"
            name="phone"
            rules={[
              { required: true, message: 'Please input your phone number!' },
              {
                pattern: PHONE_NUMBER_RGX,
                message: 'Please input type phone number'
              }
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="role"
            label="Role"
            rules={[{ required: true }]}
            initialValue="ADMIN"
          >
            <Select
              placeholder="Select a option and change input text above"
              defaultActiveFirstOption="ADMIN"
            >
              <Option value="MEMBER">MEMBER</Option>
              <Option value="ADMIN">ADMIN</Option>
            </Select>
          </Form.Item>
          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default UserModalAdd;

UserModalAdd.propTypes = {
  showModal: PropTypes.bool,
  handleCloseModalRoot: PropTypes.func
};

UserModalAdd.defaultProps = {
  showModal: false,
  handleCloseModalRoot: () => {}
};
