import React from "react";
import { Fade, Slide } from "react-awesome-reveal";
import logo from "./assets/aura1.png";
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import image1 from "./assets/11.jpg";
import image2 from "./assets/10.jpg";
import image3 from "./assets/6.jpg";
import { useSelector } from "react-redux";
function Hero() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);

  return (
    <>
    <div>
      {isAuthenticated ? (
        <div>
          Logged in as {user ? user.name : 'Unknown User'}
        </div>
      ) : (
        <div>
          Not logged in
        </div>
      )}
    </div>
      <div className="bg-black flex sm:flex-col justify-center items-center pb-12 pt-18 pt-20">
        <div className="flex flex-col sm:flex-row border-2 border-green-700 shadow-green-700 w-11/12 h-1/2 justify-start items-start shadow-xl  hover:scale-105">
          <div className="flex flex-col mt-10 justify-start items-start sm:w-2/5 sm:mt-36 sm:ml-12 sm:mr-24 sm:mb-24">
            <Slide>
              <img src={logo} alt="Logo" className="mb-12 h-36" />
            </Slide>
            <p className="ml-8 text-white text-5xl font-bold"><Slide>ADAPTING TO THE FUTURE</Slide></p>
          </div>

          <div className="flex flex-col w-4/5 ml-10 mb-10 mt-10 sm:ml-12 sm:mt-12 sm:w-2/5 bg-black" id="post">
            <Slide>
              <Slider {...settings}>
                <div>
                  <img src={image1} alt="" className="bg-black" />
                </div>
                <div>
                  <img src={image2} alt="" className="bg-black" />
                </div>
                <div>
                  <img src={image3} alt="" className="bg-black" />
                </div>
              </Slider>
            </Slide>
          </div>
        </div>
      </div>
    </>
  );
}

export default Hero;
