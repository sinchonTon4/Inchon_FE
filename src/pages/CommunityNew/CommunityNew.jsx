import React, { useState, useEffect } from "react";
import FileInput from "./FileInput";
import Headers from "../../components/Headers";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { instance } from "../../api/instance";

const WriteForm = () => {
  const navigate = useNavigate();
  const [tags, setTags] = useState([]);
  const [userValues, setUserValues] = useState({
    title: "",
    content: "",
    imgFile: null,
  });

  // Component mounts, initialize with one default tag
  useEffect(() => {
    setTags([""]); // Initialize with one empty string for tag
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create the request body
    const requestBody = {
      title: userValues.title,
      description: userValues.content,
      img: userValues.imgFile ? URL.createObjectURL(userValues.imgFile) : "", // Handle image URL
      user_id: 1, // Example user ID, replace with actual logic if necessary
      tags: tags.map((_, index) => index), // Example tag IDs as indices
    };

    try {
      // Send the POST request using Axios
      const response = await instance.post("/community", requestBody);

      // Handle successful response
      console.log("Success:", response.data);

      // Reset form values
      setUserValues({
        title: "",
        content: "",
        imgFile: null,
      });
      setTags([""]); // Reset tags to initial state

      // Navigate to another page if needed
      navigate(`/communityDetail/${response.data.id}`);
    } catch (error) {
      console.error("Error:", error);
      // Optionally show error to the user
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleFileChange = (name, file) => {
    setUserValues((prevValues) => ({
      ...prevValues,
      [name]: file,
    }));
  };

  const addTagInput = () => {
    if (tags.length < 4) {
      setTags((prevTags) => [...prevTags, ""]); // Add a new empty string for tag
    }
  };

  const handleTagChange = (index, value) => {
    setTags((prevTags) =>
      prevTags.map((tag, i) => (i === index ? value : tag))
    );
  };

  const removeTagInput = (index) => {
    setTags((prevTags) => prevTags.filter((_, i) => i !== index));
  };

  const handleTagDoubleClick = (index) => {
    removeTagInput(index);
  };

  return (
    <WriteFormBox onSubmit={handleSubmit}>
      <div className="titleTag">
        <TitleInput
          name="title"
          type="text"
          value={userValues.title}
          onChange={handleChange}
          placeholder="제목을 입력하세요"
        />

        {tags.map((tag, index) => (
          <TagBox key={index}>
            <TagInput
              type="text"
              value={tag}
              onChange={(e) => handleTagChange(index, e.target.value)}
              onDoubleClick={() => handleTagDoubleClick(index)} // Remove on double-click
              placeholder="#"
            />
          </TagBox>
        ))}
        {tags.length < 4 && (
          <BlueBox>
            <BlueCircle type="button" onClick={addTagInput}>
              +
            </BlueCircle>
          </BlueBox>
        )}
      </div>
      <div>
        <FileInput
          name="imgFile"
          value={userValues.imgFile}
          onChange={handleFileChange}
        />
      </div>
      <ContentBox>
        <textarea
          name="content"
          value={userValues.content}
          onChange={handleChange}
          placeholder="내용을 입력하세요"
        />
      </ContentBox>
      <div className="sbBtn">
        <SubmitBtn type="submit">업로드</SubmitBtn>
      </div>
    </WriteFormBox>
  );
};

const CommunityNew = () => {
  return (
    <NewWrapper>
      <Headers />
      <WriteBox>
        <WriteForm />
      </WriteBox>
    </NewWrapper>
  );
};

export default CommunityNew;

const NewWrapper = styled.div`
  height: 100%;
`;

const TitleInput = styled.input`
  width: 40%;
  height: 100%;
  background: #53acff;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  color: #fff;
  text-align: center;
  font-family: "SCD_Medium";
  font-size: 50px;
  line-height: normal;
  border: none;

  &::placeholder {
    color: #fff;
  }
  &:focus {
    outline: none; /* 기본 포커스 아웃라인 제거 */
    background: #53acff; /* 포커스 되었을 때 배경색 설정 (선택 사항) */
    box-shadow: 0px 0px 5px #53acff;
  }
`;

const WriteBox = styled.div`
  margin: 60px 70px 87px;
  min-height: 800px;
  background: #f6f6f6;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
`;

const WriteFormBox = styled.form`
  width: calc(100% - 80px);
  margin: 0 40px;
  display: flex;
  min-height: 800px;
  padding-top: 50px;
  gap: 30px;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  .titleTag {
    width: 100%;
    display: flex;
    height: 115px;
    gap: 20px;
    align-items: center;
  }

  .sbBtn {
    width: 100%;
    display: flex;
    justify-content: flex-end;
  }
`;

const TagBox = styled.div`
  margin: 50px 0;
  display: flex;
  height: 70%;
  align-items: center;
`;

const TagInput = styled.input`
  width: 50%;
  height: 100%;
  background: #c0e1ff;
  border: none;
  padding: 0 10px;
  margin-right: 10px;
  font-size: 30px;
  color: #53acff;
  text-align: center;
  font-family: "SCD_Medium";
  font-size: 30px;
  line-height: normal;
  &::placeholder {
    color: #53acff;
  }
  &:focus {
    outline: none; /* 기본 포커스 아웃라인 제거 */
    box-shadow: 0px 0px 5px #53acff;
  }
`;

const BlueBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const BlueCircle = styled.button`
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background: #53acff;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 30px;
  border: none;
  cursor: pointer;
`;

const ContentBox = styled.div`
  width: 100%;
  textarea {
    width: 100%;
    height: 260px;
    padding: 10px;
    border: none;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
    color: #000;
    font-family: "SCD_Medium";
    font-size: 30px;
    line-height: 30px;
    resize: none; /* 크기 조절 불가 */
    overflow: hidden; /* 스크롤바 숨기기 */
    box-sizing: border-box; /* padding과 border를 포함한 전체 크기 계산 */

    &::placeholder {
      color: #888; /* 플레이스홀더 색상 */
      text-align: center; /* 플레이스홀더 텍스트 중앙 정렬 */
      line-height: 240px; /* 텍스트 수직 중앙 정렬 */
    }
    &:focus {
      outline: none; /* 기본 포커스 아웃라인 제거 */
      box-shadow: 0px 0px 5px #53acff;
    }
  }
`;

const SubmitBtn = styled.button`
  width: 200px;
  background: #53acff;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  border: none;
  height: 50px;
  color: #fff;
  text-align: center;
  font-family: "SCD_Medium";
  font-size: 30px;
  line-height: normal;
  margin-bottom: 30px;
  cursor: pointer;
`;
