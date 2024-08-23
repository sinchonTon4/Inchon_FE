import { useRef, useState, useEffect } from "react";

function FileInput({ name, value, onChange }) {
  const [preview, setPreview] = useState();
  const inputRef = useRef();

  const handleChange = (e) => {
    const nextValue = e.target.files[0];
    onChange(name, nextValue);
  };

  const handleClearClick = () => {
    const inputNode = inputRef.current;
    if (!inputNode) return;

    inputNode.value = "";
    onChange(name, null);
  };

  useEffect(() => {
    if (!value) return;

    // 파일에 대한 object URL 생성
    const objectURL = URL.createObjectURL(value);
    setPreview(objectURL);

    // 컴포넌트가 언마운트되거나 `value`가 변경될 때 object URL 해제
    return () => {
      URL.revokeObjectURL(objectURL);
      setPreview(null);
    };
  }, [value]);

  return (
    <div>
      {preview && <img src={preview} alt="이미지 미리보기" />}
      <input type="file" onChange={handleChange} ref={inputRef} />
      {value && (
        <button type="button" onClick={handleClearClick}>
          X
        </button>
      )}
    </div>
  );
}

export default FileInput;
