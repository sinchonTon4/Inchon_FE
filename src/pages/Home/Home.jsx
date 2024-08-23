import React from "react";
import styled from "styled-components";

const Home = () => {
  return (
    <SectionWrapper>
      <div className="sectionWrapper">
        <div className="tagWrapper">
          <div className="titleTag">인기 공동 구매</div>
          <div className="subTagWrapper">
            <button className="subTag">식료품</button>
            <button className="subTag">생필품</button>
          </div>
        </div>
        <div className="contentWrapper">
          <div className="shareSecond">2</div>
          <div className="shareFirst">1</div>
          <div className="shareThird">3</div>
        </div>
      </div>
      <div className="sectionWrapper">
        <div className="tagWrapper">
          <div className="titleTag">커뮤니티 인기글</div>
          <div className="subTagWrapper">
            <button className="subTag">전체</button>
            <button className="subTag">요리</button>
            <button className="subTag">생활</button>
          </div>
        </div>
        <div className="contentWrapper">
          <div className="shareSecond">2</div>
          <div className="shareFirst">1</div>
          <div className="shareThird">3</div>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default Home;

const SectionWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 50px;

  .sectionWrapper {
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 90%;
  }

  .tagWrapper {
    display: flex;
  }

  .titleTag {
    width: 25%;
    background: #53acff;
    color: white;
    text-align: center;
    font-family: "SCD-Medium";
    font-size: 35px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    /* padding: 16px 25px 16px 25px; */
    width: 320px;
    height: 74px;
  }

  .subTag {
    width: 10%;
    background: #53acff;
    color: white;
    text-align: center;
    font-family: "SCD-Medium";
    font-size: 20px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    padding: 16px 25px 16px 25px;
  }

  .contentWrapper {
    background-color: #f6f6f6;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
    height: 60vh;
  }
`;
