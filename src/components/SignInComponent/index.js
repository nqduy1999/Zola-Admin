import React from 'react';
import logo from '../../assets/images/logo.png';
import { classPrefixor } from '../../utils/classPrefixor';
import { Row, Col, Form, Input, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { signInAction } from '../../redux/actions/Account.action';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

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
  const dispatch = useDispatch();
  const history = useHistory();
  const { errStatus, errData } = useSelector(state => state.AccountReducer);
  const handleLoginSuccess = () => {
    const credential = JSON.parse(localStorage.getItem('credential'));
    if (credential?.role === 'ADMIN') {
      history.push('/admin/users');
      toast.success('🦄 HELLO ADMIN', {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false
      });
    } else {
      toast.error('You are not an Administrator', {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false
      });
    }
  };

  const renderErrorLoginFailure = () => {
    let result = null;
    if (errData.length < 0) return result;

    return (result = errData.map((errItem, index) => {
      return <p key={index}>{errItem.msg}</p>;
    }));
  };

  const onFinish = values => {
    dispatch(signInAction(values, handleLoginSuccess));
  };
  return (
    <section className={prefix}>
      <Row className={c`form`}>
        <Col span="10" className={c`form__left`}>
          <img src={logo} alt="logo" />
        </Col>
        <Col span="14" className={c`form__right`}>
          <div className={c`form__right__content`}>
            <Row>
              <Col span="24" className="img">
                <img src={logo} alt="logo" />
              </Col>
            </Row>
            <Row>
              <Col span="24">
                <Form {...layout} name="basic" onFinish={onFinish}>
                  {errStatus && renderErrorLoginFailure()}
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
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    </section>
  );
};

export default SignInComponent;
