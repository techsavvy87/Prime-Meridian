import React, { useRef, useState, useEffect } from "react";
import swapImg from "../assets/imgs/swap.png";

const SignDraw = () => {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState("#000000");
  const [lineWidth, setLineWidth] = useState(5);

  useEffect(() => {
    const canvas = canvasRef.current;
    const parent = canvas.parentElement;

    // Set actual canvas resolution to match container width
    canvas.width = parent.offsetWidth;
    canvas.height = 150;
    const context = canvas.getContext("2d");
    context.lineCap = "round";
    context.strokeStyle = color;
    context.lineWidth = lineWidth;
    contextRef.current = context;
  }, [color, lineWidth]);

  // Get coordinates (handles both mouse and touch events)
  const getCoordinates = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const clientX = e.clientX || (e.touches && e.touches[0]?.clientX) || 0;
    const clientY = e.clientY || (e.touches && e.touches[0]?.clientY) || 0;
    return {
      offsetX: clientX - rect.left,
      offsetY: clientY - rect.top,
    };
  };

  const startDrawing = (e) => {
    if (e.type === "touchstart" || e.type === "touchmove") e.preventDefault();
    const { offsetX, offsetY } = getCoordinates(e);
    contextRef.current.beginPath();
    contextRef.current.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    if (e.type === "touchmove") e.preventDefault();
    const { offsetX, offsetY } = getCoordinates(e);
    contextRef.current.lineTo(offsetX, offsetY);
    contextRef.current.stroke();
  };

  const stopDrawing = (e) => {
    if (e.type === "touchend") e.preventDefault();
    contextRef.current.closePath();
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);
  };
  return (
    <div>
      <canvas
        ref={canvasRef}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseOut={stopDrawing}
        onTouchStart={startDrawing}
        onTouchMove={draw}
        onTouchEnd={stopDrawing}
        style={{
          marginTop: "20px",
          backgroundColor: "#f9f9f9",
          cursor: "crosshair",
          borderRadius: "8px",
          touchAction: "none", // For touch devices
        }}
      />

      <div
        className="flex items-center justify-center cursor-pointer mt-5"
        onClick={clearCanvas}
      >
        <img src={swapImg} alt="swap icon" />
        <p className="text-[#00584E] text-base underline ml-2">Reset</p>
      </div>
    </div>
  );
};

export default SignDraw;
