import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import {
  Container,
  Grid,
  Typography
} from '@mui/material';
import Textfield from '@/components/FormsUI/Textfield';
import Select from '@/components/FormsUI/Select';
import DateTimePicker from '@/components/FormsUI/DataTimePicker';
import Checkbox from '@/components/FormsUI/Checkbox';
import Button from '@/components/FormsUI/Button';
import countries from '@/../data/countries.json';


const INITIAL_FORM_STATE = {
  username: 's',
  country: 'CN',
  email: '',
  termsOfService: true
};

const FORM_VALIDATION = Yup.object().shape({
  username: Yup.string()
    .required('Required'),
  email: Yup.string()
    .email('Invalid email.'),
    // .required('Required'),
  termsOfService: Yup.boolean()
    .oneOf([true], 'The terms and conditions must be accepted.')
    .required('The terms and conditions must be accepted.'),
});

const Register = () => {

  return (
    <Grid container>
      <Grid item xs={12}>
        <Container maxWidth="md">
          <div>

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
                      Your details
                    </Typography>
                  </Grid>

                  <Grid item xs={12}>
                    <Textfield
                      name="username"
                      label="First Name"
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Textfield
                      name="email"
                      label="Email"
                    />
                  </Grid>

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
                    <Button>
                      Register
                    </Button>
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
