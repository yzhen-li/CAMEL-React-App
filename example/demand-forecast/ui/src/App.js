import React, { Component } from 'react';
import './App.css';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.css';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      formData: {
        dataCenter: 'Holdem',
        availability: 0.95,
        sepalLength: 4,
        sepalWidth: 2,
        petalLength: 1,
        petalWidth: 0
      },
      result: ""
    };
  }

  handleChange = (event) => {
    const value = event.target.value;
    const name = event.target.name;
    var formData = this.state.formData;
    formData[name] = value;
    this.setState({
      formData
    });
  }

  handlePredictClick = (event) => {
    const formData = this.state.formData;
    this.setState({ isLoading: true });
    fetch('http://127.0.0.1:5000/prediction/',
      {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(formData)
      })
      .then(response => response.json())
      .then(response => {
        this.setState({
          result: response.result,
          isLoading: false
        });
      });
  }

  handleCancelClick = (event) => {
    this.setState({ result: "" });
  }

  render() {
    const isLoading = this.state.isLoading;
    const formData = this.state.formData;
    const result = this.state.result;

    var datacenters = []
    datacenters.push(<option key = 'Holdem' value = 'Holdem'>Holdem</option>)
    datacenters.push(<option key = 'War' value = 'War'>War</option>)

    var availabilities =[]
    for (var i = 0.05; i <= 1; i = +(i + 0.05).toFixed(2)) {
      availabilities.push(<option key = {i} value = {i}>{i}</option>);
    }
    return (
      <Container>
        <div>
          <h1 className="title">AI Demand Forecast</h1>
        </div>
        <div className="content">
          <Form>
            <Form.Row>
              <Form.Group as={Col}>
                <Form.Label>Data Center</Form.Label>
                <Form.Control
                  as="select"
                  value={formData.dataCenter}
                  name="dataCenter"
                  onChange={this.handleChange}>
                  {datacenters}
                </Form.Control>
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>Availability</Form.Label>
                <Form.Control
                  as="select"
                  value={formData.availability}
                  name="Availability"
                  onChange={this.handleChange}>
                  {availabilities}
                </Form.Control>
              </Form.Group>
            </Form.Row>
            <Row>
              <Col>
                <Button
                  block
                  variant="success"
                  disabled={isLoading}
                  onClick={!isLoading ? this.handlePredictClick : null}>
                  { isLoading ? 'Forecasting' : 'Forecast' }
                </Button>
              </Col>
              <Col>
                <Button
                  block
                  variant="danger"
                  disabled={isLoading}
                  onClick={this.handleCancelClick}>
                  Reset
                </Button>
              </Col>
            </Row>
          </Form>
          {result === "" ? null :
            (<Row>
              <Col className="result-container">
                <h5 id="result">{result}</h5>
              </Col>
            </Row>)
          }
        </div>
      </Container>
    );
  }
}

export default App;