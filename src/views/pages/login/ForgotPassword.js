import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { updateData, createData, deleteData, getData } from '../../../api'
import { toast } from 'react-hot-toast'
import { useSelector, useDispatch } from 'react-redux'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
  CFormCheck,
} from '@coreui/react'
import { useNavigate } from 'react-router-dom'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'

const Login = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  // State for form inputs
  const [email, setEmail] = useState('')
  const [disableSend, setDisableSend] = useState(false)
  // const [errorMessage, setErrorMessage] = useState(null)

  // Handle role change
  // const handleRoleChange = (e) => {
  //   setRole(e.target.value)
  // }

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault()
    //setErrorMessage(null) // Clear previous errors
    try {
      // Call the login API function from api.js
      setDisableSend(true)
      const data = await createData('sendEmailResetPassWord', { email: email}).then((res) => {
        // localStorage.setItem('CRM-ctoken', res.token)
        // dispatch({ type: 'set', user: res.user })
        // if (!res.user.verification) {
        //   navigate('/verification')
        // }
        toast.success('Password reset mail has been sent')
        // navigate('/')
      })
      setDisableSend(false)
    } catch (error) {
      // Handle error (e.g., wrong credentials or server error)
      // setErrorMessage(error.message)
      // navigate('/500')
      setDisableSend(false)
      toast.error((error.response && error.response.data ? error.response.data.message : '') || error.message)
    }
  }
  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={5}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm onSubmit={handleSubmit}>
                    <h3>Forgot Password</h3>
                    <p className="text-body-secondary">
                    Enter your email to reset your password</p>
                    <CInputGroup className="mb-3">
                    <CInputGroupText>@</CInputGroupText>
                      <CFormInput
                        type="email"
                        required
                        placeholder="Email"
                        title="Please enter a valid email"
                        onChange={(e) => setEmail(e.target.value)}
                        autoComplete="email"
                      />
                    </CInputGroup>
                    {/* <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Password"
                        autoComplete="current-password"
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </CInputGroup> */}
                    <CRow>
                      <CCol xs={4}>
                        <CButton disabled={disableSend} color="primary" className="px-4" type="submit">
                          Send
                        </CButton>
                      </CCol>
                      {/* <CCol xs={7}>
                        <Link to="/register">
                          <CButton color="primary" className="px-4" tabIndex={-1}>
                            Register
                          </CButton>
                        </Link>
                      </CCol> */}
                      {/* <CCol xs={5} className="text-right">
                        <CButton color="link" className="px-0">
                          Forgot password?
                        </CButton>
                      </CCol> */}
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
