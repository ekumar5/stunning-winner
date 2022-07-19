import { ButtonProps } from '../../atoms/Button/Button.props';

export type DelayButtonProps = ButtonProps & {
  /**
   * The amount of time between presses of the button
   * */
  delay: number;
};
