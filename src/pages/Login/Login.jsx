import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { instance } from "../../api/instance";

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
        console.log(res);

        if (res.status === 200) {
          localStorage.setItem("access_token", res.data.access_token);
          localStorage.setItem("id", res.data.id);
          localStorage.setItem("username", res.data.username);
          alert("로그인 성공");

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
    fetchData();
  };

  return (
    <LoginSection>
      <div className="titleSection">
        <MainText className="mainText">유니빌</MainText>
        <SubText className="subText">
          자취생의 절약을 위한 공동 구매 커뮤니티{" "}
        </SubText>
      </div>
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
      <div className="buttonSection">
        <button className="loginBtn" onClick={onSubmit}>
          로그인
        </button>
        <button
          className="loginBtn"
          onClick={() => {
            nav("/signUp");
          }}
        >
          회원가입
        </button>
      </div>
    </LoginSection>
  );
};

export default Login;

const LoginSection = styled.div`
  * {
    box-sizing: border-box;
  }
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 50%;
  margin: 0 auto;
  margin-top: 10vh;
  gap: 40px;

  .titleSection {
    text-align: center;
  }

  .inputSection {
    display: flex;
    flex-direction: column;
    gap: 20px;
    width: 100%;
  }

  .inputSection input {
    width: 100%;
    border: 5px solid #c0e1ff;
    padding: 15px 40px;
    color: #53acff;
    font-size: 20px;
    font-family: "SCD-Medium";
    &:focus {
      outline: none;
    }
    &::placeholder {
      color: #53acff;
      font-size: 20px;
    }
  }

  .buttonSection {
    display: flex;
    width: 90%;
    justify-content: space-between;
  }

  .buttonSection button {
    background-color: #53acff;
    font-family: "SCD-Medium";
    border: none;
    color: white;
    font-size: 24px;
    width: 233px;
    height: 60px;
    cursor: pointer;
  }
`;

const MainText = styled.div`
  color: #53acff;
  text-align: center;
  font-family: "SSanTokki";
  font-size: 100px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin-bottom: 20px;
`;

const SubText = styled.div`
  color: #94cbff;
  font-family: "SSanTokki";
  font-size: 30px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;
