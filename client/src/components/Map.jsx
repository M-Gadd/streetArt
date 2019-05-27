import React, { Component } from 'react';
import api from '../api'
import mapboxgl from 'mapbox-gl/dist/mapbox-gl'

mapboxgl.accessToken = 'pk.eyJ1IjoibWdhZCIsImEiOiJjanZvNnBtbWExaXJxNGNvZmFlNjJqcWVhIn0.ZBKEKEsH0sLthil8ACPvxA'


class Map extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      coor: []
     }

    this.mapRef = React.createRef() // NEW
    this.map = null // NEW
    this.marker = null // NEW
  }

  initMap() { // NEW METHOD
    // console.log("HHEEERRR", lng, lat, this.mapRef.current)
    // Embed the map where "this.mapRef" is defined in the render
    this.map = new mapboxgl.Map({
      container: this.mapRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      // center: [lng, lat],
      center: [36.529048, 18.027585],
      zoom: 1
    })

    // Add zoom control on the top right corner
    this.map.addControl(new mapboxgl.NavigationControl())

    // Create a marker on the map with the coordinates ([lng, lat])
    this.state.coor.forEach(one => {
      let lng = one[0];
      let lat =  one[1]
      this.marker = new mapboxgl.Marker({ color: 'red' })
        .setLngLat([lng, lat])
        .addTo(this.map)

    })
  }

  componentDidMount(){
    api.getStreetArts()
      .then(allArts => {
        // allArts.map( oneArt => {

          const filteredCoordinats = allArts.map(art => art.location.coordinates)
          console.log("FUUUCCKK", filteredCoordinats)

          this.setState({
            coor : filteredCoordinats
        })
        this.initMap()

      })
  }
  render() { 
    return ( 
      <div className="map">
          <div ref={this.mapRef} style={{height: 400, width:410}}></div> {/* NEW */}
      </div>
     );
  }
}
 
export default Map;