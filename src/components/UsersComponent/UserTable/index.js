import React from 'react';
import { Table, Spin, Tag, Avatar } from 'antd';
import { EyeOutlined, UserOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';

const UserTable = () => {
  const { users, loading } = useSelector(state => state.UsersReducer);

  const handleDetail = item => {
    console.log(item);
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
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
      sorter: (a, b) => a.phone.length - b.phone.length
    },
    {
      title: 'Active',
      dataIndex: 'active',
      key: 'active',
      render: (_, record) => {
        return (
          <>
            {record.active ? (
              <Tag color="green">Already Active</Tag>
            ) : (
              <Tag color="red">Not Active</Tag>
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
