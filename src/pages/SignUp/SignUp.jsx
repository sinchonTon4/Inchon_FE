import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// const initValidState = {
//   username: false,
//   phonenum: false,
//   email: false,
//   password: false,
//   passwordConfirm: false,
//   phonenumValid: false,
//   emailValid: false,
//   passwordEqual: false,
// };

const SignUp = () => {
  const [input, setInput] = useState({
    username: "",
    phonenum: "",
    email: "",
    password: "",
    passwordConfirm: "",
    validNum: "",
  });
  const [isPending, setIsPending] = useState(false);
  // const [isValid, setIsValid] = useState(initValidState);
  const nav = useNavigate();

  const onChange = (e) => {
    switch (e.target.name) {
      case "username":
        setInput({ ...input, username: e.target.value });
        break;
      case "phonenum":
        setInput({ ...input, phonenum: e.target.value });
        break;
      case "email":
        setInput({ ...input, email: e.target.value });
        break;
      case "password":
        setInput({ ...input, password: e.target.value });
        break;
      case "passwordConfirm":
        setInput({ ...input, passwordConfirm: e.target.value });
        break;
      case "validNum":
        setInput({ ...input, validNum: e.target.value });
        break;
    }
  };

  const onSubmit = () => {
    // setIsValid(initValidState);
    for (let key in input) {
      if (input[key].length === 0) {
        alert("모든 입력란을 입력해주세요");
        return;
      }
      // } else {
      //   console.log(key);

      //   setIsValid((prevState) => ({ ...prevState, [key]: true }));
    }

    let phoneRule = /^(01[016789]{1})[0-9]{3,4}[0-9]{4}$/;
    if (!phoneRule.test(input.phonenum)) {
      // setIsValid({ ...isValid, phonenumValid: true });
      alert("전화번호 형식이 잘못되었습니다");
      return;
    }
    if (
      !input.email
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
    ) {
      alert("이메일 형식이 올바르지 않습니다");
      return;
    }
    if (input.password != input.passwordConfirm) {
      alert("비밀번호가 일치하지 않습니다");
      return;
    }

    const fetchData = async () => {
      if (isPending) {
        return;
      }
      const body = {
        username: input.username,
        password: input.password,
        phonenum: input.phonenum,
        email: input.email,
      };
      setIsPending(true);
      try {
        const res = await instance.post("/user/signup/", body);
        if (res.status === 200) {
          nav("/");
        }
      } catch (error) {
        console.log(error);
      }
      setIsPending(false);
    };
    // fetchData();
    alert("회원가입 성공");
  };

  const onSubmitValidEmail = () => {
    //api 요청
  };

  return (
    <div>
      <div>회원가입</div>
      <div className="inputSection">
        <div className="inputWrapper">
          <p className="inputText">이름</p>
          <input
            type="text"
            className="inputBox"
            placeholder="이름을 입력하세요"
            onChange={onChange}
            name="username"
          />
          <p className="alertText">이름을 입력해주세요</p>
        </div>
        <div className="inputWrapper">
          <p className="inputText">전화번호</p>
          <input
            type="text"
            className="inputBox"
            placeholder="전화번호를 입력하세요"
            onChange={onChange}
            name="phonenum"
          />
        </div>
        <div className="inputWrapper">
          <p className="inputText">이메일</p>
          <input
            type="text"
            className="inputBox"
            placeholder="이메일을 입력하세요"
            onChange={onChange}
            name="email"
          />
          <button onClick={onSubmitValidEmail} className="submitEmailBtn">
            인증하기
          </button>
        </div>
        <div className="inputWrapper">
          <p className="inputText">인증번호</p>
          <input
            type="text"
            className="inputBox"
            placeholder="인증번호를 입력하세요"
            onChange={onChange}
            name="validNum"
          />
        </div>
        <div className="inputWrapper">
          <p className="inputText">비밀번호</p>
          <input
            type="password"
            className="inputBox"
            placeholder="비밀번호를 입력하세요"
            onChange={onChange}
            name="password"
          />
        </div>
        <div className="inputWrapper">
          <p className="inputText">비밀번호 확인</p>
          <input
            type="password"
            className="inputBox"
            placeholder="비밀번호를 입력하세요"
            onChange={onChange}
            name="passwordConfirm"
          />
        </div>
      </div>
      <button className="submitBtn" onClick={onSubmit}>
        가입하기
      </button>
    </div>
  );
};

export default SignUp;
