import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import api from '../api'
import { Table } from 'reactstrap';
// import { Media } from 'reactstrap';
import { Button } from 'reactstrap';


class List extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      streetArt: [],
      visited: [],
      isOpen: false,
      openedPicture: null
     }
  }



  handleVisited = (id) =>{
    if(!this.checkIfArtVisited(id)){
      api.addVisits(id)
        .then(visited => {
          api.getVisits()
            .then(visits => {
              this.setState({ visited: visits})
            })
          })
      

    } 

    if(this.checkIfArtVisited(id)){
      api.getVisits()
        .then(visits => {
          visits.forEach((visit, i) => {
            if (visit._streetArt._id === id) {
              api.deleteVisit(visit._id)
              .then( deleted => {
                this.setState(prevState => {
                  var array = [...this.state.visited]; // make a separate copy of the array
                  array.splice(i, 1);
                      this.setState({visited: array});
                })
              })
            }
          })
        }) 
      
    }
  }



  componentDidMount(){
    api.getStreetArts()
      .then(arts => {
        console.log(arts)
        this.setState({streetArt: arts})
      })

    api.getVisits()
      .then(visits => {
        console.log(visits)
        this.setState({visited: visits})
        })
  }

  checkIfArtVisited = (id) => {
    let bool;
    this.state.visited.map(one => {
      if (one._streetArt._id === id) {
        bool = true
      } 
    })
    return bool

  }


  handleShowDialog = (picture) => {
    this.setState({ openedPicture: picture });
    this.setState({ isOpen: !this.state.isOpen });
  };


  render() { 
    return ( 
      <div>
        <Table dark>

          <thead>
            <tr style={{textAlign:"center"}}>
              <th>Picture</th>
              <th>Google Direction</th>
              <th>Visited</th>
              <th>Detail</th>
            </tr>
          </thead>

          <tbody>
              {this.state.streetArt && !this.state.isOpen && this.state.streetArt.map(art =>      
                
              <tr  key={art._id}>

                <td> 
                  <img 
                      onClick={() => this.handleShowDialog(art.pictureUrl)} 
                      style={{width:80}} 
                      src={art.pictureUrl} 
                      alt="placeHolder"/> 
                </td>

                <td  style={{textAlign:"center"}}> 
                  <a   className="location" 
                    href=
                      {`https://www.google.com/maps/dir//${art.location.coordinates[1]},
                      ${art.location.coordinates[0]}/@${art.location.coordinates[1]},
                      ${art.location.coordinates[0]}`}> 
                      <i 
                        class="fas fa-thumbtack">
                      </i>
                  </a>  
                    {/* {art.location.coordinates[0]},{art.location.coordinates[1]}  */}
                </td>

                {this.checkIfArtVisited(art._id) ? 
                  <td 
                    onClick={() => this.handleVisited(art._id)} >
                    <i 
                      style={{color:"yellow"}} 
                      class="fas fa-star">
                    </i>
                  </td> : 

                  <td 
                    onClick={() => this.handleVisited(art._id)} >
                    <i class="far fa-star"> </i>
                  </td>
                }

                <td>  
                  <Button  
                    color="danger"> 
                    <Link className="btnM" 
                      to={"/street-art-detail/" + art._id} >
                        Details
                    </Link>
                  </Button>
                </td>

            </tr> 
              
              )}
          </tbody>
        </Table>
          
      { this.state.openedPicture && this.state.isOpen && (
                    <dialog
                        className="dialog"
                        style={{ position: "absolute" }}
                        open
                        onClick={this.handleShowDialog}
                    >
                      <img
                        style={{width:"100%"}}
                        className=""
                        src={this.state.openedPicture}
                        onClick={this.handleShowDialog}
                        alt="no "
                      />
                    </dialog>
        )}


      </div>
     );
  }
}
 
export default List;