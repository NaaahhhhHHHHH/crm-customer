import React, { useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CInputGroup,
  CInputGroupText,
  CRow,
  CImage,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { toast } from 'react-hot-toast'
import { Link, useNavigate } from 'react-router-dom'
import PhoneInput from 'react-phone-input-2'
import { updateData, createData, deleteData, getData } from '../../../api'
import 'react-phone-input-2/lib/style.css'
import { cilLockLocked, cilUser, cilMobile, cilPhone } from '@coreui/icons'

const apiUrl =
  import.meta.env.MODE === 'product'
    ? import.meta.env.VITE_API_URL
    : import.meta.env.VITE_API_LOCAL
const BASE_URL = `${apiUrl}/api`

const Register = () => {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [repeatPassword, setRepeatPassword] = useState('')
  const [mobile, setMobile] = useState('')
  const [work, setWork] = useState('')

  const validatePhoneNumber = (phone) => {
    // Basic validation: at least 10 digits (you can customize)
    const digitsOnly = phone.replace(/\D/g, '')
    return digitsOnly.length >= 10
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (password !== repeatPassword) {
      toast.error('Repeat password is incorrect')
      return
    }

    if (!validatePhoneNumber(mobile)) {
      toast.error('Mobile phone is invalid')
      return
    }

    if (work && !validatePhoneNumber(work)) {
      toast.error('Work phone is invalid')
      return
    }

    try {
      let requestData = {
        username,
        name,
        email,
        password,
        mobile,
        work,
      }
      await createData('customer', requestData)
      toast.success('Registration successful, please verify your email')
      navigate('/login')
    } catch (error) {
      toast.error(
        (error.response && error.response.data
          ? error.response.data.message
          : '') || error.message || 'Registration failed',
      )
    }
  }

  return (
    <>
      <div style={{ position: 'absolute' }}>
        <CImage src={BASE_URL + '/downloadLogo'} alt="Logo" height={50} />
      </div>
      <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
        <CContainer>
          <CRow className="justify-content-center">
            <CCol md={6} lg={6} xl={6}>
              <CCard className="mx-4">
                <CCardBody className="p-4">
                  <CForm onSubmit={handleSubmit}>
                    <h1>Register</h1>
                    <p className="text-body-secondary">Create your account</p>

                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <input
                        required
                        type="text"
                        placeholder="Full Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        autoComplete="name"
                        className="form-control"
                      />
                    </CInputGroup>

                    <CInputGroup className="mb-3">
                      <CInputGroupText>@</CInputGroupText>
                      <input
                        required
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        autoComplete="email"
                        className="form-control"
                      />
                    </CInputGroup>

                    <CInputGroup className="mb-3" style={{ alignItems: 'center' }}>
                      <CInputGroupText>
                        <CIcon icon={cilMobile} />
                      </CInputGroupText>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <PhoneInput
                          country={'us'}
                          enableSearch
                          value={mobile}
                          onChange={setMobile}
                          inputStyle={{ width: '100%', height: '100%' }}
                          containerStyle={{ width: '100%', height: '100%' }}
                          buttonStyle={{ border: 'none' }}
                          inputProps={{
                            name: 'mobile',
                            required: true,
                            autoComplete: 'tel',
                          }}
                        />
                      </div>
                    </CInputGroup>

                    <CInputGroup className="mb-3" style={{ alignItems: 'center' }}>
                      <CInputGroupText>
                        <CIcon icon={cilPhone} />
                      </CInputGroupText>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <PhoneInput
                          country={'us'}
                          enableSearch
                          value={work}
                          onChange={setWork}
                          inputStyle={{ width: '100%', height: '100%' }}
                          containerStyle={{ width: '100%', height: '100%' }}
                          buttonStyle={{ border: 'none' }}
                          inputProps={{
                            name: 'work',
                            autoComplete: 'tel',
                          }}
                        />
                      </div>
                    </CInputGroup>

                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <input
                        required
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        minLength={6}
                        autoComplete="username"
                        className="form-control"
                      />
                    </CInputGroup>

                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <input
                        required
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                        title="Must contain at least one number, one uppercase and lowercase letter, and at least 8 or more characters"
                        minLength={8}
                        autoComplete="new-password"
                        className="form-control"
                      />
                    </CInputGroup>

                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <input
                        required
                        type="password"
                        placeholder="Repeat password"
                        value={repeatPassword}
                        onChange={(e) => setRepeatPassword(e.target.value)}
                        className="form-control"
                      />
                    </CInputGroup>

                    <CRow>
                      <CCol xs={5}>
                        <CButton type="submit" color="primary">
                          Create Account
                        </CButton>
                      </CCol>
                      <CCol xs={6}>
                        <Link to="/login">
                          <CButton color="link" className="px-0">
                            Already have account, Sign in
                          </CButton>
                        </Link>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
        </CContainer>
      </div>
    </>
  )
}

export default Register
