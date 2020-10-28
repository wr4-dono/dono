import React, { Component } from 'react'
import axios from 'axios'
import { v4 as randomString } from 'uuid'
import Dropzone from 'react-dropzone'
import { GridLoader } from 'react-spinners'
import { connect } from 'react-redux';
import './NewDono.scss'
import { FaGlobe } from "react-icons/fa";
import { FaMailBulk } from "react-icons/fa";
import { FaPencilAlt } from "react-icons/fa";
import { FaPlayCircle } from "react-icons/fa";
import { FaGlobeAmericas } from "react-icons/fa";
import { FaRegNewspaper } from "react-icons/fa";
import { FaRegListAlt } from "react-icons/fa";
import { FaDonate } from "react-icons/fa";



class NewDono extends Component {
  constructor(props) {
    super()

    this.state = {
      isUploading: false,
      donoId: (props.location.donoInfo) ? props.location.donoInfo.dono_id : null,
      url: (props.location.donoInfo) ? props.location.donoInfo.picture_url : 'https://con-lorca.appspot.com/img/no-foto.png',
      title: (props.location.donoInfo) ? props.location.donoInfo.title : '',
      price: (props.location.donoInfo) ? props.location.donoInfo.price : '',
      description: (props.location.donoInfo) ? props.location.donoInfo.description : '',
      multiplePeople: (props.location.donoInfo) ? props.location.donoInfo.multiple_people : false,
      truckTrailer: (props.location.donoInfo) ? props.location.donoInfo.truck_trailer : false,
      dono_state: (props.location.donoInfo) ? props.location.donoInfo.dono_state : props.auth.user.user_state,
      zip_code: (props.location.donoInfo) ? props.location.donoInfo.zip_code : props.auth.user.zip_code,
      giver_id: (props.location.donoInfo) ? props.location.donoInfo.giver_id : props.auth.user.user_id,
      isEditing: (props.location.donoInfo) ? true : false,
    }
  }

  getSignedRequest = ([file]) => {
    this.setState({ isUploading: true })

    const fileName = `${randomString()}-${file.name.replace(/\s/g, '-')}`

    axios.get('/sign-s3', {
      params: {
        'file-name': fileName,
        'file-type': file.type
      }
    }).then((response) => {
      const { signedRequest, url } = response.data
      this.uploadFile(file, signedRequest, url)
    }).catch(err => {
      console.log(err)
    })
  }

  uploadFile = (file, signedRequest, url) => {
    const options = {
      headers: {
        'Content-Type': file.type,
      },
    };

    axios
      .put(signedRequest, file, options)
      .then(response => {
        this.setState({ isUploading: false, url });

        // THEN DO SOMETHING WITH THE URL. SEND TO DB USING POST REQUEST OR SOMETHING
      })
      // .post(`/api/donos/newdono/pictures`, { url })
      .catch(err => {
        this.setState({
          isUploading: false,
        });
        if (err.response.status === 403) {
          alert(
            `Your request for a signed URL failed with a status 403. Double check the CORS configuration and bucket policy in the README. You also will want to double check your AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY in your .env and ensure that they are the same as the ones that you created in the IAM dashboard. You may need to generate new keys\n${err.stack
            }`
          );
        } else {
          alert(`ERROR: ${err.status}\n ${err.stack}`);
        }
      });
  };

  //handleChanges will update description/price/title depending on what field the user is typing into. 
  handleChanges = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  alterTruckTrailer = () => {
    this.setState({
      truckTrailer: !this.state.truckTrailer
    })
  }

  alterMultiplePeople = () => {
    this.setState({
      multiplePeople: !this.state.multiplePeople
    })
  }

