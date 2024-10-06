import { SizeType } from 'antd/es/config-provider/SizeContext';

type NameType = string | number | (string | number)[];
export interface IRenderInputProps {
  //  COLUMN
  col?: any;
  colClassName?: string;
  colOffSet?: any;
  offSetPull?: any;
  // FORM_ITEM
  name?: NameType;
  label?: string;
  rules?: any;
  help?: React.ReactNode | string;
  // FORM_INPUT
  type?: string;
  placeholder?: string;
  value?: string;
  disabled?: boolean;
  min?: number | string;
  max?: number | string;
  minLength?: number;
  maxLength?: number;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  addonAfter?: any;
  addonBefore?: any;
  suffix?: React.ReactNode;
  prefix?: React.ReactNode;
  allowClear?: any;
  size?: SizeType;
  required?: boolean;
  defaultValue?: string;
  tooltip?: any;
  dependencies?: any;
  hasFeedback?: boolean;
  style?: any;
  readonly?: boolean;
}

export interface IRenderCheckBox {
  col?: any;
  colClassName?: string;
  colOffSet?: any;
  name?: NameType;
  label?: string;
  className?: string;
  checkBoxName?: string;
  required?: boolean;
  rules?: any;
  children?: any;
  defaultChecked?: boolean;
  disabled?: boolean;
  onChange?: (event) => void;
  checked?: boolean;
  initialValue?: boolean;
  value?: boolean;
  valuePropName?: string;
}

export interface IRenderCheckboxProps {
  col?: any;
  colClassName?: string;
  colOffSet?: any;
  name?: string | number | (string | number)[];
  label?: string;
  className?: string;
  checkboxName?: string;
  required?: boolean;
  value?: any;
  onChange?: (checkedValues: CheckboxValueType[]) => void;
  optionLabel?: any;
  rules?: any;
  disabled?: boolean;
  defaultValues?: any;
}

export interface IRenderSelectProps {
  col?: any;
  colClassName?: string;
  colOffSet?: any;
  name?: NameType;
  label?: string;
  rules?: any;
  required?: boolean;
  onChange?: any;
  value?: any;
  className?: string;
  optionLabel?: any;
  disabled?: boolean;
  onSelect?: any;
  showSearch?: boolean;
  mode?: any;
  placeholder?: string;
  allowClear?: boolean;
  defaultValue?: any;
  prefixIcon?: any;
  suffixIcon?: any;
}

export interface IUploadProps {
  col?: any;
  colClassName?: string;
  btnText: string;
  colOffSet?: any;
  block?: boolean;
  label?: any;
  required?: boolean;
  rules?: any;
  fileList?: any;
  name?: NameType;
  maxCount?: number;
  onChange: any;
  accept?: any;
}

export interface IRenderRadioProps {
  col?: any;
  colClassName?: string;
  colOffSet?: any;
  name?: NameType;
  label?: any;
  rules?: any;
  defaultValue?: any;
  helperText?: React.ReactNode | string;
  hidden?: boolean;
  key: string;
  value: any;
  onChange: any;
  radioOption: any;
}

export interface IRenderDateProps {
  col?: any;
  colClassName?: string;
  colOffset?: number;
  offsetPull?: number;
  name?: NameType;
  label?: string;
  rules?: any;
  formlabel?: any;
  formItemClass?: any;
  required?: boolean;
  helperText?: React.ReactNode | string;
  tooltipContent?: any;
  tooltipIcon?: any;
  style?: any;
  value?: any;
  initialValue?: any;
  defaultValue?: any;
  defaultPickerValue?: any;
  disabledDate?: any;
  format?: any;
  showTime?: any;
  suffixIcon?: React.ReactNode | string;
  placeholder?: any;
  onChange?: (
    value: DatePickerProps['value'] | RangePickerProps['value'],
    dateString: string[] | string
  ) => void;
  onOk?: (value: DatePickerProps['value'] | RangePickerProps['value']) => void;
  classNames?: string;
  help?: React.ReactNode | string;
  suffixIcon?: React.ReactNode;
  picker?: any;
  getPopupContainer?: any;
  selectOptionLabelProp?: any;
  defaultSelectValue?: any;
  disabled?: boolean;
  size?: any;
  hidden?: boolean;
}

export interface IRenderTextareaProps {
  col?: any;
  colClassName?: string;
  colOffset?: any;
  offsetPull?: any;
  name?: NameType;
  label?: string;
  rules?: any;
  showCount?: boolean;
  disabled?: boolean;
  className?: string;
  cols?: number;
  rows?: number;
  placeholder?: any;
  maxLength?: number;
  allowClear?: boolean;
}

export interface IReactQuillProps {
  col?: any;
  colClassName?: string;
  colOffset?: any;
  offsetPull?: any;
  name?: NameType;
  label?: string;
  rules?: any;
  showCount?: boolean;
  disabled?: boolean;
  className?: string;
  cols?: number;
  rows?: number;
  placeholder?: any;
  maxLength?: number;
  allowClear?: boolean;
  extraClass?: any;
  colWidth?: number;
  onChange?: any;
  placeholder?: string;
  formLabel?: any;
}
