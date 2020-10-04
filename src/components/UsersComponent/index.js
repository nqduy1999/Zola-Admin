import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchUsersAction } from '../../redux/actions/Users.action';

const UsersComponent = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUsersAction());
  }, []);

  return <div></div>;
};

export default UsersComponent;
