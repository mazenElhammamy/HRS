import React from 'react';
import {Carousel} from 'react-bootstrap'
// import { Link } from 'react-router-dom';


function Showcase() {
    return (
        <Carousel>
        <Carousel.Item>
          <img
            className="d-block w-100 carouselImg "
            src="https://i1.wp.com/hr-gazette.com/wp-content/uploads/2018/08/bigstock-Job-Search-Human-Resources-Rec-256126069.jpg?fit=1600%2C743&ssl=1"
            alt="First slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100 carouselImg"
            src="https://www.cpomagazine.com/wp-content/uploads/2019/07/chinese-cloud-hopper-operation-targets-top-tech-providers-in-world_1500.jpg"
            alt="Third slide"
          />

        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100 carouselImg"
            src="./img/showCase.jpg"
            alt="Third slide"
          />
        </Carousel.Item>
      </Carousel>

    );
}

export default Showcase;



