import React, { useRef, useState } from "react";
import FileInput from "./FileInput";
import { instance } from "../../api/instance";

// 사용자 사진 폼
const WriteForm = () => {
  const [userValues, setUserValues] = useState({
    title: "",
    tag: "",
    content: "",
    imgFile: null,
  });

  const [postData, setPostData] = useState({
    title: "",
    tag: "",
    content: "",
    imgFile: null,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    //서버에 폼 보내고 성공하면 처리
    //
    // const postUserData = async () => {
    //   try {
    //     const res = await instance.post(`/url`, userValues);
    //   } catch (e) {
    //     console.log(e.messege);
    //   }
    // };

    // 폼 제출 처리 로직 추가
    console.log(userValues);
    setUserValues({
      title: "",
      tag: "",
      content: "",
      imgFile: null,
    });
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

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="title"
        type="text"
        value={userValues.title}
        onChange={handleChange}
      />
      <input
        name="tag"
        type="text"
        value={userValues.tag}
        onChange={handleChange}
      />
      <input
        name="content"
        type="text"
        value={userValues.content}
        onChange={handleChange}
      />
      <FileInput
        name="imgFile"
        value={userValues.imgFile}
        onChange={handleFileChange}
      />
      <button type="submit">올리기</button>
    </form>
  );
};

const CommunityNew = () => {
  return (
    <div>
      CommunityNew
      <WriteForm />
    </div>
  );
};

export default CommunityNew;
