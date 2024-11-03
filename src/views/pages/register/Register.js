import React from 'react'
import { useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { toast } from 'react-hot-toast'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { updateData, createData, deleteData, getData } from '../../../api'
import { cilLockLocked, cilUser, cilPhone, cilMedicalCross, cilMobile, cilUserX } from '@coreui/icons'

const Register = () => {
  const navigate = useNavigate()
  // State for form inputs
  const [username, setUsername] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [mobile, setMobile] = useState('')
  const [work, setWork] = useState('')
  const [repeatPassword, setRepeatPassword] = useState('')
  const [ssn, setSsn] = useState('')

  const validatePhoneNumber = (phone) => {
    // Regex pattern for phone number
    const phoneRegex = /^(\+1\s?)?(\(?\d{3}\)?[\s.-]?)?\d{3}[\s.-]?\d{4}$/;
    
    return phoneRegex.test(phone);
  }

  const handleError = (error) => {
    toast.error((error.response && error.response.data ? error.response.data.message: '') || error.message|| error.message)
  }

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault()
    //setErrorMessage(null) // Clear previous errors
    try {
      if (password != repeatPassword) {
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

      // Call the register API function from api.js
      let requestData = {
        username: username,
        name: name,
        email: email,
        password: password,
        mobile: mobile,
        work: work
      }
      const data = await createData('customer', requestData).then((res) => {
        toast.success('Registration successful, please verify your email')
        navigate('/login')
      })
      await createData('sendEmailConFirm', { email: email})
    } catch (error) {
      // Handle error (e.g., wrong credentials or server error)
      // setErrorMessage(error.message)
      // navigate('/500')
      handleError(error)
    }
  }
  return (
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
                    <CFormInput
                      required
                      type="name"
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Full Name"
                      autoComplete="name"
                    />
                  </CInputGroup>
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
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilMobile} />
                    </CInputGroupText>
                    <CFormInput
                      type="text"
                      required
                      placeholder="Mobile Phone Number"
                      onChange={(e) => setMobile(e.target.value)}
                      pattern="(?:\(\d{3}\)|\d{3})[\- ]?\d{3}[\- ]?\d{4}"
                      title="Please enter a valid phone number (e.g., 1234567890 or 123-456-7890 or (123) 456-7890)"
                      autoComplete="phonenumber"
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilPhone} />
                    </CInputGroupText>
                    <CFormInput
                      type="text"
                      placeholder="Work Phone Number"
                      onChange={(e) => setWork(e.target.value)}
                      pattern="(?:\(\d{3}\)|\d{3})[\- ]?\d{3}[\- ]?\d{4}"
                      title="Please enter a valid phone number (e.g., 1234567890 or 123-456-7890 or (123) 456-7890)"
                      autoComplete="phonenumber"
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput
                      required
                      type="username"
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="Username"
                      autoComplete="username"
                      minLength={6}
                    />
                  </CInputGroup>
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
  )
}

export default Register
