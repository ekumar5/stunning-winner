import React, { useEffect } from 'react';
import { View } from 'react-native';
import { FormListProps } from './FormList.props';

const FormList = ({ input, listData, renderItem, ...rest }: FormListProps) => {
  useEffect(() => input.onChange(listData), [listData]);

  return <View {...rest}>{listData.map(renderItem)}</View>;
};

export default FormList;
