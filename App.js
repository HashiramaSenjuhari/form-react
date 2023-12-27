import React, { useState } from 'react';

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    contacts: '',
  });

  const [validationMessages, setValidationMessages] = useState({
    firstName: '',
    lastName: '',
    email: '',
    contacts: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setValidationMessages((prevMessages) => ({ ...prevMessages, [name]: '' }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newValidationMessages = {};

    // Basic validation for empty fields
    Object.keys(formData).forEach((field) => {
      if (!formData[field]) {
        newValidationMessages[field] = `Please enter your ${field.toLowerCase()}!`;
      }
    });

    // Additional constraints for the "Contacts" field
    const contactsRegex = /^\d{10}$/; // Assuming a valid contact is a 10-digit number
    if (!contactsRegex.test(formData.contacts)) {
      newValidationMessages.contacts = 'Invalid contact number. Please enter a 10-digit number.';
    }

    // If any validation fails, update messages and return
    if (Object.keys(newValidationMessages).length > 0) {
      setValidationMessages(newValidationMessages);
      return;
    }

    // If all validations pass, show success message
    setValidationMessages({});
    alert('Registration successful!');
  };

  return (
    <div style={containerStyle}>
      <form style={formStyle} onSubmit={handleSubmit}>
        <label style={labelStyle}>
          First Name:
          <input
            style={inputStyle}
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
          />
          {validationMessages.firstName && (
            <span style={errorMessageStyle}>{validationMessages.firstName}</span>
          )}
        </label>
        <label style={labelStyle}>
          Last Name:
          <input
            style={inputStyle}
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
          />
          {validationMessages.lastName && (
            <span style={errorMessageStyle}>{validationMessages.lastName}</span>
          )}
        </label>
        <label style={labelStyle}>
          Email:
          <input style={inputStyle} type="email" name="email" value={formData.email} onChange={handleChange} />
          {validationMessages.email && (
            <span style={errorMessageStyle}>{validationMessages.email}</span>
          )}
        </label>
        <label style={labelStyle}>
          Contacts:
          <input
            style={inputStyle}
            type="tel"
            name="contacts"
            value={formData.contacts}
            onChange={handleChange}
          />
          {validationMessages.contacts && (
            <span style={errorMessageStyle}>{validationMessages.contacts}</span>
          )}
        </label>
        <button style={buttonStyle} type="submit">
          Register
        </button>
      </form>
    </div>
  );
};

const containerStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px',
};

const formStyle = {
  width: '300px',
  padding: '20px',
  border: '1px solid #ccc',
  borderRadius: '5px',
  boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
};

const labelStyle = {
  display: 'block',
  marginBottom: '10px',
  fontSize: '14px',
  fontWeight: 'bold',
};

const inputStyle = {
  width: '100%',
  padding: '8px',
  boxSizing: 'border-box',
  marginBottom: '10px',
};

const buttonStyle = {
  width: '100%',
  padding: '10px',
  backgroundColor: '#4caf50',
  color: 'white',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
};

const errorMessageStyle = {
  color: 'red',
  fontSize: '12px',
  marginTop: '5px',
};

export default RegistrationForm;
