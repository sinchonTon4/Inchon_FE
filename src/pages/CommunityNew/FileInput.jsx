import React, { useRef, useState } from "react";
import styled from "styled-components";

const FileWrapper = styled.div`
  position: relative;
  display: inline-block;
  width: 200px;
  height: 200px;
  background: #d9d9d9;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  text-align: center;
  line-height: 200px;
  color: #fff;
  font-size: 100px;
  cursor: pointer;

  img {
    max-width: 100%;
    max-height: 100%;
    object-fit: cover;
    position: absolute;
    top: 0;
    left: 0;
  }

  button {
    position: absolute;
    top: 10px;
    right: 10px;
    background: transparent;
    border: none;
    font-size: 24px;
    color: #53acff;
    cursor: pointer;
  }

  input[type="file"] {
    display: none;
  }

  .plus-icon {
    font-size: 80px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const FileInput = () => {
  const [preview, setPreview] = useState(null);
  const inputRef = useRef(null);

  const handleChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClearClick = () => {
    setPreview(null);
    if (inputRef.current) {
      inputRef.current.value = null; // Clear file input
    }
  };

  const handleClick = () => {
    if (inputRef.current) {
      inputRef.current.click(); // Trigger file input click
    }
  };

  return (
    <FileWrapper onClick={handleClick}>
      {preview && <img src={preview} alt="미리보기" />}
      <input type="file" onChange={handleChange} ref={inputRef} />
      {preview && (
        <button type="button" onClick={handleClearClick}>
          X
        </button>
      )}
      {!preview && <div className="plus-icon">+</div>}
    </FileWrapper>
  );
};

export default FileInput;
