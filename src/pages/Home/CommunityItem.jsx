import React from "react";
import mockImage from "./mockImage.png";
import styled from "styled-components";

const CommunityItem = ({ rankNum, textTitle, textContent, itemImg }) => {
  return (
    <ItemWrapper>
      <div className="circle">{rankNum}</div>
      <div className="boxWrapper">
        <div className="textSection">
          <div className="textTitle">{textTitle}</div>
          <div className="textContent">{textContent}</div>
        </div>
        <img src={itemImg} alt="" className="itemImg" />
      </div>
    </ItemWrapper>
  );
};

export default CommunityItem;

const ItemWrapper = styled.div`
  position: relative;
  height: 80%;
  cursor: pointer;
  .circle {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: -25px;
    background: #87c5ff;
    color: white;
    font-size: 20px;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    text-align: center;
    line-height: 50px;
    font-weight: 900;
  }
  .boxWrapper {
    display: flex;
    align-items: center;
    text-align: center;
    gap: 10px;
    padding: 30px 10px 10px 10px;
    border-top: 4px solid #87c5ff;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
    background-color: white;
    height: 100%;
  }

  .textSection {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .textTitle {
    width: 80%;
    background: #c0e1ff;

    color: #53acff;

    padding: 5px 10px;
    font-size: 18px;
    font-weight: 900;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  }

  .textContent {
    font-size: 12px;
    font-family: "SCD-ExtraLight";
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 5; /* 3줄까지만 보여줌 */
    white-space: normal;
    line-height: 1.2;
  }
  .itemImg {
    width: 30%;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  }
`;
