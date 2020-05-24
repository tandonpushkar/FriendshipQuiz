import React, { Fragment, useState, useEffect, useRef } from "react";
import birds from "vanta/dist/vanta.birds.min";
import { Link } from "react-router-dom";

const Home = () => {
  const [vantaEffect, setVantaEffect] = useState(0);
  const myRef = useRef(null);
  useEffect(() => {
    if (!vantaEffect) {
      setVantaEffect(
        birds({
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
          flexDirection: "column",
          justifyContent: "space-evenly",
          alignItems: "center"
        }}
        ref={myRef}>

        <div
          class="container-fluid  text-center w-75 text-light  mx-auto"
          style={{ background: "#07192f", padding: "2rem 0.5rem", display: "flex", flexWrap: "wrap" }}>
          <div>
            <h3 class="card-title font-weight-bold " style={{ color: "#e2f3f5" }}>
              Do your friends really know you?
          </h3>
            <p class="card-text font-weight-bold" style={{ color: "#a7ff83" }}>
              1) Answer questions about yourself.
            <br />
            2) Your quiz link will be created.
            <br />
            3) Send link to your friends.
            <br />
            4) Check the results at your quiz link!
          </p>
            <p class="card-text text-center">
              <Link to="/quiz" class="btn btn-primary">
                Create Your Quiz
            </Link>
            </p>
          </div>
          <img src={require('../../assets/friends.webp')} style={{ width: "15em" }} />

        </div>

      </div>
    </Fragment>
  );
};

export default Home;
