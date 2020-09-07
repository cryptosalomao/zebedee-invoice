import React, { Component } from 'react'
import { Col, Container, Row } from 'react-grid-system'
import styled from 'styled-components'
import media from 'styled-media-query'
import logo from '../../public/assets/img/zebedee.svg'
import Balance from './balance'
import TransactionsList from './transactions/TransactionsList'
import Invoices from './invoices'
import Language from './Language'
import Key from './Key'

const DashboardContainer = styled.div`
  ${media.lessThan('medium')`
    padding: 0.2rem;
  `}

  margin: 40px auto;
  background-color: #ffffff;
  max-width: 1000px;
  text-align: center;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.05);
  border-radius: 0.5rem;
  padding: 2rem;
  box-sizing: border-box;
`
const Logo = styled.div`
  ${media.lessThan('medium')`
    margin: 25px 0 0 0;
  `}

  margin: 0;
  width: 100%;
  height: 60px;

  img {
    float: left;
    width: 140px;
    display: block;
  }
`

export default class Dashboard extends Component {
  constructor (props) {
    super(props)

    this.state = {
      hasKey: false
    }
  }

  componentDidMount = () => {
    const apiKey = localStorage.getItem('apiKey')

    if (apiKey !== null) {
      this.setState({
        hasKey: true
      })
    }
  }

  showDashboard = () => {
    const dashboard = (
      <Row>
        <Col md={6} sm={12}>
          <Balance />
          <TransactionsList />
        </Col>
        <Col md={6} sm={12}>
          <Invoices />
        </Col>
      </Row>
    )

    const login = (
      <Row>
        <Col md={12} sm={12}>
          <Key />
        </Col>
      </Row>
    )

    return this.state.hasKey ? dashboard : login
  }

  render () {
    return (
      <DashboardContainer>
        <Container>
          <Row>
            <Col md={6} sm={12}>
              <Logo>
                <img src={logo} />
              </Logo>
            </Col>
            <Col md={6} sm={12}>
              <Language />
            </Col>
          </Row>
          {this.showDashboard()}
        </Container>
      </DashboardContainer>
    )
  }
}
