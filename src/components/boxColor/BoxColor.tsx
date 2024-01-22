import { useEffect, useRef, useState } from "react";

import "./BoxColor.scss";

interface BoxColorProps {
  onSelect: (selectedColor: string) => void;
  onClose: () => void;
}

const BoxColor: React.FC<BoxColorProps> = ({ onSelect, onClose }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [position, setPosition] = useState<{ top: number; left: number }>({
    top: 250,
    left: 0,
  });

  const handleColorSelect = (selectedColor: string) => {
    onSelect(selectedColor);
  };

  const handleClose = () => {
    onClose();
  };

  useEffect(() => {
    const handleMouseDown = (event: MouseEvent) => {
      const target = event.target as HTMLElement;

      if (containerRef.current && !containerRef.current.contains(target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleMouseDown);

    return () => {
      document.removeEventListener("mousedown", handleMouseDown);
    };
  }, [onClose]);

  useEffect(() => {
    const updatePosition = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const rightOverflow = rect.right - window.innerWidth;

        setPosition((prevPosition) => ({
          top: prevPosition.top,
          left:
            rightOverflow > 0
              ? prevPosition.left - rightOverflow
              : prevPosition.left,
        }));
      }
    };

    updatePosition();

    window.addEventListener("resize", updatePosition);

    return () => {
      window.removeEventListener("resize", updatePosition);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="container"
      onClick={handleClose}
      style={{ top: position.top, left: position.left }}
    >
      <ul className="colors" onClick={(event) => event.stopPropagation()}>
        <li
          className="color light-blue"
          onClick={() => handleColorSelect("light-blue")}
        ></li>
        <li
          className="color light-green"
          onClick={() => handleColorSelect("light-green")}
        ></li>
        <li
          className="color yellow"
          onClick={() => handleColorSelect("yellow")}
        ></li>
        <li
          className="color light-red"
          onClick={() => handleColorSelect("light-red")}
        ></li>
        <li className="color red" onClick={() => handleColorSelect("red")}></li>
        <li
          className="color blue"
          onClick={() => handleColorSelect("blue")}
        ></li>
        <li
          className="color purple"
          onClick={() => handleColorSelect("purple")}
        ></li>
        <li
          className="color lime"
          onClick={() => handleColorSelect("lime")}
        ></li>
        <li
          className="color orange"
          onClick={() => handleColorSelect("orange")}
        ></li>
        <li
          className="color light-grey"
          onClick={() => handleColorSelect("light-grey")}
        ></li>
        <li
          className="color grey"
          onClick={() => handleColorSelect("grey")}
        ></li>
        <li
          className="color brown"
          onClick={() => handleColorSelect("brown")}
        ></li>
      </ul>
    </div>
  );
};

export default BoxColor;
