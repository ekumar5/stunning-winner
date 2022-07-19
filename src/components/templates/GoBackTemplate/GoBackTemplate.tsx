import React from 'react';
import { GoBackTemplateProps } from './GoBackTemplate.props';
import {
  Container,
  Message,
  StyledButton,
  Title,
} from './GoBackTemplate.styles';

const GoBackTemplate = ({
  title,
  message,
  buttonTitle,
  onPress,
}: GoBackTemplateProps) => {
  return (
    <>
      <Container>
        <Title>{title}</Title>
        <Message>{message}</Message>
        <StyledButton onPress={onPress}>{buttonTitle}</StyledButton>
      </Container>
    </>
  );
};

export default GoBackTemplate;
