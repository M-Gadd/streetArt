import React, { Component } from 'react'
import {
  Button,
  Col,
  Container,
  Input,
  Label,
  Row
} from 'reactstrap'
import api from '../api';

class NewStreetArt extends Component {
  constructor(props) {
    super(props)
    this.state = {
      lat: '',
      lng: '',
      picture: null
    }
    // this.handleInputChange = this.handleInputChange.bind(this)
    // this.handleFileChange = this.handleFileChange.bind(this)
    // this.addStreetArtAndRedirectToDetailPage = this.addStreetArtAndRedirectToDetailPage.bind(this)
    // this.getCurrentCoordinates = this.getCurrentCoordinates.bind(this)
  }

  getCurrentCoordinates = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        console.log("The current coords are", position.coords)
        this.setState({
          lng: position.coords.longitude,
          lat: position.coords.latitude
        })
      })
    }
  }
  handleInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  handleFileChange = (e) => {
    console.log("The file added by the user is: ", e.target.files[0])
    this.setState({
      picture: e.target.files[0]
    })
  }

  addStreetArtAndRedirectToDetailPage = (e) => {
    // To send information with "form-data" (like in Postman)
    const uploadData = new FormData()
    uploadData.append("lng", this.state.lng)
    uploadData.append("lat", this.state.lat)
    uploadData.append("picture", this.state.picture)

    api.addStreetArt(uploadData)
      .then(createdStreetArt => {
        // Redirect the user to another page
        this.props.history.push('/street-arts') // TODO
      })
      .catch(err => {
        console.log("Error while adding the street art: ", err)
      })
  }
  render() {
    return (
      <Container className="NewStreetArt">
        <h1>New Street Art</h1>

        <Button className="my-4" color="danger" block outline onClick={this.getCurrentCoordinates}>
          Get Current Coordinates
        </Button>

        <Row className="my-4">
          <Col sm={3}>
            <Label for="exampleEmail">Coordinates</Label>
          </Col>
          <Col>
            <Input type="number" value={this.state.lng} onChange={this.handleInputChange} name="lng" placeholder="Longitude" />
          </Col>
          <Col>
            <Input type="number" value={this.state.lat} onChange={this.handleInputChange} name="lat" placeholder="Latitude" />
          </Col>
        </Row>

        <Row className="my-4">
          <Col sm={3}>
            <Label for="exampleEmail">Picture</Label>
          </Col>
          <Col>
            <Input type="file" name="picture" onChange={this.handleFileChange} />
          </Col>
        </Row>

        <Button className="my-4" color="danger" block onClick={this.addStreetArtAndRedirectToDetailPage}>
          Add Street Art
        </Button>

      </Container>
    )
  }
}

export default NewStreetArt
