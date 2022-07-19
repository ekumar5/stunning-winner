import React from 'react';
import { Form } from 'react-final-form';
import { Container, StyledLogo } from './FormTemplate.styles';

type FormTemplateProps<FormValues> = {
  Component: any;
  logo?: boolean;
  [otherProps: string]: any;
};

function FormTemplate<FormValues>({
  onSubmit,
  Component,
  logo,
  ...rest
}: FormTemplateProps<FormValues>) {
  return (
    <>
      {logo && <StyledLogo />}
      <Container>
        <Form<FormValues> onSubmit={onSubmit} {...rest}>
          {(formProps) => <Component {...formProps} {...rest} />}
        </Form>
      </Container>
    </>
  );
}

FormTemplate.defaultProps = {};

export default FormTemplate;
