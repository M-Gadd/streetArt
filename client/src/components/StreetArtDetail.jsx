import React, { Component } from 'react';
import api from '../api'
import mapboxgl from 'mapbox-gl/dist/mapbox-gl'


// Inform your Mapbox token (https://www.mapbox.com/account/)
mapboxgl.accessToken = 'pk.eyJ1IjoibWdhZCIsImEiOiJjanZvNnBtbWExaXJxNGNvZmFlNjJqcWVhIn0.ZBKEKEsH0sLthil8ACPvxA'

class StreetArtDetail extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      art: null
     }

     this.mapRef = React.createRef() // NEW
     this.map = null // NEW
     this.marker = null // NEW
  }



  initMap(lng, lat) { // NEW METHOD
    // console.log("HHEEERRR", lng, lat, this.mapRef.current)
    // Embed the map where "this.mapRef" is defined in the render
    this.map = new mapboxgl.Map({
      container: this.mapRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lng, lat],
      zoom: 10
    })

    // Add zoom control on the top right corner
    this.map.addControl(new mapboxgl.NavigationControl())

    // Create a marker on the map with the coordinates ([lng, lat])
    this.marker = new mapboxgl.Marker({ color: 'red' })
      .setLngLat([lng, lat])
      .addTo(this.map)
  }

  componentDidMount(){
    api.getStreetArt(this.props.match.params.streetArtId)
    .then(artDetail => {
      // console.log("FUCCK", artDetail)
      this.setState({art : artDetail})
      
      let [lng,lat] = artDetail.location.coordinates // NEW
        if (lng && lat ) {
          this.initMap(lng,lat) // NEW
        }
    })
  }

  // BONUS: Display the picture fullscreen when the user clicks on the picture and go back to the original view when the user clicks again.

  render() { 
    return ( 
      <div >
        <h3 style={{textAlign:"center"}}>Street Art Detail</h3>
        <div className="StreetDetail">

        {this.state.art &&  
            <div className="StreetDetail">
              <img style={{width:"100%"}} src={this.state.art.pictureUrl} alt="place holder"/>
               <hr/>

               <p>longitude: {this.state.art.location.coordinates[0]}</p>
               <p>latitude: {this.state.art.location.coordinates[1]}</p>

               <div ref={this.mapRef} style={{height: 400, width:410}}></div> {/* NEW */}

            </div>


        }
        </div>

      </div>
     );
  }
}
 
export default StreetArtDetail;