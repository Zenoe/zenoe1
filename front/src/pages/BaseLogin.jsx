import React, { useState } from 'react';

import FlexBox from '@/components/FlexBox';
import { useIntl } from 'react-intl';
// import { styled } from '@mui/material/styles';
import styled from 'styled-components';

import * as Yup from 'yup';

// import FieldActionWrapper from '../FieldActionWrapper';

import { Container, Grid, Typography } from "@mui/material";
import Link from '@mui/material/Link';

import { Formik, Form } from 'formik';
import Textfield from '@/components/FormsUI/Textfield';
import Select from '@/components/FormsUI/Select';
import DateTimePicker from '@/components/FormsUI/DataTimePicker';
import Checkbox from '@/components/FormsUI/Checkbox';
import Button from '@/components/FormsUI/Button';
import countries from '@/../data/countries.json';

import PropTypes from 'prop-types';
const PasswordInput = styled(Textfield)`
// Removing the clear and reveal password icons from Internet Explorer
  ::-ms-reveal {
    display: none;
  }
`;

const INITIAL_FORM_STATE = {
  username: '',
  password: '',
};

const FORM_VALIDATION = Yup.object().shape({
  username: Yup.string()
    .required('Required'),
  password: Yup.string()
    .required('Required'),
});

const BaseLogin = (/* { onSubmit, schema  } */) => {
  const [passwordShown, setPasswordShown] = useState(false);
  const { formatMessage } = useIntl();

  return (
    <Container maxWidth="sm" >
      <Grid container>
        <Grid item xs={12}>
          <Container maxWidth="md">
            <Formik
              initialValues={{
                ...INITIAL_FORM_STATE
              }}
              validationSchema={FORM_VALIDATION}
              onSubmit={values => {
                console.log(values);
              }}
            >
              <Form>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Typography>
                      Please Login!
                    </Typography>
                  </Grid>

                  <Grid item xs={12}>
                    <Textfield
                      name="username"
                      label="First Name"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <PasswordInput
                      name="password"
                      label="Password"
                      type={passwordShown ? 'text' : 'password'}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Button>
                      Login
                    </Button>
                  </Grid>

                  <Grid item xs={12}>
                    <Link to="/auth/forgot-password">
                      {formatMessage({
                        id: 'Auth.link.forgot-password',
                        defaultMessage: 'Forgot your password?',
                      })}
                    </Link>
                  </Grid>
                </Grid>
              </Form>
            </Formik>
          </Container>
        </Grid>
      </Grid>
    </Container>
  );
};

// BaseLogin.defaultProps = {
//   onSubmit: () => {},
// };

BaseLogin.propTypes = {
  // children: PropTypes.node,
  onSubmit: PropTypes.func,
  // schema: PropTypes.shape({
  //   type: PropTypes.string.isRequired,
  // }).isRequired,
};

export default BaseLogin;
