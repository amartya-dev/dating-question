import { Button, Stack, Typography } from "@mui/material";
import "./App.css";
import { DotLottie, DotLottieReact } from "@lottiefiles/dotlottie-react";
import { useEffect, useState } from "react";
import Confetti from "react-confetti";

function App() {
  const [mouseX, setMouseX] = useState<number>();
  const [mouseY, setMouseY] = useState<number>();
  const [dotLottie, setDotLottie] = useState<DotLottie | null>(null);
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(false);
  const [yesClicked, setYesClicked] = useState<boolean>(false);

  const totalFrames = 408;
  const pureLeftFrameStart = 0.03 * totalFrames;
  const pureLeftFrames = 0.21 * totalFrames;
  const topLeftFrameStart = 0.59 * totalFrames;
  const topLeftFrames = 0.12 * totalFrames;
  const bottomLeftFrameStart = 0.71 * totalFrames;
  const bottomLeftFrames = 0.15 * totalFrames;
  const topRightFrameStart = 0.41 * totalFrames;
  const topRightFrames = 0.15 * totalFrames;

  useEffect(() => {
    const update = (event: MouseEvent) => {
      setMouseX(event.x);
      setMouseY(event.y);
    };

    window.addEventListener("mousemove", update);
  }, [setMouseX, setMouseY]);

  useEffect(() => {
    if (yesClicked) {
      return;
    }
    const mousePercentageHorizontal =
      mouseX && (mouseX / window.innerWidth) * 100;
    const mousePercentageVertical =
      mouseY && (mouseY / window.innerHeight) * 100;
    if (mousePercentageHorizontal && mousePercentageVertical) {
      if (mousePercentageHorizontal >= 0 && mousePercentageHorizontal < 50) {
        if (mousePercentageVertical >= 0 && mousePercentageVertical < 50) {
          if (mousePercentageVertical <= 40) {
            // Just progress with X
            const requiredFrame =
              topLeftFrameStart +
              (mousePercentageVertical / 100) * topLeftFrames;
            console.log(`Setting frame to ${requiredFrame}`);
            dotLottie?.setFrame(requiredFrame);
          } else {
            const requiredFrame =
              pureLeftFrameStart +
              ((100 - mousePercentageHorizontal) / 100) * pureLeftFrames;
            console.log(`Setting frame to ${requiredFrame}`);
            dotLottie?.setFrame(requiredFrame);
          }
        } else {
          if (mousePercentageVertical > 70) {
            const requiredFrame =
              bottomLeftFrameStart +
              (mousePercentageVertical / 100) * bottomLeftFrames;
            dotLottie?.setFrame(requiredFrame);
            console.log(`Setting frame to ${requiredFrame}`);
          } else {
            const requiredFrame =
              pureLeftFrameStart +
              (100 - mousePercentageHorizontal / 100) * pureLeftFrames;
            console.log(`Setting frame to ${requiredFrame}`);
            dotLottie?.setFrame(requiredFrame);
          }
        }
      }

      if (mousePercentageHorizontal >= 50) {
        if (mousePercentageVertical >= 0 && mousePercentageVertical <= 50) {
          if (mousePercentageVertical <= 40) {
            const requiredFrame =
              topRightFrameStart +
              (mousePercentageVertical / 100) * topRightFrames;
            dotLottie?.setFrame(requiredFrame);
          } else {
            const requiredFrame =
              topRightFrameStart +
              (mousePercentageVertical / 100) * topRightFrames;
            dotLottie?.setFrame(requiredFrame);
          }
        } else {
          if (mousePercentageVertical > 70) {
            const requiredFrame =
              topRightFrameStart +
              (mousePercentageVertical / 100) * topRightFrames;
            dotLottie?.setFrame(requiredFrame);
          } else {
            const requiredFrame =
              topRightFrameStart +
              (mousePercentageVertical / 100) * topRightFrames;
            dotLottie?.setFrame(requiredFrame);
          }
        }
      }
    }
  }, [mouseX, mouseY]);

  return (
    <Stack
      direction={"column"}
      alignContent={"center"}
      justifyContent={"center"}
      alignItems={"center"}
      justifyItems={"center"}
      height={"90vh"}
      width={"90vw"}
    >
      {yesClicked && (
        <Confetti width={window.innerWidth} height={window.innerHeight} />
      )}
      <Typography variant={"h1"} sx={{ color: "white" }}>
        Let&apos;s start dating ?
      </Typography>
      <DotLottieReact
        dotLottieRefCallback={setDotLottie}
        style={{ height: "40%", width: "30%" }}
        autoplay={yesClicked}
        loop={yesClicked}
        src={yesClicked ? "/lovePuppy.lottie" : "/angryPuppy.lottie"}
      />
      <Stack direction={"row"} spacing={4}>
        <Button
          variant={"contained"}
          sx={{ backgroundColor: "green" }}
          onClick={() => {
            setYesClicked(true);
          }}
        >
          YESSS !!!
        </Button>
        <Button
          variant={"contained"}
          disabled={buttonDisabled}
          sx={{
            backgroundColor: "red",
          }}
          onMouseEnter={() => {
            setButtonDisabled(true);
          }}
          onMouseLeave={() => {
            setButtonDisabled(false);
          }}
        >
          No I need more time !!
        </Button>
      </Stack>
    </Stack>
  );
}

export default App;
