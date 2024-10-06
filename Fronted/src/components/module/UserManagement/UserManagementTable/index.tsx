import { DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';
import { useQueryClient } from '@tanstack/react-query';
import { Button, Tooltip, message } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { SorterResult } from 'antd/es/table/interface';
import dayjs from 'dayjs';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import { CommonTable } from 'components/common/Table';
import { IList } from 'components/common/interface/list.interface';

import { IUser } from 'services/api/user/types';
import { userKeys } from 'services/hooks/queryKeys';
import { useDeleteUser, useUserList } from 'services/hooks/users';

import { IApiError } from 'utils/Types';
import { USER_GENDER } from 'utils/constants';
import { DATE_FORMAT } from 'utils/constants/dayjs';
import { ROUTES } from 'utils/constants/routes';

interface IProps {
  searchDebounce: string;
  args: IList;
  setArgs: React.Dispatch<React.SetStateAction<IList>>;
}

const UserManagementTable: React.FC<IProps> = ({ searchDebounce, args, setArgs }) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate } = useDeleteUser();
  const { data, isLoading } = useUserList({ ...args, search: searchDebounce });

  const columns: ColumnsType<IUser> = [
    {
      title: 'First Name',
      dataIndex: 'firstName',
      key: 'firstName',
      sorter: true
    },
    {
      title: 'Last Name',
      dataIndex: 'lastName',
      key: 'lastName',
      sorter: true
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      sorter: true
    },
    {
      title: 'Gender',
      dataIndex: 'gender',
      key: 'gender',
      sorter: true,
      render: (_, record: IUser) => <>{USER_GENDER[record?.gender as keyof typeof USER_GENDER]}</>
    },
    {
      title: 'Date created',
      dataIndex: 'createdAt',
      key: 'createdAt',
      sorter: true,
      render: (_, record: IUser) => (
        <>{record?.createdAt ? dayjs(record?.createdAt).format(DATE_FORMAT) : '-'}</>
      )
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      key: 'actions',
      className: 'text-center',
      render: (_, record: IUser) => (
        <>
          <Tooltip title="View task" placement="top" trigger="hover">
            <Button
              type="primary"
              size="small"
              className="cta_btn table_cta_btn"
              icon={<EyeOutlined />}
              onClick={() => navigate(`${ROUTES.userView}/${record?._id}`)}
            />
          </Tooltip>
          <Tooltip title="Edit task" placement="top" trigger="hover">
            <Button
              type="primary"
              size="small"
              className="cta_btn table_cta_btn ml-5"
              icon={<EditOutlined />}
              onClick={() => navigate(`${ROUTES.userEdit}/${record?._id}`)}
            />
          </Tooltip>
          <Tooltip title="Delete task" placement="top" trigger="hover">
            <Button
              type="primary"
              size="small"
              className="cta_btn table_cta_btn ml-5"
              icon={<DeleteOutlined />}
              onClick={() => onUserDelete(record?._id)}
            />
          </Tooltip>
        </>
      )
    }
  ];

  const onUserDelete = (id: string) => {
    mutate(id, {
      onSuccess: (res) => {
        queryClient.invalidateQueries(userKeys.userList(args));
        message.success(res.message ?? 'Task deleted successfully');
      },

      onError: (err: IApiError) => {
        message.error(err.message);
      }
    });
  };

  return (
    <CommonTable
      bordered
      columns={columns}
      dataSource={data?.userList}
      currentPage={args.page === 0 ? 1 : args.page / 10 + 1}
      onChange={(pagination, _, sorter, extra) => {
        const { columnKey, order } = sorter as SorterResult<any>; // Type assertion
        const pageIndex = pagination?.current ?? 1;
        if (extra?.action === 'paginate') {
          setArgs({
            ...args,
            page: pageIndex - 1,
            limit: pagination?.pageSize ?? 10
          });
        } else {
          setArgs({
            ...args,
            sort_by: order ? columnKey : '',
            sort_order: order?.replace('end', '') ?? '',
            page: 0
          });
        }
      }}
      loading={isLoading}
      total={data?.total_records ?? 10}
    />
  );
};

export default UserManagementTable;
