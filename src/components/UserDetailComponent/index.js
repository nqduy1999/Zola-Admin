/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { classPrefixor } from '../../utils/classPrefixor';
import { useDispatch, useSelector } from 'react-redux';
import {
  detailUserAction,
  dispatchDefaultAction,
  updateUserAction
} from '../../redux/actions/Users.action';
import { Row, Col } from 'antd';
import Avatar from '../../assets/images/avatar.png';
import { Form, Input, Button, Select, Radio } from 'antd';
import { toast } from 'react-toastify';
import { useHistory, useParams } from 'react-router-dom';
import { RGX } from '../../core/validators';

const { Option } = Select;
const { NAME_RGX } = RGX;

const prefix = 'User_detail';
const c = classPrefixor(prefix);
const formItemLayout = {
  labelCol: { span: 2 },
  wrapperCol: { span: 22 }
};

const UserDetailComponent = () => {
  const history = useHistory();
  const { id } = useParams();
  const dispatch = useDispatch();
  const { user, message } = useSelector(state => state.UsersReducer);
  const [form] = Form.useForm();
  useEffect(() => {
    if (id) {
      dispatch(detailUserAction(id));
      if (Object.keys(user).length > 0) {
        form.setFieldsValue({
          email: user.email,
          role: user.role,
          name: user.name,
          active: user.active
        });
      }
    }
  }, []);

  useEffect(() => {
    if (message.length > 0) {
      toast.success(`${message}`, {
        position: 'top-right',
        autoClose: 2000
      });
      dispatch(detailUserAction(id));
    }
    dispatch(dispatchDefaultAction());
  }, [message]);

  const onFinish = values => {
    if (id) {
      dispatch(updateUserAction(id, values));
    }
  };

  const handleCancel = () => {
    history.push('/admin/users');
    dispatch(dispatchDefaultAction());
  };

  return (
    <>
      {Object.keys(user).length > 0 && (
        <section className={prefix}>
          <Row>
            <Col lg={{ span: 24 }} className={c`infoUser`}>
              <h1>
                Detail User: <span style={{ color: 'red' }}>{user.name}</span>
              </h1>
              <Row>
                <Col lg={{ span: 4, offset: 9 }}>
                  <div className={c`avatar`}>
                    {user.avatar === null ? (
                      <img src={Avatar} alt="avatar" />
                    ) : (
                      <img src={user.avatar} alt="avatar" />
                    )}
                  </div>
                </Col>
              </Row>
              <Row style={{ margin: '50px 0' }}>
                <Col span="24">
                  <Form
                    {...formItemLayout}
                    form={form}
                    initialValues={{
                      email: user.email,
                      role: user.role,
                      name: user.name,
                      active: user.active
                    }}
                    onFinish={onFinish}
                  >
                    <Form.Item
                      label="Name"
                      name="name"
                      rules={[
                        { required: true, message: 'Please input your name!' },
                        {
                          max: 32,
                          min: 6,
                          message:
                            'UserName must be between 6 and 32 characters'
                        },
                        {
                          pattern: NAME_RGX,
                          message:
                            'The name must not have any special characters'
                        }
                      ]}
                    >
                      <Input />
                    </Form.Item>

                    <Form.Item label="Email">
                      <Input value={user.email} disabled />
                    </Form.Item>

                    <Form.Item label="Phone">
                      <Input value={user.phone} disabled />
                    </Form.Item>

                    <Form.Item name="active" label="Active">
                      <Radio.Group>
                        <Radio value={true}>Active</Radio>
                        <Radio value={false}>Unactive</Radio>
                      </Radio.Group>
                    </Form.Item>

                    <Form.Item name="role" label="Role">
                      <Select>
                        <Option value="MEMBER">MEMBER</Option>
                        <Option value="ADMIN">ADMIN</Option>
                      </Select>
                    </Form.Item>
                    <Form.Item className="btn">
                      <Button
                        htmlType="button"
                        onClick={() => {
                          handleCancel();
                        }}
                      >
                        Cancel
                      </Button>
                      <Button type="primary" htmlType="submit">
                        Submit
                      </Button>
                    </Form.Item>
                  </Form>
                </Col>
              </Row>
            </Col>
          </Row>
        </section>
      )}
    </>
  );
};

export default UserDetailComponent;
