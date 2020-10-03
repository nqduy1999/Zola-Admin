import React from 'react';
import logo from '../../assets/images/logo.png';
import { classPrefixor } from '../../utils/classPrefixor';
import { Row, Col, Form, Input, Button } from 'antd';

const prefix = 'signIn';
const c = classPrefixor(prefix);

const layout = {
  labelCol: {
    span: 8
  },
  wrapperCol: {
    span: 14
  }
};
const tailLayout = {
  wrapperCol: {
    span: 14,
    offset: 8
  }
};
const SignInComponent = () => {
  const onFinish = values => {
    console.log('Success:', values);
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };
  return (
    <section className={prefix}>
      <Row className={c`form`}>
        <Col span="10" className={c`form__left`}>
          <img src={logo} alt="logo" />
        </Col>
        <Col span="14" className={c`form__right`}>
          <img src={logo} alt="logo" />

          <div className={c`form__right__content`}>
            <Form
              {...layout}
              name="basic"
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
            >
              <Form.Item
                label="Your Phone Number"
                name="phone"
                rules={[
                  {
                    required: true,
                    message: 'Please input your Phone Number!'
                  }
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
                rules={[
                  {
                    required: true,
                    message: 'Please input your Password!'
                  }
                ]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </div>
        </Col>
      </Row>
    </section>
  );
};

export default SignInComponent;
