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

import { IProject } from 'services/api/projects/types';
import { useDeleteProject, useProjectList } from 'services/hooks/project';
import { projectKeys } from 'services/hooks/queryKeys';
import { authStore } from 'services/store/auth';

import { IApiError } from 'utils/Types';
import { DATE_FORMAT } from 'utils/constants/dayjs';
import { ROUTES } from 'utils/constants/routes';

interface IProps {
  searchDebounce: string;
  args: IList;
  setArgs: React.Dispatch<React.SetStateAction<IList>>;
}

const ProjectManagementTable: React.FC<IProps> = ({ searchDebounce, args, setArgs }) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const {
    userData: { userType }
  } = authStore((state) => state);

  const { data, isLoading } = useProjectList({ ...args, search: searchDebounce });
  const { mutate } = useDeleteProject();

  const columns: ColumnsType<IProject> = [
    {
      title: 'Project title',
      dataIndex: 'title',
      key: 'title',
      sorter: true
    },
    {
      title: 'Project description',
      dataIndex: 'description',
      key: 'description',
      sorter: true
    },
    {
      title: 'Date created',
      dataIndex: 'createdAt',
      key: 'createdAt',
      sorter: true,
      render: (_, record: IProject) => (
        <>{record?.createdAt ? dayjs(record?.createdAt).format(DATE_FORMAT) : '-'}</>
      )
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      key: 'actions',
      className: 'text-center',
      render: (_, record: IProject) => (
        <>
          <Tooltip title="View project" placement="top" trigger="hover">
            <Button
              type="text"
              size="small"
              className="cta_btn table_cta_btn"
              icon={<EyeOutlined />}
              onClick={() => navigate(`${ROUTES.projectView}/${record?._id}`)}
            />
          </Tooltip>
            {userType === 'Admin' && (
              <>
          <Tooltip title="Edit project" placement="top" trigger="hover">
            <Button
              type="text"
              size="small"
              className="cta_btn table_cta_btn"
              icon={<EditOutlined />}
              onClick={() => navigate(`${ROUTES.projectEdit}/${record?._id}`)}
            />
          </Tooltip>
            <Tooltip title="Delete project" placement="top" trigger="hover">
              <Button
                type="text"
                size="small"
                className="cta_btn table_cta_btn"
                icon={<DeleteOutlined />}
                onClick={() => onProjectDelete(record?._id)}
              />
            </Tooltip>
            </>
          )}
        </>
      )
    }
  ];

  const onProjectDelete = (id: string) => {
    mutate(id, {
      onSuccess: (res) => {
        queryClient.invalidateQueries(projectKeys.projectList(args));
        message.success(res.message ?? 'Project deleted successfully');
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
      dataSource={data?.projectList ?? []}
      currentPage={args.page === 1 ? 1 : args.page / 10 + 1}
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
            page: 1
          });
        }
      }}
      loading={isLoading}
      total={data?.records_total ?? 10}
    />
  );
};

export default ProjectManagementTable;
