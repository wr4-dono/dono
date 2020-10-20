import React, { Component } from 'react'
import axios from 'axios'
import { v4 as randomString } from 'uuid'
import Dropzone from 'react-dropzone'
import { GridLoader } from 'react-spinners'
import { connect } from 'react-redux';

class NewDono extends Component {
  constructor(props) {
    super()
    this.state = {
      isUploading: false,
      url: 'http://via.placeholder.com/450x450',
      title: '',
      price: '',
      description: '',
      multiplePeople: false,
      truckTrailer: false,
      zip_code: props.auth.user.zip_code,
      giver_id: props.auth.user.user_id,
      // images: []
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
    const { giver_id, zip_code, title, price, description, multiplePeople, truckTrailer, url } = this.state

    axios.post('/api/donos/', { giver_id, zip_code, title, description, price, multiplePeople, truckTrailer }).then(res => {
      let dono_id = res.data.dono_id

      axios.post(`/api/donos/newdono/pictures`, { dono_id, url }).then(res => {
        console.log(res.data)
      }).catch(err => alert(err.message))
    }).catch(err => alert(err.message))
  }


  render() {
    const { url, isUploading } = this.state
    return (
      <div>
        <h1>Upload</h1>
        <img src={url} alt="" width="450px" />

        <Dropzone
          onDropAccepted={this.getSignedRequest}
          accept="image/*"
          multiple={false}>
          {({ getRootProps, getInputProps }) => (
            <div
              style={{
                position: 'relative',
                width: 160,
                height: 80,
                borderWidth: 5,
                marginTop: 25,
                borderColor: 'gray',
                borderStyle: 'dashed',
                borderRadius: 5,
                display: 'inline-block',
                fontSize: 17,
              }}
              {...getRootProps()}>
              <input {...getInputProps()} />
              {isUploading ? <GridLoader /> : <p>Drop files here, or click to select files</p>}
            </div>
          )}
        </Dropzone>

        <input name='title' type='text' placeholder='Dono Title' onChange={(e) => this.handleChanges(e)}></input>
        <input name='price' type='number' placeholder='Price' onChange={(e) => this.handleChanges(e)}></input>
        <input name='zip_code' type='number' placeholder='Pickup zip code' value={this.state.zip_code} onChange={(e) => this.handleChanges(e)}></input>
        <textarea name='description' placeholder='Description' onChange={(e) => this.handleChanges(e)}></textarea>
        <input type='checkbox' name='multiplePeople' onClick={() => this.alterMultiplePeople()}></input>
        <input type='checkbox' name='truckTrailer' onClick={() => this.alterTruckTrailer()}></input>

        <button onClick={() => this.handleSubmitDono()}>Submit Dono</button>
      </div>
    )
  }
}

const mapStateToProps = reduxState => reduxState;

export default connect(mapStateToProps)(NewDono);