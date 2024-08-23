import React from "react";
import userIcon from "../../assets/userIcon.png";
import styled from "styled-components";
import mockImage from "./mockImage.png";

const ShareItem = ({
  shareAmount,
  totalAmount,
  itemImg,
  itemTitle,
  itemPrice,
}) => {
  return (
    <SectionWrapper>
      <img className="mainImg" src={mockImage} alt="" />
      <div className="textWrapper">
        <div className="itemTitle">{itemTitle}</div>
        <div className="itemPrice">{itemPrice}</div>
        <div className="minorWrapper">
          <img className="userIcon" src={userIcon} alt="" />
          <div className="shareAmount">{`${shareAmount}명/${totalAmount}명`}</div>
          <div className="totalBar">
            <ShareBar
              width={(shareAmount / totalAmount) * 100}
              className="shareBar"
            ></ShareBar>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default ShareItem;

const SectionWrapper = styled.div`
  background: #87c5ff;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  display: flex;
  justify-content: space-between;
  gap: 20px;
  align-items: center;
  padding: 20px;

  .mainImg {
    width: 120px;
    height: 120px;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  }

  .textWrapper {
    flex: 1;
    background: #fff;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
    height: 80px;
    padding: 20px 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .itemTitle {
    font-size: 16px;
  }

  .itemPrice {
    font-size: 14px;
  }

  .minorWrapper {
    display: flex;
    gap: 5px;
  }

  .shareAmount {
    font-size: 12px;
  }

  .userIcon {
    width: 12px;
    height: 12px;
  }

  .totalBar {
    width: 40%;
    background-color: #53acff;
    border-radius: 10px;
    position: relative;
  }
`;

const ShareBar = styled.div`
  position: absolute;
  background-color: #b3daff;
  left: 0;
  top: 0;
  width: ${(props) => `${props.width}%`};
  height: 100%;
  border-radius: 10px;
  z-index: 1;
`;
