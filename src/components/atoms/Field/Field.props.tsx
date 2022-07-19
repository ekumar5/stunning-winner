import { FieldValidator } from 'final-form';
import React from 'react';

export type FieldProps<FieldValue> = {
  name: string;
  afterSubmit?: () => void;
  allowNull?: boolean;
  beforeSubmit?: () => void | false;
  children?: React.ReactNode;
  component?: React.ReactNode;
  data?: Object;
  defaultValue?: any;
  format?: (value: any, name: string) => any;
  formatOnBlur?: boolean;
  initialValue?: any;
  isEqual?: (a: any, b: any) => boolean;
  multiple?: boolean;
  parse?: (value: any, name: string) => any;
  type?: string;
  validate?: FieldValidator<FieldValue>;
  validateFields?: string[];
  value?: any;
};
