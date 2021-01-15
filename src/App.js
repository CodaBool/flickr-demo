import React, { useState, useEffect } from 'react'
import Card from 'react-bootstrap/Card'
import Spinner from 'react-bootstrap/Spinner'
import Navigation from './Navigation'
import axios from 'axios'

export default function App() {
  const [photos, setPhotos] = useState(null)
  const [loading, setLoading] = useState(null)
  const [tags, setTags] = useState('animal,nature')

  useEffect(() => {
    setLoading(true)
    axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&format=json&safe_search=1&per_page=20&tags=${tags}&api_key=${process.env.REACT_APP_FLICKR_KEY}`)
      .then(res => {
        const removedFront = res.data.substring(14, res.data.length)
        const removedBack = removedFront.substring(0, removedFront.length - 1)
        setPhotos(JSON.parse(removedBack).photos.photo)
      })
      .finally(() => setLoading(false))
  }, [tags])

  return (
    <>
      <Navigation setTags={setTags} />
      {photos
        ? photos.map(photo => (
            <Card key={photo.id} className="my-5">
              <Card.Img variant="top" src={`https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`} />
              <Card.Body>
                <Card.Title>{photo.title}</Card.Title>
              </Card.Body>
            </Card>
          ))
        : loading
            ? <div className="d-flex">
                <Spinner animation="border" variant="primary" className="mx-auto" />
              </div>
            : <h1 className="display-3 fadeIn">No Photos</h1>
      }
    </>
  )
}

// split an array into smaller arrays
// I use this to split the single array of photos into 2,
// so that I can easily make rows and columns
// However, I found the instructions asked for a single column
// so, I then removed this functionallity
// function chunk(arr, size) {
//   let i = 0, j, tempArr, chunk = size, splitPosts = []
//   for (i = 0 , j = arr.length; i < j; i += chunk) {
//     tempArr = arr.slice(i, i + chunk)
//     splitPosts.push(tempArr)
//   }
//   return splitPosts
// }
// const chunkedArr = chunk(JSON.parse(removedBack).photos.photo, 2)