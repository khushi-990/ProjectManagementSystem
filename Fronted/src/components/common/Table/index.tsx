import { StyledTable } from './style';

import { TablePaginationConfig, TableProps } from 'antd';
import React from 'react';

interface CustomProps {
  summaryRow?: React.ReactNode;
  loading?: boolean;
  total?: number;
  currentPage?: number;
  isPagination?: boolean;
}

export const TableSummaryCell: React.FC<{
  index: number;
  colSpan: number;
  component: React.ReactNode;
}> = ({ index, colSpan, component }) => (
  <StyledTable.Summary.Cell index={index} colSpan={colSpan}>
    {component}
  </StyledTable.Summary.Cell>
);

const defaultPaginationSettings: Partial<TablePaginationConfig> = {
  showSizeChanger: true,
  showQuickJumper: false,
  defaultPageSize: 10,
  pageSizeOptions: ['10', '20', '50', '100'],
  size: 'small',
  position: ['bottomRight'],
  showTotal: (total) => `Total ${total} items`
};

export const CommonTable: React.FC<TableProps<any> & CustomProps> = (props) => {
  const {
    pagination,
    summaryRow,
    loading,
    total,
    rowKey,
    currentPage,
    isPagination = true
  } = props;

  return (
    <StyledTable
      dataSource={props.dataSource}
      loading={loading}
      size="small"
      scroll={{ x: true }}
      {...props}
      rowKey={rowKey}
      pagination={
        isPagination
          ? {
              ...defaultPaginationSettings,
              ...pagination,
              total: total,
              current: currentPage ?? 1
            }
          : false
      }
      summary={
        summaryRow
          ? () => (
              <StyledTable.Summary fixed="top">
                <StyledTable.Summary.Row>{summaryRow}</StyledTable.Summary.Row>
              </StyledTable.Summary>
            )
          : undefined
      }
    />
  );
};
