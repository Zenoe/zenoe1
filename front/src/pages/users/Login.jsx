import {useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";

import FlexBox from '@/components/FlexBox';
import { useIntl } from 'react-intl';

import * as Yup from 'yup';

import { Container, Grid, Typography } from "@mui/material";
import { Link } from 'react-router-dom';
import { Formik, Form } from 'formik';
import Textfield from '@/components/FormsUI/Textfield';
import Select from '@/components/FormsUI/Select';
import DateTimePicker from '@/components/FormsUI/DataTimePicker';
import Checkbox from '@/components/FormsUI/Checkbox';
import SubmitButton from '@/components/FormsUI/SubmitButton';
import Alert from '@mui/material/Alert';
import countries from '@/../data/countries.json';
import Loading from "@/components/Loading";

import { useNavigate } from 'react-router-dom';

import PropTypes from 'proptypes';

import { login } from "@/actions/userActions";

const INITIAL_FORM_STATE = {
  email: '',
  password: '',
};

const FORM_VALIDATION = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email.')
    .required('Required'),
  password: Yup.string()
    .required('Required'),
});

const Login = () => {
  const [passwordShown, setPasswordShown] = useState(false);
  const { formatMessage } = useIntl();

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  const navigate = useNavigate();
  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [navigate, userInfo]);

    return (
      <Grid container>
        {error && <Alert severity="error">{error}</Alert>}
        {loading && <Loading />}

        <Grid item xs={12}>
          <Container maxWidth="md">
            <Formik
              initialValues={{
                ...INITIAL_FORM_STATE
              }}
              validationSchema={FORM_VALIDATION}
              onSubmit={values => {
                dispatch(login(values.email, values.password));
              }}
            >
              <Form>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Typography>
                      LOGIN
                    </Typography>
                  </Grid>

                  <Grid item xs={12}>
                    <Textfield
                      name="email"
                      label="Email"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Textfield
                      name="password"
                      label="Password"
                      type={passwordShown ? 'text' : 'password'}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <SubmitButton>
                      Login
                    </SubmitButton>
                  </Grid>

                  <Grid item xs={12}>
                    Don't have an account ? <Link to="/register">Register Here</Link>

                    {/* <Link to="/auth/forgot-password"> */}
                    {/*   {formatMessage({ */}
                    {/*     id: 'Auth.link.forgot-password', */}
                    {/*     defaultMessage: 'Forgot your password?', */}
                    {/*   })} */}
                    {/* </Link> */}
                  </Grid>
                </Grid>
              </Form>
            </Formik>
          </Container>
        </Grid>
      </Grid>
  );
};

Login.propTypes = {
  // children: PropTypes.node,
  onSubmit: PropTypes.func,
  // schema: PropTypes.shape({
  //   type: PropTypes.string.isRequired,
  // }).isRequired,
};

export default Login;
