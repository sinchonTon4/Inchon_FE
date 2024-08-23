import React, { useEffect, useState } from "react";
import userIcon from "../../assets/userIcon.png";
import styled from "styled-components";
import mockImage from "../ShareMain/mockImage.png";
import Headers from "../../components/Headers";
import { useNavigate, useParams } from "react-router-dom";
import { instance } from "../../api/instance";

const mockData = {
  id: 5,
  created_at: "2024-08-23",
  title: "책 살 사람",
  description: "나랑 책 사람",
  img: "/media/cobying_images/%ED%8F%AC%ED%8F%AC%EC%A6%88_%EB%B0%98%EB%A0%A4%EB%8F%99%EB%AC%BC_%EC%9E%A5%EB%A1%80%EC%8B%9D%EC%9E%A5_%EC%84%B8%EC%A2%85%EC%A0%90_icUNYag.png",
  price: 1000,
  product_name: "책",
  link: "http://www.naver.com",
  people_num: 0,
  product_category: "food",
  tag: 1,
};

const ShareDetail = () => {
  const { id } = useParams();
  // const [mockData, setMockData] = useState({});
  const nav = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await instance.get(`/cobying/${id}/`);
        console.log(res);

        // setMockData(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);
  const onApply = () => {
    const fetchData = async () => {
      try {
        const res = await instance.patch(`/cobying/${id}/count`, {
          cobying_id: id,
        });
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
    alert("참여가 완료되었습니다");
    nav("/shareMain");
  };
  return (
    <>
      <Headers></Headers>
      <SectionWrapper>
        <div className="innerWrapper">
          <img className="mainImg" src={mockImage} alt="" />
          <div className="textWrapper">
            <div className="itemTag">식료품</div>
            <div className="itemTitle">{mockData.product_name}</div>
            <div className="subTagWrapper">
              {[1, 2, 3].map((item) => {
                return <div className="itemSubTag">ㅇㅇㅇㅇ</div>;
              })}
            </div>
            <div className="minorWrapper">
              <img className="userIcon" src={userIcon} alt="" />
              <div className="shareAmount">{`${11}명/${50}명`}</div>
              <div className="totalBar">
                <ShareBar
                  width={(12 / 50) * 100}
                  className="shareBar"
                ></ShareBar>
              </div>
            </div>
            <div className="itemPrice">{mockData.price}원</div>
            <div className="userNote">{mockData.description}</div>
            <button className="applyBtn" onClick={onApply}>
              참여하기
            </button>
          </div>
        </div>
      </SectionWrapper>
    </>
  );
};

export default ShareDetail;

const SectionWrapper = styled.div`
  * {
    font-family: "SCD-Medium";
  }
  /* width: 100vw;
  height: 80vh; */
  display: flex;
  justify-content: center;
  align-items: center;

  .innerWrapper {
    width: 100%;
    height: 100%;
    margin: 50px 50px;
    background: #f6f6f6;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
    display: flex;
    justify-content: space-between;
    gap: 20px;
    align-items: center;
    padding: 50px 100px;
  }

  .mainImg {
    width: 35%;
    height: 35%;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  }

  .textWrapper {
    flex: 1;
    justify-content: right;
    text-align: right;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-end;
    gap: 20px;
  }

  .itemTag {
    width: 10%;
    background: #53acff;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
    padding: 10px 20px;
    text-align: center;
    color: white;
  }

  .itemTitle {
    font-size: 26px;
  }

  .subTagWrapper {
    display: flex;
    gap: 10px;
  }
  .itemSubTag {
    /* width: 40px; */
    height: 20px;
    background-color: #c0e1ff;
    border-radius: 10px;
    color: #0085ff;
    font-size: 10px;
    line-height: 20px;
    padding: 0px 10px;
  }

  .itemPrice {
    font-size: 26px;
    font-family: "SCD-Bold";
  }

  .minorWrapper {
    display: flex;
    gap: 10px;
    width: 70%;
    align-items: center;
  }

  .shareAmount {
    font-size: 14px;
    width: 30%;
  }

  .userIcon {
    width: 20px;
    height: 20px;
  }

  .totalBar {
    width: 100%;
    height: 18px;
    background-color: #53acff;
    border-radius: 10px;
    position: relative;
  }

  .userNote {
    background-color: white;
    width: 60%;
    height: 50px;
    text-align: left;
    padding: 30px;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  }

  .applyBtn {
    width: 30%;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
    padding: 10px 20px;
    text-align: center;
    color: white;
    border: none;
    border-radius: 6px;
    background: #53acff;
    font-size: 16px;
    cursor: pointer;
    box-shadow: 0px 1px 4px 0px rgba(25, 33, 61, 0.08);
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
  box-shadow: 4px 0px 4px 0px rgba(0, 0, 0, 0.25);
`;
