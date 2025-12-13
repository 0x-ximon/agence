"use client";

import { useEffect, useRef, useState } from "react";
import { Text } from "./typography";

export default function Game() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [whiteScore, setWhiteScore] = useState(0);
  const [blackScore, setBlackScore] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const WHITE_COLOR = "#FFFFFF";
    const BLACK_COLOR = "#000000";
    const SQUARE_SIZE = 15;
    const MIN_SPEED = 2;
    const MAX_SPEED = 6;

    const numSquaresX = canvas.width / SQUARE_SIZE;
    const numSquaresY = canvas.height / SQUARE_SIZE;

    const squares: string[][] = [];

    // Populate the fields, one half white, one half black
    for (let i = 0; i < numSquaresX; i++) {
      squares[i] = [];
      for (let j = 0; j < numSquaresY; j++) {
        squares[i][j] = i < numSquaresX / 2 ? WHITE_COLOR : BLACK_COLOR;
      }
    }

    const balls = [
      {
        x: canvas.width / 4,
        y: canvas.height / 2,
        dx: 6,
        dy: -6,
        reverseColor: WHITE_COLOR,
        ballColor: BLACK_COLOR,
        lastCollisionSquare: null as string | null,
      },
      {
        x: (canvas.width / 4) * 3,
        y: canvas.height / 2,
        dx: -6,
        dy: 6,
        reverseColor: BLACK_COLOR,
        ballColor: WHITE_COLOR,
        lastCollisionSquare: null as string | null,
      },
    ];

    const drawBall = (ball: (typeof balls)[0]) => {
      ctx.beginPath();
      ctx.arc(ball.x, ball.y, SQUARE_SIZE / 2, 0, Math.PI * 2, false);
      ctx.fillStyle = ball.ballColor;
      ctx.fill();
      ctx.closePath();
    };

    const drawSquares = () => {
      let white = 0;
      let black = 0;

      for (let i = 0; i < numSquaresX; i++) {
        for (let j = 0; j < numSquaresY; j++) {
          ctx.fillStyle = squares[i][j];
          ctx.fillRect(
            i * SQUARE_SIZE,
            j * SQUARE_SIZE,
            SQUARE_SIZE,
            SQUARE_SIZE,
          );

          if (squares[i][j] === WHITE_COLOR) white++;
          if (squares[i][j] === BLACK_COLOR) black++;
        }
      }

      setWhiteScore(white);
      setBlackScore(black);
    };

    function checkSquareCollision(ball: (typeof balls)[0]) {
      const centerI = Math.floor(ball.x / SQUARE_SIZE);
      const centerJ = Math.floor(ball.y / SQUARE_SIZE);
      const squareKey = `${centerI},${centerJ}`;

      // Skip if we just collided with this square
      if (ball.lastCollisionSquare === squareKey) {
        return;
      }

      let collided = false;

      for (let angle = 0; angle < Math.PI * 2; angle += Math.PI / 4) {
        const checkX = ball.x + Math.cos(angle) * (SQUARE_SIZE / 2);
        const checkY = ball.y + Math.sin(angle) * (SQUARE_SIZE / 2);

        const i = Math.floor(checkX / SQUARE_SIZE);
        const j = Math.floor(checkY / SQUARE_SIZE);

        if (i >= 0 && i < numSquaresX && j >= 0 && j < numSquaresY) {
          if (squares[i][j] !== ball.reverseColor) {
            squares[i][j] = ball.reverseColor;
            collided = true;

            if (Math.abs(Math.cos(angle)) > Math.abs(Math.sin(angle))) {
              ball.dx = -ball.dx;
            } else {
              ball.dy = -ball.dy;
            }

            ball.lastCollisionSquare = squareKey;
            break;
          }
        }
      }

      // Clear the collision memory if we've moved away from the square
      if (!collided && ball.lastCollisionSquare === squareKey) {
        ball.lastCollisionSquare = null;
      }
    }

    const checkBoundaryCollision = (ball: (typeof balls)[0]) => {
      if (
        ball.x + ball.dx > canvas.width - SQUARE_SIZE / 2 ||
        ball.x + ball.dx < SQUARE_SIZE / 2
      ) {
        ball.dx = -ball.dx;
      }
      if (
        ball.y + ball.dy > canvas.height - SQUARE_SIZE / 2 ||
        ball.y + ball.dy < SQUARE_SIZE / 2
      ) {
        ball.dy = -ball.dy;
      }
    };

    const addRandomness = (ball: (typeof balls)[0]) => {
      ball.dx += Math.random() * 0.02 - 0.01;
      ball.dy += Math.random() * 0.02 - 0.01;

      ball.dx = Math.min(Math.max(ball.dx, -MAX_SPEED), MAX_SPEED);
      ball.dy = Math.min(Math.max(ball.dy, -MAX_SPEED), MAX_SPEED);

      if (Math.abs(ball.dx) < MIN_SPEED)
        ball.dx = ball.dx > 0 ? MIN_SPEED : -MIN_SPEED;
      if (Math.abs(ball.dy) < MIN_SPEED)
        ball.dy = ball.dy > 0 ? MIN_SPEED : -MIN_SPEED;
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawSquares();

      balls.forEach((ball) => {
        drawBall(ball);
        checkSquareCollision(ball);
        checkBoundaryCollision(ball);
        ball.x += ball.dx;
        ball.y += ball.dy;
        addRandomness(ball);
      });
    };

    const FRAME_RATE = 60;
    const interval = setInterval(draw, 1000 / FRAME_RATE);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center gap-2">
      <canvas
        ref={canvasRef}
        className="rounded border border-border h-fit sm:w-[16rem] md:w-[20rem] lg:w-[24rem]"
      />
      <Text variant="muted">
        white {whiteScore} | black {blackScore}
      </Text>
    </div>
  );
}
