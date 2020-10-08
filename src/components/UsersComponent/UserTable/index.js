import React from 'react';
import { Table, Spin, Tag, Avatar } from 'antd';
import { EyeOutlined, UserOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import { detailUserAction } from '../../../redux/actions/Users.action';
import { useHistory } from 'react-router-dom';

const UserTable = () => {
  const dispatch = useDispatch();
  const { users, loading } = useSelector(state => state.UsersReducer);
  const history = useHistory();
  const handleDetail = item => {
    if (item.id) {
      dispatch(detailUserAction(item.id));
      history.push(`/admin/user/${item.id}`);
    }
  };
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.length - b.name.length,
      render: (_, record) => (
        <div className="User__info">
          {record.avatar === null ? (
            <Avatar icon={<UserOutlined />} />
          ) : (
            <img src={record.avatar} alt="avatar" />
          )}
          <span style={{ padding: '15px' }}>{record.name}</span>
        </div>
      )
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      sorter: (a, b) => a.role.length - b.role.length
    },

    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      render: (_, record) => (
        <>
          {record.email === null ? (
            <span style={{ color: 'red' }}>User Sign Up with Phone</span>
          ) : (
            <span>{record.email}</span>
          )}
        </>
      )
    },

    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
      render: (_, record) => (
        <>
          {record.phone === '' ? (
            <span style={{ color: 'red' }}>User Sign Up with Email</span>
          ) : (
            <span>{record.phone}</span>
          )}
        </>
      )
    },
    {
      title: 'Active',
      dataIndex: 'active',
      key: 'active',
      render: (_, record) => {
        return (
          <>
            {record.active ? (
              <Tag color="green">Active</Tag>
            ) : (
              <Tag color="red">Unactive</Tag>
            )}
          </>
        );
      }
    },
    {
      title: 'Actions',
      key: 'action',
      render: (_, record) => (
        <>
          <EyeOutlined
            className="icon detail"
            onClick={() => handleDetail(record)}
          />
        </>
      )
    }
  ];

  return (
    <>
      {loading ? (
        <Spin size="large" tip="Fetching list user..." />
      ) : (
        <Table
          dataSource={users}
          columns={columns}
          size="large"
          loading={false}
          tableLayout="fixed"
          pagination={{
            defaultPageSize: 5,
            showQuickJumper: true,
            position: ['bottomCenter'],
            pageSizeOptions: [5, 10],
            responsive: true,
            showSizeChanger: true
          }}
        />
      )}
    </>
  );
};

export default UserTable;
