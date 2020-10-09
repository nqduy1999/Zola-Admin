import React from 'react';
import { Button, Form, Input } from 'antd';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { accountChange } from '../../../redux/actions/Account.action';
import { func } from 'prop-types';
const Password = props => {
  const prefix = 'profile-general';
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const handleSubmit = value => {
    console.log(value);
    dispatch(accountChange(value)).then(() => {
      toast.success('Change Password Sucess', {
        position: 'top-right',
        autoClose: 5000
      });
      props.changeSuccess(false);
    });
  };
  return (
    <div className={`${prefix}_container`}>
      <div className={`${prefix}_main_content`}>
        <div className="content_main_profile">
          <Form
            form={form}
            name="updateData"
            onFinish={handleSubmit} // =onSubmit
            layout="vertical"
          >
            <Form.Item
              label="New Password"
              name="newPassword"
              rules={[
                { required: true, message: 'Please input your password!' }
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              label="Confirm New Password"
              name="confirmNewPassword"
              rules={[
                {
                  required: true,
                  message: 'Please input your Confirm password!'
                }
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                style={{ width: '100%', height: '40px' }}
              >
                Change Password
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Password;
Password.propTypes = {
  changeSuccess: func
};