  handleSubmitDono = () => {
    const { giver_id, zip_code, dono_state, title, price, description, multiplePeople, truckTrailer, url } = this.state

    axios.post('/api/donos/', { giver_id, zip_code, dono_state, title, description, price, multiplePeople, truckTrailer }).then(res => {
      let dono_id = res.data.dono_id

      axios.post(`/api/donos/newdono/pictures`, { dono_id, url }).then(res => {
        console.log(res.data)
        this.props.history.push('/landing')
      }).catch(err => alert(err.message))
    }).catch(err => alert(err.message))
  }

  saveEdits = (props) => {
    const { donoId, zip_code, dono_state, title, price, description, multiplePeople, truckTrailer, url } = this.state
    const { giver_id } = this.props.location.donoInfo

    axios.put(`/api/donos/${donoId}`, { zip_code, dono_state, title, price, description, multiplePeople, truckTrailer, url, giver_id }).then(res => {
      this.props.history.push({ pathname: '/dono', donoId: `${donoId}` })
    })
  }

  deleteDono = () => {
    const { donoId } = this.state
    const { giver_id } = this.state
    console.log(giver_id)

    axios.delete(`/api/donos/${donoId}/users/${giver_id}`)
      .then(setTimeout(() => {
        this.props.history.push('/landing')
      }, 1000)).catch(err => alert(err.message))
  }


