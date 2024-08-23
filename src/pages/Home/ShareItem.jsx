import React from "react";
import mockImage from "./mockImage.png";
import styled from "styled-components";

const ShareItem = ({
  rankNum,
  shareAmount,
  totalAmount,
  itemImg,
  itemTitle,
  itemPrice,
}) => {
  return (
    <ItemWrapper>
      <div className="circle">{rankNum}</div>
      <div className="boxWrapper">
        <div className="shareAmount">{`${shareAmount}/${totalAmount}`}</div>
        <img src={itemImg} alt="" className="itemImg" />
        <div className="itemTitle">{itemTitle}</div>
        <div className="itemPrice">{itemPrice}</div>
      </div>
    </ItemWrapper>
  );
};

export default ShareItem;

const ItemWrapper = styled.div`
  position: relative;
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
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 10px;
    padding: 30px 0px 20px 0px;
    border-top: 4px solid #87c5ff;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
    background-color: white;
  }
  .shareAmount {
    width: 40%;
    background: #87c5ff;
    color: white;
    padding: 3px 0px;
    font-size: 14px;
  }
  .itemImg {
    width: 55%;
  }
  .itemTitle {
    font-size: 12px;
  }
  .itemPrice {
    font-size: 12px;
    font-family: "SCD-ExtraBold";
  }
`;
