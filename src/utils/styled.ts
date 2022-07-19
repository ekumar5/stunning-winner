import baseStyled, { ThemedStyledInterface } from 'styled-components';
import { Themes } from '../theme/types';

export const styled = baseStyled as ThemedStyledInterface<Themes>;
