import {useEffect, useState} from 'react'
import { useDispatch, useSelector } from "react-redux";

import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import {
  Container,
  Grid,
  Typography
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Loading from "@/components/Loading";
import Textfield from '@/components/FormsUI/Textfield';
import Select from '@/components/FormsUI/Select';
import DateTimePicker from '@/components/FormsUI/DataTimePicker';
import Checkbox from '@/components/FormsUI/Checkbox';
import SubmitButton from '@/components/FormsUI/SubmitButton';
import countries from '@/../data/countries.json';

import Alert from '@mui/material/Alert';

import { Link } from 'react-router-dom';

import { register } from "@/actions/userActions";

const INITIAL_FORM_STATE = {
  name: '',
  country: 'CN',
  email: '',
  password: '',
  confirmpassword: '',
  termsOfService: true
};

const FORM_VALIDATION = Yup.object().shape({
  name: Yup.string()
    .required('Required'),
  email: Yup.string()
    .email('Invalid email.')
    .required('Required'),
  password: Yup.string()
    .required(),
  termsOfService: Yup.boolean()
    .oneOf([true], 'The terms and conditions must be accepted.')
    .required('The terms and conditions must be accepted.'),
});

const Register = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState(null);

  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, userInfo } = userRegister;
  const dispatch = useDispatch();

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [navigate, userInfo]);

  return (
    <Grid container>
      <Grid item xs={12}>
        <Container maxWidth="md">
          <div>
            {error && <Alert severity="error">{error}</Alert>}
            {message &&<Alert severity="error">{message}</Alert>}
            {loading && <Loading />}

            <Formik
              initialValues={{
                ...INITIAL_FORM_STATE
              }}
              validationSchema={FORM_VALIDATION}
              onSubmit={values => {
                const { name, email, password, pic } = values
                if (values.password !== values.confirmpassword) {
                  setMessage("Passwords do not match");
                } else {
                  dispatch(register(name, email, password, pic));
                }
              }}
            >
              <Form>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Typography>
                      REGISTER
                    </Typography>
                  </Grid>

                  <Grid item xs={12}>
                    <Textfield
                      name="name"
                      label="Name"
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Textfield
                      name="email"
                      label="Email"
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Textfield
                      type="password"
                      name="password"
                      label="Password"
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Textfield
                      type="password"
                      name="confirmpassword"
                      label="Confirm Password"
                    />
                  </Grid>

                  {/* <Grid item xs={12}> */}
                  {/*   <Button */}
                  {/*     component='label' */}
                  {/*     variant="contained" component="label" */}
                  {/*     type="image/png" */}
                  {/*     name="avatar" */}
                  {/*     label="Profile Picture" */}
                  {/*   > */}
                  {/*     Upload */}
                  {/*   <input hidden accept="image/\*" multiple type="file" */}
                  {/*     onChange={e=> {console.log(e)}} */}
                  {/*   /> */}
                  {/*   </Button> */}
                  {/* </Grid> */}

                  <Grid item xs={12}>
                    <Select
                      name="country"
                      label="Country"
                      options={countries}
                    />
                  </Grid>

                  {/* <Grid item xs={6}> */}
                  {/*   <DateTimePicker */}
                  {/*     name="arrivealDate" */}
                  {/*     label="Arrival Date" */}
                  {/*   /> */}
                  {/* </Grid> */}

                  <Grid item xs={12}>
                    <Checkbox
                      name="termsOfService"
                      legend="Terms Of Service"
                      label="I agree"
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <SubmitButton>
                      Register
                    </SubmitButton>
                  </Grid>
                <Grid item xs={12}>
                  Have an Account ? <Link to="/login">Login</Link>
                </Grid>
              </Grid>

              </Form>
            </Formik>

          </div>
        </Container>
      </Grid>
    </Grid>
  );
};

export default Register
