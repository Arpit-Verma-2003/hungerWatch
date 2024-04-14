import React from "react";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Home = () => {
  const images = [
    "https://miro.medium.com/v2/resize:fit:977/1*yT_5oEjGAd7Yqp_KNHDIOw.png",
    "https://i.pinimg.com/474x/0b/5a/e2/0b5ae2523a3caa41d113d4a6dddbb185.jpg",
    "https://img.etimg.com/thumb/width-640,height-480,imgsize-743461,resizemode-75,msid-75659835/news/politics-and-nation/lockdown-compounding-woes-of-poor-pm-must-intervene-to-prevent-starvation-deaths-ak-antony/6-ap.jpg",
    // Add more image URLs here
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div>
      <h1 style={{ textAlign: "center", marginTop: "20px", color: "#2c3e50" }}>
        HOME
      </h1>
      <div
        style={{
          maxWidth: "800px",
          margin: "auto",
          padding: "20px",
          backgroundColor: "#f9fafb",
          borderRadius: "10px",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h2
          style={{ textAlign: "center", marginBottom: "20px", color: "#333" }}
        >
          Welcome to the Food Insecurity Tracker: Taking Action Against Hunger
        </h2>
        <p style={{ color: "#333" }}>
          At the Food Insecurity Tracker, we believe that no one should go to
          bed hungry. Our mission is simple yet powerful: to combat food
          insecurity and ensure that every individual has access to nutritious
          meals and essential resources.
        </p>

        {/* Photo Carousel */}
        <Slider {...settings} style={{ maxWidth: "100%", margin: "auto" }}>
          {images.map((image, index) => (
            <div key={index}>
              <img
                src={image}
                alt={`Image ${index + 1}`}
                style={{ width: "100%", maxHeight: "400px", borderRadius: "10px" }}
              />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Home;
