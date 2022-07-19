import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { DEFAULT_BUTTON_DELAY } from '../../../utils/constants';
import Button from '../../atoms/Button/Button';
import { DelayButtonProps } from './DelayButton.props';
import { StyledHelperText } from './DelayButton.styles';

/**
 * Button that can only be pressed once every few seconds. Specify the amount of delay between
 * presses with `delay` prop. Renders a HelperText with remaining time. Uncontrolled component.
 *
 * @see Button
 * @see {@link https://callstack.github.io/react-native-paper/button.html}
 */
const DelayButton = ({
  onPress,
  delay,
  children,
  ...rest
}: DelayButtonProps) => {
  const { t } = useTranslation();
  const [counter, setCounter] = useState<number>(0); // seconds

  useEffect(() => {
    if (counter <= 0) {
      return;
    }
    const timeout = setTimeout(() => setCounter(counter - 1), 1000);
    return () => clearTimeout(timeout);
  }, [counter]);

  const onPressCallback = () => {
    if (onPress) {
      onPress();
      setCounter(delay);
    }
  };

  return (
    <>
      <Button
        disabled={counter > 0}
        onPress={onPressCallback}
        children={children}
        {...rest}
      />
      <StyledHelperText type="info" visible={counter > 0} padding="none">
        {t('delayHint', { delay: counter })}
      </StyledHelperText>
    </>
  );
};

DelayButton.defaultProps = {
  delay: DEFAULT_BUTTON_DELAY,
};

export default DelayButton;
