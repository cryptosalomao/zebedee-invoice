import { Field, Form, Formik } from 'formik'
import React, { Component } from 'react'
import styled from 'styled-components'
import api from '../common/api'
import { withTranslation } from 'react-i18next'
import PropTypes from 'prop-types'

const KeyInformation = styled.div`
  margin: 60px auto 20px auto;
  height: 200px;
  max-width: 300px;
  text-align: left;
  padding: 0;

  label {
    margin: 10px 0 15px 0;
    font-family: ${props => props.theme.font};
    font-size: 1.2em;
    font-weight: ${props => props.theme.fontWeights.bold};
    color: #000000;
    display: block;
  }

  input {
    margin: 0 0 15px 0;
    width: 100%;
    height: 50px;
    background-color: #f5f6f8;
    font-family: ${props => props.theme.font};
    font-size: 1em;
    font-weight: ${props => props.theme.fontWeights.regular};
    color: #000000;
    border: none;
    border-radius: 0.4rem;
    padding: 0 0 0 10px;
    box-sizing: border-box;
    display: block;
    outline: none;
  }
`
const Submit = styled.button`
  margin: 0 auto;
  width: 100%;
  height: 50px;
  background-color: ${props => props.theme.colors.blue};
  font-family: ${props => props.theme.font};
  font-weight: ${props => props.theme.fontWeights.bold};
  font-size: 1em;
  color: #ffffff;
  border: none;
  border-radius: 0.4rem;
  display: block;
  cursor: pointer;
  outline: none;
`

class Key extends Component {
  handleKeyData = (values) => {
    const { key } = values

    const headers = {
      apiKey: key,
      'Content-Type': 'application/json'
    }

    api
      .get('/wallet', { headers: headers })
      .then((response) => {
        localStorage.setItem('apiKey', key)
        window.location.reload()
      })
      .catch((error) => {
        console.error(error.request)
      })
  }

  render () {
    const { t } = this.props

    return (
      <KeyInformation>
        <Formik
          initialValues={{
            key: ''
          }}
          onSubmit={(values) => this.handleKeyData(values)}
        >
          <Form>
            <label htmlFor='key'>{t('key.insert')}</label>
            <Field type='text' name='key' />
            <Submit type='submit'>
              {t('key.signin')}
            </Submit>
          </Form>
        </Formik>
      </KeyInformation>
    )
  }
}

Key.propTypes = {
  t: PropTypes.func
}

const translate = withTranslation()(Key)

export default translate
