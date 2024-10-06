import { ArrowDownOutlined } from '@ant-design/icons';
import { Col, Form, Input, Select } from 'antd';
import React from 'react';

import { IRenderInputProps, IRenderSelectProps } from './types';

export const RenderTextInput = (props: IRenderInputProps) => {
  const {
    // COLUMN
    col,
    colClassName,
    colOffSet,
    offSetPull,
    // FORM_ITEM
    name,
    label,
    rules,
    help,
    // FORM_INPUT
    type,
    placeholder,
    value,
    disabled,
    min,
    max,
    minLength,
    maxLength,
    onChange,
    className,
    addonAfter,
    addonBefore,
    suffix,
    prefix,
    allowClear,
    required,
    size,
    tooltip,
    style,
    readonly
  } = props;
  return (
    <Col
      xs={col?.xs}
      sm={col?.sm}
      md={col?.md ? col?.md : col}
      lg={col?.lg}
      xl={col?.xl}
      xxl={col?.xxl}
      className={colClassName ?? ''}
      offset={colOffSet}
      pull={offSetPull}
    >
      <Form.Item
        className="mb-0"
        name={name ?? ''}
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
        label={label}
        rules={rules}
        help={help ?? null}
        required={required}
        tooltip={tooltip}
      >
        <Input
          type={type}
          placeholder={placeholder}
          value={value}
          disabled={disabled}
          min={min}
          max={max}
          minLength={minLength}
          maxLength={maxLength}
          onChange={onChange}
          className={className}
          style={style}
          addonAfter={addonAfter ?? null}
          addonBefore={addonBefore ?? null}
          suffix={suffix}
          prefix={prefix}
          allowClear={allowClear}
          size={size ?? 'middle'}
          readOnly={readonly}
        />
      </Form.Item>
    </Col>
  );
};

export const RenderPasswordInput = ({
  col,
  colClassName,
  colOffSet,
  name,
  label,
  rules,
  placeholder,
  prefix,
  offSetPull,
  required,
  size,
  className,
  readonly
}: IRenderInputProps) => {
  const [passwordVisible, setPasswordVisible] = React.useState(false);
  return (
    <Col
      xs={col?.xs}
      sm={col?.sm}
      md={col?.md ? col?.md : col}
      lg={col?.lg}
      xl={col?.xl}
      xxl={col?.xxl}
      className={colClassName ?? ''}
      offset={colOffSet}
      pull={offSetPull}
    >
      <Form.Item
        className="mb-0"
        name={name ?? ''}
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
        label={label}
        rules={rules || null}
        required={required}
      >
        <Input.Password
          placeholder={placeholder}
          size={size ?? 'middle'}
          prefix={prefix ?? null}
          className={className}
          readOnly={readonly}
          visibilityToggle={{
            visible: passwordVisible,
            onVisibleChange: setPasswordVisible
          }}
        />
      </Form.Item>
    </Col>
  );
};

export const RenderSelectInput = ({
  col,
  colClassName,
  colOffSet,
  name,
  label,
  rules,
  required,
  onChange,
  value,
  className = '',
  optionLabel,
  disabled,
  onSelect,
  showSearch,
  mode,
  placeholder,
  allowClear,
  prefixIcon = '',
  suffixIcon
}: IRenderSelectProps) => {
  return (
    <Col
      xs={col?.xs}
      sm={col?.sm}
      md={col?.md ? col?.md : col}
      lg={col?.lg}
      xl={col?.xl}
      xxl={col?.xxl}
      className={colClassName ?? ''}
      offset={colOffSet}
    >
      <div className={`customSelect ${prefixIcon && 'selectWithIcon'} ${className ?? className}`}>
        <Form.Item
          name={name}
          className="mb-0"
          label={label}
          rules={rules}
          required={required}
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
        >
          <Select
            value={value ?? null}
            onSelect={onSelect}
            showSearch={showSearch}
            mode={mode}
            placeholder={placeholder}
            disabled={disabled}
            allowClear={allowClear}
            onChange={onChange}
            optionFilterProp="children"
            suffixIcon={
              <div className="selectIcons">
                {prefixIcon ? (
                  <>
                    <span className="prefixIcon">{prefixIcon}</span>
                    <span className="selectArrowIcon">{suffixIcon || <ArrowDownOutlined />}</span>
                  </>
                ) : (
                  <span className="selectArrowIcon">{suffixIcon || <ArrowDownOutlined />}</span>
                )}
              </div>
            }
          >
            {optionLabel?.map((item: any) => (
              <Select.Option key={item.value} value={item.value} label={item.label}>
                {item.label}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      </div>
    </Col>
  );
};
