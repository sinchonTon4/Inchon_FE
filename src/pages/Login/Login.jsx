import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [input, setInput] = useState({
    id: "",
    password: "",
  });
  const [isPending, setIsPending] = useState(false);
  const nav = useNavigate();

  const onChange = (e) => {
    switch (e.target.name) {
      case "id":
        setInput({ ...input, id: e.target.value });
        break;
      case "password":
        setInput({ ...input, password: e.target.value });
        break;
    }
  };

  const onSubmit = () => {
    for (let key in input) {
      if (input[key].length === 0) {
        alert("모든 입력란을 입력해주세요");
        return;
      }
    }

    const fetchData = async () => {
      if (isPending) {
        return;
      }
      const body = {
        username: input.id,
        password: input.password,
      };
      setIsPending(true);
      try {
        const res = await instance.post("/login/", body);
        if (res.status === 200) {
          localStorage.setItem("access_token", res.data.access_token);
          nav("/");
        } else {
          alert("아이디 혹은 비번이 틀렸습니다");
        }
      } catch (error) {
        console.log(error);
        alert("아이디 혹은 비번이 틀렸습니다");
      }
      setIsPending(false);
    };
    // fetchData();
    alert("회원가입 성공");
  };

  return (
    <div>
      .title
      <div>유니빌</div>
      <div className="inputSection">
        <input
          type="text"
          className="inputBox"
          placeholder="아이디"
          name="id"
          onChange={onChange}
        />
        <input
          type="password"
          className="inputBox"
          placeholder="비밀번호"
          name="password"
          onChange={onChange}
        />
      </div>
      <button className="loginBtn" onClick={onSubmit}>
        로그인
      </button>
    </div>
  );
};

export default Login;