  render() {
    const { url, isUploading } = this.state
    console.log(this.state)
    return (
      <div className="new-dono-container" style={{ paddingTop: 120 + 'px' }}>
        {(this.state.isEditing) ? <h1>Edit Dono</h1> : <h1>New Dono</h1>}
        <img src={url} alt="Nothing uploaded" width="450px" />

        <Dropzone className="dropzone"
          onDropAccepted={this.getSignedRequest}
          accept="image/*"
          multiple={false}>
          {({ getRootProps, getInputProps }) => (
            <div
              style={{

                width: 120,
                height: 75,
                borderWidth: 5,
                marginTop: 10,
                borderColor: 'gray',
                borderStyle: 'dashed',
                borderRadius: 5,
                //   position: 'relative',
                //   width: 160,
                //   height: 80,
                //   borderWidth: 5,
                //   marginTop: 25,
                //   borderColor: 'gray',
                //   borderStyle: 'dashed',
                //   borderRadius: 5,
                //   display: 'inline-block',
                //   fontSize: 17,
              }}
              {...getRootProps()}>
              <input {...getInputProps()} />
              {isUploading ? <GridLoader /> : <p>Drop file here, or click to select files</p>}
            </div>
          )}
        </Dropzone>

        {/* Below are the input fields for all of the values of the dono other than the picture */}
        <div>
          <FaRegNewspaper className="icon" />
          <input name='title' value={this.state.title} type='text' placeholder='Dono Title' onChange={(e) => this.handleChanges(e)}></input>
        </div>
        <div>
          <FaDonate className="icon" />
          <input name='price' type='number' value={this.state.price} placeholder='Price' onChange={(e) => this.handleChanges(e)}></input>
        </div>
        <div>
          <FaGlobe className="icon" />
          <input name='zip_code' type='number' value={this.state.zip_code} placeholder='Pickup zip code' value={this.state.zip_code} onChange={(e) => this.handleChanges(e)}></input>
        </div>

        <div className="selector-container">
          <FaGlobeAmericas className="icon" />
          <select className="state-select" name='dono_state' value={this.state.dono_state} onChange={(e) => this.handleChanges(e)}>
            <option value=""> Select State </option>
            <option value="Alabama">Alabama</option>
            <option value="Alaska">Alaska</option>
            <option value="Arizona">Arizona</option>
            <option value="Arkansas">Arkansas</option>
            <option value="California">California</option>
            <option value="Colorado">Colorado</option>
            <option value="Connecticut">Connecticut</option>
            <option value="Delaware">Delaware</option>
            <option value="Florida">Florida</option>
            <option value="Georgia">Georgia</option>
            <option value="Hawaii">Hawaii</option>
            <option value="Idaho">Idaho</option>
            <option value="Illinois">Illinois</option>
            <option value="Indiana">Indiana</option>
            <option value="Iowa">Iowa</option>
            <option value="Kansas">Kansas</option>
            <option value="Kentucky">Kentucky</option>
            <option value="Louisiana">Louisiana</option>
            <option value="Maine">Maine</option>
            <option value="Maryland">Maryland</option>
            <option value="Massachusetts">Massachusetts</option>
            <option value="Michigan">Michigan</option>
            <option value="Minnesota">Minnesota</option>
            <option value="Mississippi">Mississippi</option>
            <option value="Missouri">Missouri</option>
            <option value="Montana">Montana</option>
            <option value="Nebraska">Nebraska</option>
            <option value="Nevada">Nevada</option>
            <option value="New Hampshire">New Hampshire</option>
            <option value="New Jersey">New Jersey</option>
            <option value="New Mexico">New Mexico</option>
            <option value="New York">New York</option>
            <option value="North Carolina">North Carolina</option>
            <option value="North Dakota">North Dakota</option>
            <option value="Ohio">Ohio</option>
            <option value="Oklahoma">Oklahoma</option>
            <option value="Oregon">Oregon</option>
            <option value="Pennsylvania">Pennsylvania</option>
            <option value="Rhode Island">Rhode Island</option>
            <option value="South Carolina">South Carolina</option>
            <option value="South Dakota">South Dakota</option>
            <option value="Tennessee">Tennessee</option>
            <option value="Texas">Texas</option>
            <option value="Utah">Utah</option>
            <option value="Vermont">Vermont</option>
            <option value="Virginia">Virginia</option>
            <option value="Washington">Washington</option>
            <option value="West Virginia">West Virginia</option>
            <option value="Wisconsin">Wisconsin</option>
            <option value="Wyoming">Wyoming</option>
          </select>
        </div>


        <div className="text-div">
          <FaRegListAlt className="icon" />
          <textarea name='description' rows="3" cols="25" value={this.state.description} placeholder='Description' onChange={(e) => this.handleChanges(e)}></textarea>
        </div>

        <div className="question-div">
          {/* These ternarys will display a checked checkbox if the condition is true. if false they will display an unchecked checkbox. Used for editing dono  */}
          {this.state.multiplePeople ?
            <div className="q-div">
              <label for='multiplePeople'><p className="p">Requires multiple people?</p></label>
              <input className="question" type='checkbox' name='multiplePeople' checked onClick={() => this.alterMultiplePeople()}></input>
            </div>
            :
            <div className="q-div" >
              <label for='multiplePeople'><p className="p">Requires multiple people?</p></label>
              <input className="question" type='checkbox' name='multiplePeople' onClick={() => this.alterMultiplePeople()}></input>
            </div>
          }
          {this.state.truckTrailer ?
            <div className="q-div">
              <label for='truckTrailer'><p className="p">Requires truck or trailer?</p></label>
              <input className="question" type='checkbox' name='truckTrailer' checked onClick={() => this.alterTruckTrailer()}></input>
            </div>
            :
            <div className="q-div">
              <label for='truckTrailer'><p className="p">Requires truck or trailer?</p></label>
              <input className="question" type='checkbox' name='truckTrailer' onClick={() => this.alterTruckTrailer()}></input>
            </div>
          }

        </div>

        {this.state.isEditing ?
          <div>
            <div>
              <button onClick={() => this.saveEdits()}>Save Edits</button>
            </div>
            <div>
              <button onClick={() => this.props.history.push(`/dono/${this.state.donoId}`)}>Cancel Edits</button>
            </div>
            <div>
              <button onClick={() => this.deleteDono()}>Delete Dono</button>
            </div>
          </div>
          :
          <div>
            <FaPencilAlt className="icon" />
            <button onClick={() => this.handleSubmitDono()}>Submit Dono</button>
          </div>
        }

      </div>
    )
  }
}

const mapStateToProps = reduxState => reduxState;

export default connect(mapStateToProps)(NewDono);