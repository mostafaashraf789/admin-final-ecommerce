import Lottie from "lottie-react";
import animationData from "./Animation - 1729131241796.json";
function NotFoundPAge() {
  return (
    <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      height: "100%",
                      flexDirection: "column",
                      marginTop: "50px",
                    }}
                  >
                    <Lottie
                      autoplay
                      loop
                      animationData={animationData}
                      style={{ height: "270px" }}
                    />
                  </div>
  )
}

export default NotFoundPAge
