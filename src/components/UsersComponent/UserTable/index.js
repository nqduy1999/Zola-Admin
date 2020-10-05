import { Table, Spin, Tag } from 'antd';
import React from 'react';
import { EyeOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';

const UserTable = () => {
  const { users, loading } = useSelector(state => state.UsersReducer);
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name'
    },
    {
      title: 'Role',
      dataIndex: 'role'
    },

    {
      title: 'Phone',
      dataIndex: 'phone'
    },
    {
      title: 'Active',
      dataIndex: 'active',
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

  const handleDetail = item => {
    console.log(item);
  };

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
          pagination={{
            defaultPageSize: 5,
            showQuickJumper: true,
            position: ['bottomCenter']
          }}
        />
      )}
    </>
  );
};

export default UserTable;
