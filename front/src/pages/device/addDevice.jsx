import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import {
  Container,
  Grid,
  Alert,
  Typography
} from '@mui/material'

import Loading from '@/components/Loading'
import Textfield from '@/components/FormsUI/Textfield'
const INITIAL_FORM_STATE = {
  name: ''
}
const FORM_VALIDATION = Yup.object().shape({
  name: Yup.string()
    .required('Required')
})
export default function AddDeviceDlg () {
  const [message, setMessage] = useState(null)

  const userRegister = useSelector((state) => state.userRegister)
  const { loading, error } = userRegister
  const dispatch = useDispatch()

  return (
    <Grid container>
      <Grid item xs={12}>
        <Container maxWidth="md">
          <div>
            {error && <Alert severity="error">{error}</Alert>}
            {message && <Alert severity="error">{message}</Alert>}
            {loading && <Loading />}

            <Formik
              initialValues={{
                ...INITIAL_FORM_STATE
              }}
              validationSchema={FORM_VALIDATION}
              onSubmit={values => {
                const { name, email, password, pic } = values
                if (values.password !== values.confirmpassword) {
                  setMessage('Passwords do not match')
                } else {
                  dispatch(register(name, email, password, pic))
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

                  <Grid item xs={12}>
                    <SubmitButton>
                      Register
                    </SubmitButton>
                  </Grid>
              </Grid>

              </Form>
            </Formik>

          </div>
        </Container>
      </Grid>
    </Grid>
  )
};
