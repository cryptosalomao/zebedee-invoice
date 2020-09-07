import React, { Component } from 'react'
import styled from 'styled-components'
import Modal from 'styled-react-modal'
import PropTypes from 'prop-types'

const ModalLayout = Modal.styled`
  width: 400px;
  height: 500px;
  background-color: #ffffff;
  border-radius: 0.4rem;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.05);
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
`
const Heading = styled.div`
  margin: 0 0 20px 0;
  height: 40px;
  display: block;
`

const Title = styled.h1`
  margin: 0;
  float: left;
  font-family: ${props => props.theme.font};
  font-size: 1.4em;
  color: ${props => props.theme.colors.heading};
  display: inline-block;
`

class Withdraw extends Component {
  render () {
    const { visibility, onHandler } = this.props

    return (
      <ModalLayout
        isOpen={visibility}
        onBackgroundClick={onHandler}
        onEscapeKeydown={onHandler}
      >
        <Heading>
          <Title>
            Withdraw
          </Title>
        </Heading>
      </ModalLayout>
    )
  }
}

Withdraw.propTypes = {
  visibility: PropTypes.bool,
  onHandler: PropTypes.func
}

export default Withdraw
