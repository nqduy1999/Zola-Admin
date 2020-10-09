import { Button, Col, message, Row, Upload, Form, Input } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import React, { useEffect, useState } from 'react';
import ImgCrop from 'antd-img-crop';
import MyProfileIcon from '../../../assets/images/my-profile.svg';
import PasswordIcon from '../../../assets/images/password.svg';
import { LoadingOutlined, PlusOutlined, EditOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import {
  getInfoAdmin,
  updateInfoAdmin
} from '../../../redux/actions/Account.action';
import { Upload_Image_Single } from '../../../redux/actions/Image.action';
import { toast } from 'react-toastify';
import Password from '../Password';
import PropTypes, { func } from 'prop-types';

const ProfileGeneral = props => {
  const state = useSelector(state => state.AccountReducer);
  console.log(state);
  const prefix = 'profile-general';
  const [imageChange, setImageChange] = useState();
  const [imageFormData, setImageFormData] = useState();
  const dispatch = useDispatch();
  const [adminProfile, setAdminProfile] = useState({});
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [changeName, setChangeName] = useState(false);
  const showModal = () => {
    setVisible(true);
    setImageChange(null);
  };
  useEffect(() => {
    dispatch(getInfoAdmin(JSON.parse(localStorage.getItem('phone'))));
  }, [dispatch]);
  useEffect(() => {
    if (state) {
      setAdminProfile(state.info);
    }
  }, [state]);

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );
  const cancelAvatar = () => {
    setVisible(false);
  };
  const handleOnChange = e => {
    setAdminProfile({
      ...adminProfile,
      [e.target.name]: e.target.value
    });
  };
  const submit = () => {
    const dataUpdate = {
      name: adminProfile?.name,
      avatar: adminProfile?.avatar
    };
    dispatch(updateInfoAdmin(dataUpdate)).then(() => {
      setChangeName(false);
      toast.success('🦄 Update Successful!', {
        position: 'top-right',
        autoClose: 3000
      });
    });
  };
  const ChangeName = () => {
    setChangeName(true);
  };
  const submitAvatar = () => {
    const formData = new FormData();
    formData.append('avatar', imageFormData);
    if (imageFormData) {
      //   for (var [key, value] of formData.entries()) {
      //     console.log(key, value);
      //   }
      Upload_Image_Single(formData).then(res => {
        console.log(res);
        const dataUpdate = {
          name: adminProfile?.name || '',
          avatar: `https://api-ret.ml/api/v0/images/download/${res.data}`
        };
        dispatch(updateInfoAdmin(dataUpdate)).then(() => {
          setVisible(false);
          toast.success('🦄 Update Successful!', {
            position: 'top-right',
            autoClose: 3000
          });
        });
      });
    }
  };
  function beforeUpload(file) {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('Chỉ có thể upload hình với định dạng jpg/png!');
    }
    const isLt2M = file.size / 1024 / 1024 < 5;
    if (!isLt2M) {
      message.error('Ảnh phải nhỏ hơn 5 MB!');
    }
    return isJpgOrPng && isLt2M;
  }
  const handleChangeFile = e => {
    const reader = new FileReader();
    reader.onload = () => {
      console.log(reader);
      if (reader.readyState === 2) {
        setImageChange(reader.result);
      }
    };
    // if (e.file.status === 'uploading') {
    //   setLoading(true);
    // }
    if (e.file.originFileObj) {
      reader.readAsDataURL(e.file.originFileObj);
      setImageFormData(e.file.originFileObj);
    } else if (!e.file.originFileObj) {
      setImageChange(null);
    }
    setLoading(false);
  };

  return (
    <div className={`${prefix}_container`}>
      <div className={`${prefix}_main_content`}>
        <div className="header">
          <div className="avatar">
            <img
              src={adminProfile?.avatar ? adminProfile?.avatar : 'avatar'}
              className="img_avatar"
              data-reactid="23"
            />
            <Button className="change_image" onClick={showModal}>
              Change
            </Button>
            <Modal
              title="Thay đổi Avatar"
              visible={visible}
              onOk={submitAvatar}
              onCancel={cancelAvatar}
              footer={[
                <Button key="back" onClick={cancelAvatar}>
                  Close
                </Button>,
                <Button key="submit" type="primary" onClick={submitAvatar}>
                  Upload
                </Button>
              ]}
            >
              <ImgCrop rotate>
                <Upload
                  name="avatar"
                  listType="picture-card"
                  className="avatar-uploader"
                  showUploadList={false}
                  action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                  beforeUpload={beforeUpload}
                  onChange={handleChangeFile}
                  style={{ background: 'red' }}
                >
                  {imageChange ? (
                    <img
                      src={imageChange}
                      alt="avatar"
                      style={{
                        width: '100%'
                      }}
                    />
                  ) : (
                    uploadButton
                  )}
                </Upload>
              </ImgCrop>
            </Modal>
          </div>
          <div className="content_header">
            {changeName ? (
              <Form
                name="updateName"
                initialValues={{ remember: true }}
                onFinish={submit}
              >
                <Form.Item
                  label="Name"
                  rules={[
                    { required: true, message: 'Please input your username!' }
                  ]}
                >
                  <Input
                    name="name"
                    value={adminProfile ? adminProfile.name : ''}
                    onChange={handleOnChange}
                  />
                </Form.Item>
                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    style={{ marginLeft: '50px' }}
                  >
                    Change
                  </Button>
                </Form.Item>
              </Form>
            ) : (
              <h1 className="welcome_name">
                Chào mừng, {adminProfile ? adminProfile.name : ''}{' '}
                <Button style={{ border: 'none' }} onClick={ChangeName}>
                  <EditOutlined />
                </Button>
              </h1>
            )}
            <p>
              Tại đây quản lý tất cả các thông tin cá nhân và bảo mật tài khoản
              của bạn
            </p>
          </div>
        </div>
        <div className="main_profile">
          {props.changePassword ? (
            <Password changeSuccess={props.setChangePassword} />
          ) : (
            <Row gutter={[24, 16]}>
              <Col span={8}>
                <div className="el-card card_item">
                  <div className="card__body">
                    <img
                      src={MyProfileIcon}
                      alt="My Profile"
                      className="image"
                    />
                    <h2 className="card-title mt-4">My Profile</h2>
                  </div>
                </div>
              </Col>
              <Col span={8}>
                <div
                  className="el-card card_item"
                  onClick={() => {
                    props.setChangePassword(true);
                  }}
                >
                  <div className="card__body">
                    <img
                      src={PasswordIcon}
                      alt="My Profile"
                      className="image"
                    />
                    <h2 className="card-title mt-4">Password</h2>
                  </div>
                </div>
              </Col>
            </Row>
          )}
          <Row gutter={[24, 16]}></Row>
        </div>
      </div>
    </div>
  );
};
export default ProfileGeneral;
ProfileGeneral.propTypes = {
  changePassword: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  setChangePassword: func
};
