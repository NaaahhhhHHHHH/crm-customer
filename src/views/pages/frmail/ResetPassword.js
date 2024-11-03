import React, { useEffect, useState } from 'react'
import {
  CLink,
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
} from '@coreui/react'
import { Link } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import { message } from 'antd'
import { useNavigate } from 'react-router-dom'
import { cilMagnifyingGlass } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'

import axios from 'axios'
// import logoImange from 'src/assets/brand/logo.png'
const apiUrl =
  import.meta.env.MODE == 'product' ? import.meta.env.VITE_API_URL : import.meta.env.VITE_API_LOCAL
const BASE_URL = `${apiUrl}/api`
const VerifyMail = () => {
  const navigate = useNavigate()
  let token = new URLSearchParams(location.href.split('?')[1]).get('id')
  const [verified, setVerified] = useState(false)
  const [password, setPassword] = useState('')
  const [repeatPassword, setRepeatPassword] = useState('')

  useEffect(() => {
    verifyEmail()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (password != repeatPassword) {
      toast.error('Repeat password is incorrect')
      return
    }
    //setErrorMessage(null) // Clear previous errors
    try {
      // Call the login API function from api.js
      const response = await axios.post(
        BASE_URL + '/resetPassword',
        {password: password},
        {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        },
      ).then((res) => {
        // localStorage.setItem('CRM-ctoken', res.token)
        // dispatch({ type: 'set', user: res.user })
        // if (!res.user.verification) {
        //   navigate('/verification')
        // }
        toast.success('Password reset successful')
        // navigate('/')
      })
    } catch (error) {
      // Handle error (e.g., wrong credentials or server error)
      // setErrorMessage(error.message)
      // navigate('/500')
      toast.error((error.response && error.response.data ? error.response.data.message : '') || error.message)
    }
  }

  const handleError = (error) => {
    message.error('Your link is not valid or expired')
    if (error.status == 401 || error.status == 400) {
      navigate('/404')
    } else {
      navigate('/500')
    }
  }

  const verifyEmail = async () => {
    try {
      const response = await axios.post(
        BASE_URL + '/verifyEmail',
        {},
        {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        },
      )
      if (response.status === 200) {
        // localStorage.setItem('CRM-ctoken', response.data.token)
        // message.success(`Verify email successful`)
        setVerified(true)
      }
    } catch (error) {
      handleError(error)
    }
  }

  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      {verified && (
        <>
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={5}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm onSubmit={handleSubmit}>
                    <h3>Reset Password</h3>
                    {/* <p className="text-body-secondary">Sign In to your account</p> */}
                    <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      required
                      type="password"
                      onChange={(e) => setPassword(e.target.value)}
                      pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                      title="Must contain at least one  number and one uppercase and lowercase letter, and at least 8 or more characters"
                      placeholder="Password"
                      autoComplete="new-password"
                      minLength={8}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-4">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      onChange={(e) => setRepeatPassword(e.target.value)}
                      required
                      placeholder="Repeat password"
                    />
                  </CInputGroup>
                    <CRow>
                      <CCol xs={4}>
                        <CButton color="primary" className="px-4" type="submit">
                          Submit
                        </CButton>
                      </CCol>
                      <CCol xs={7}>
                        <Link to="/login">
                          <CButton color="primary" className="px-4" tabIndex={-1}>
                            Back to login
                          </CButton>
                        </Link>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
        </>
      )}
    </div>
  )
}

export default VerifyMail
