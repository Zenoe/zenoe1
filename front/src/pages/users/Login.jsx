import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, Link, useNavigate } from 'react-router-dom'
import { useIntl } from 'react-intl'

import * as Yup from 'yup'

import { Box, Grid, Typography } from '@mui/material'
import { Formik, Form } from 'formik'
import Textfield from '@/components/FormsUI/Textfield'
import DateTimePicker from '@/components/FormsUI/DataTimePicker'
import Checkbox from '@/components/FormsUI/Checkbox'
import SubmitButton from '@/components/FormsUI/SubmitButton'
import Alert from '@mui/material/Alert'
import countries from '@/../data/countries.json'
import Loading from '@/components/Loading'

import PropTypes from 'proptypes'

import { login } from '@/actions/userActions'

import loginbg from '@/assets/img/loginbg.jpg'
const INITIAL_FORM_STATE = {
  email: '',
  password: ''
}

const FORM_VALIDATION = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email.')
    .required('Required'),
  password: Yup.string()
    .required('Required')
})

const Login = () => {
  const [passwordShown, setPasswordShown] = useState(false)
  const { formatMessage } = useIntl()

  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { loading, error, userInfo } = userLogin
  const { state } = useLocation()
  const navigate = useNavigate()
  useEffect(() => {
    if (userInfo) {
      navigate(state?.path || '/')
    }
  }, [navigate, userInfo])

  return (
      <Box
        sx={{
          display: 'flex',
          backgroundColor: 'blue',
          height: '100vh',
          backgroundImage: `url(${loginbg})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          alignItem: 'center'
        }}
      >
        <Box
          sx={{
            width: '520px',
            /* border: '1px solid red', */
            borderRadius: '12px',
            backgroundColor: '#F0F0F0',
            padding: 2,
            margin: 'auto'
          }}
        >
          {error && <Alert severity="error">{error}</Alert>}
          {loading && <Loading />}

          <Formik
            initialValues={{
              ...INITIAL_FORM_STATE
            }}
            validationSchema={FORM_VALIDATION}
            onSubmit={values => {
              dispatch(login(values.email, values.password))
            }}
          >
            <Form>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography
                    sx={{
                      textAlign: 'center'
                    }}
                  >
                    网络测试管理系统
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
        </Box>
      </Box>
  )
}

Login.propTypes = {
  // children: PropTypes.node,
  onSubmit: PropTypes.func
  // schema: PropTypes.shape({
  //   type: PropTypes.string.isRequired,
  // }).isRequired,
}

export default Login
