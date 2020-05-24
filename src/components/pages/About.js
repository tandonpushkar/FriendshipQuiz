import React, { Fragment, useState, useEffect, useRef } from "react";
import BIRDS from "vanta/dist/vanta.birds.min";
import { Link } from "react-router-dom";

const About = () => {
  const [vantaEffect, setVantaEffect] = useState(0);
  const myRef = useRef(null);
  useEffect(() => {
    if (!vantaEffect) {
      setVantaEffect(
        BIRDS({
          el: myRef.current
        })
      );
    }
    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect]);

  return (
    <Fragment>
      <div
        style={{
          height: "600px",
          display: "flex",

        }}
        ref={myRef}>
        <div class="container-fluid w-75 text-light  mx-auto">
          <img src={require('../../assets/friends2.webp')} style={{ width: "15em" }} />
          <h2 class="card-title font-weight-bold text-center" style={{ color: "#e2f3f5" }}>
            About this Application
          </h2>
          <p class="card-text font-weight-bold" style={{ color: "#a7ff83" }}>
            -Its a social Application to test your friendship. <br />
            -FrendshipQuiz v1 <br />
          </p>
          <p class="card-text text-center">
            <Link to="/quiz" class="btn btn-primary">
              Create Your Quiz
            </Link>
          </p>
        </div>
      </div>
    </Fragment>
  );
};

export default About;
