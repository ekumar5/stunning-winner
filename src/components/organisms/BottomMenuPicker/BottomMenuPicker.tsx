import BottomSheet, {
  BottomSheetBackdrop,
  TouchableOpacity,
} from '@gorhom/bottom-sheet';
import React, { useEffect, useRef } from 'react';
// @ts-ignore
import { useLayout } from 'react-native-hooks';
import Spacer from '../../atoms/Spacer/Spacer';
import { Container, StyledItem } from './BottomMenuPicker.styles';
import { BottomMenuItem, BottomMenuPickerProps } from './BottomMenuPickerProps';

export const BottomMenuPicker = ({
  data,
  visible,
  onDismiss,
  onItemPress,
}: BottomMenuPickerProps) => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const { onLayout, ...layout } = useLayout();

  useEffect(() => {
    const bottomSheet = bottomSheetRef.current;
    if (!bottomSheet) {
      return;
    }

    if (visible) {
      bottomSheet.expand();
    } else {
      bottomSheet.collapse();
    }
  }, [visible, bottomSheetRef]);

  const onPress = (id: string) => {
    onDismiss();
    onItemPress(id);
  };

  const renderItem = ({ iconLeft, id, title, ...rest }: BottomMenuItem) => (
    <TouchableOpacity onPress={() => onPress(id)}>
      <StyledItem key={id} iconLeft={iconLeft} title={title} {...rest} />
    </TouchableOpacity>
  );

  const onChange = (index: number) => {
    if (index <= 0) {
      onDismiss();
    }
  };

  return (
    <BottomSheet
      ref={bottomSheetRef}
      snapPoints={[0, layout.height]}
      index={-1}
      onChange={onChange}
      enableContentPanningGesture
      enableHandlePanningGesture={false}
      handleComponent={null}
      animationDuration={250}
      backgroundComponent={null}
      backdropComponent={BottomSheetBackdrop}>
      <Container onLayout={onLayout}>
        {data.map(renderItem)}
        <Spacer size={16} />
      </Container>
    </BottomSheet>
  );
};
