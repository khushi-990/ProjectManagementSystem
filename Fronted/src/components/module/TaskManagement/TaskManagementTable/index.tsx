import { EditOutlined, EyeOutlined, DeleteOutlined } from '@ant-design/icons';
import { useQueryClient } from '@tanstack/react-query';
import { Button, Tag, Tooltip, message } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { SorterResult } from 'antd/es/table/interface';
import dayjs from 'dayjs';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import { CommonTable } from 'components/common/Table';
import { IList } from 'components/common/interface/list.interface';

import { ITask } from 'services/api/task/types';
import { taskKeys } from 'services/hooks/queryKeys';
import { useDeleteTask, useTaskList } from 'services/hooks/task';

import { IApiError } from 'utils/Types';
import { DATE_FORMAT } from 'utils/constants/dayjs';
import { ROUTES } from 'utils/constants/routes';
import { renderTagColor } from 'utils/renderColor';

interface IProps {
  projectId?: string | undefined;
  args: IList;
  setArgs: React.Dispatch<React.SetStateAction<IList>>;
}

const TaskManagementTable: React.FC<IProps> = ({ projectId, args, setArgs }) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data , isLoading } = useTaskList({ ...args, projectId: projectId ?? '' });
  const { mutate } = useDeleteTask();

  const columns: ColumnsType<ITask> = [
    {
      title: 'Task title',
      dataIndex: 'name',
      key: 'name',
      sorter: true
    },
    {
      title: 'Task description',
      dataIndex: 'description',
      key: 'description',
      sorter: true
    },
    {
      title: 'Date created',
      dataIndex: 'startDate',
      key: 'startDate',
      sorter: true,
      render: (_, record: ITask) => (
        <>{record?.createdAt ? dayjs(record?.createdAt).format(DATE_FORMAT) : '-'}</>
      )
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (_, record: ITask) => (
        <Tag className="table-status-tag" color={renderTagColor(record?.status)}>
          {record?.status}
        </Tag>
      )
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      key: 'actions',
      className: 'text-center',
      render: (_, record: ITask) => (
        <>
          <Tooltip title="View task" placement="top" trigger="hover">
            <Button
              type="text"
              size="small"
              className="cta_btn table_cta_btn"
              icon={<EyeOutlined />}
              onClick={() => navigate(`${ROUTES.taskView}/${record?._id}`)}
            />
          </Tooltip>
          <Tooltip title="Edit task" placement="top" trigger="hover">
            <Button
              type="text"
              size="small"
              className="cta_btn table_cta_btn"
              icon={<EditOutlined />}
              onClick={() => navigate(`${ROUTES.taskEdit}/${record?._id}/${projectId}`)}
            />
          </Tooltip>
          <Tooltip title="Delete task" placement="top" trigger="hover">
            <Button
              type="text"
              size="small"
              className="cta_btn table_cta_btn"
              icon={<DeleteOutlined />}
              onClick={() => onTaskDelete(record?._id)}
            />
          </Tooltip>
        </>
      )
    }
  ];

  const onTaskDelete = (id: string) => {
    mutate(id, {
      onSuccess: (res) => {
        queryClient.invalidateQueries(taskKeys.taskList({...args,projectId}));
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
      dataSource={ data?.taskList ?? [] }
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
      total={data?.records_total ?? 10}
    />
  );
};

export default TaskManagementTable;
