import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import mediactive from '../../assets/img3.jpg'
import image1 from '../../assets/carosel/image1.jpg'
import image2 from '../../assets/carosel/image2.jpg'
import image3 from '../../assets/carosel/image3.jpg'
import image4 from '../../assets/carosel/image4.jpg'
const MyCarousel = () => {
    return (
      <Carousel showArrows={false}  className='mt-3'>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={image1}
            alt="First slide"
            style={{width:100,height:500}}
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={image2}
            alt="Second slide"
            style={{width:100,height:500}}
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={image3}
            alt="Second slide"
            style={{width:100,height:500}}
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={image4}
            alt="Second slide"
            style={{width:100,height:500}}
          />
        </Carousel.Item>
      </Carousel>
    );
  };
  
  export default MyCarousel;