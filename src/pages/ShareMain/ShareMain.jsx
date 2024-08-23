import React, { useEffect, useState } from "react";
import Headers from "../../components/Headers";
import styled from "styled-components";
import RankItem from "../Home/RankItem";
import mockImage from "../Home/mockImage.png";
import { useNavigate } from "react-router-dom";
import ShareItem from "./ShareItem";
import { instance } from "../../api/instance";

const ShareMain = () => {
  const [currentShare, setCurrentShare] = useState("fooditem");
  const [dataRank, setDataRank] = useState([]);
  const [dataList, setDataList] = useState([]);
  const nav = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const params = {
          category: currentShare,
          order: "people_num",
        };
        const res = await instance.get("/cobying", { params });
        setDataList(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    // fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await instance.get("tributes/footprints/", inputData);
        setDataRank(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    // fetchData();
  }, [currentShare]);

  const onClickBtn = (e) => {
    setCurrentShare(e.target.name);
  };

  return (
    <div>
      <Headers></Headers>
      <SectionWrapper>
        <div className="sectionWrapper">
          <div className="tagWrapper">
            <div className="titleTag">00대학교 인기 공동 구매</div>
            <div className="subTagWrapper">
              <button
                className={`subTag ${currentShare === "fooditem" ? "isSelected" : ""}`}
                name="fooditem"
                onClick={onClickBtn}
              >
                식료품
              </button>
              <button
                className={`subTag ${currentShare === "lifeitem" ? "isSelected" : ""}`}
                name="lifeitem"
                onClick={onClickBtn}
              >
                생필품
              </button>
            </div>
          </div>
          <div className="contentWrapper">
            {[1, 2, 3].map((item) => {
              return (
                <ShareContent
                  onClick={() => {
                    nav(`/shareDetail/1`);
                  }}
                  className="sharecontent"
                >
                  <RankItem
                    rankNum={2}
                    shareAmount={10}
                    totalAmount={50}
                    itemImg={mockImage}
                    itemTitle={"[KF365] 사과 하우스 사과 1kg"}
                    itemPrice={"9,900원"}
                  ></RankItem>
                </ShareContent>
              );
            })}
          </div>
        </div>
        <div className="sectionWrapper">
          <div className="tagWrapper secondTagSection">
            <div className="titleTag">
              00대학교 공동 구매 주민들을 모으고 있어요.
            </div>
            <div className="subTagWrapper">
              <button
                className="subTag secondTag"
                name="foodItem"
                onClick={() => {
                  nav("/shareNew");
                }}
              >
                공동 구매 글쓰기
              </button>
            </div>
          </div>
          <div className="contentWrapperSecond">
            {[1, 2, 3, 4].map((item) => {
              return (
                <ShareContentSecond
                  onClick={() => {
                    nav(`/shareDetail/1`);
                  }}
                  className="sharecontent"
                >
                  <ShareItem
                    shareAmount={10}
                    totalAmount={50}
                    itemImg={mockImage}
                    itemTitle={"[KF365] 사과 하우스 사과 1kg"}
                    itemPrice={"9,900원"}
                  ></ShareItem>
                </ShareContentSecond>
              );
            })}
          </div>
        </div>
      </SectionWrapper>
    </div>
  );
};

export default ShareMain;

const SectionWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 50px;
  margin-bottom: 50px;

  * {
    font-family: "SCD-Medium";
  }

  .sectionWrapper {
    display: flex;
    flex-direction: column;
    gap: 20px;
    width: 90%;
    margin-top: 30px;
  }

  .tagWrapper {
    display: flex;
    align-items: center;
    gap: 20px;
  }

  .secondTagSection {
    justify-content: space-between;
  }

  .titleTag {
    background: #53acff;
    color: white;
    text-align: center;
    font-size: 30px;
    font-style: normal;
    font-weight: 500;
    line-height: 74px;
    padding: 0px 25px 0px 25px;
    /* width: 350px; */
    height: 74px;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  }

  .subTagWrapper {
    display: flex;
    gap: 20px;
  }

  .subTag {
    cursor: pointer;
    width: 100%;
    background: #c0e1ff;
    color: white;
    text-align: center;
    font-size: 20px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    border: none;
    padding: 8px 25px 8px 25px;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  }

  .secondTag {
    background: #b3daff;
    color: #53acff;
  }

  .isSelected {
    background: #53acff;
  }

  .contentWrapper {
    background-color: #f6f6f6;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
    height: 60vh;
    display: flex;
    gap: 20px;
    justify-content: center;
  }

  .contentWrapperSecond {
    background-color: #f6f6f6;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
    /* height: 60vh; */
    display: flex;
    flex-wrap: wrap;
    gap: 40px;
    justify-content: space-evenly;
    padding: 50px 30px;
  }
`;

const ShareContent = styled.div`
  width: 20%;
  height: 60%;
  background-color: white;
  &:first-child {
    margin-top: 6%;
  }
  &:nth-child(2) {
    margin-top: 3%;
  }
  &:nth-child(3) {
    margin-top: 9%;
  }
`;

const ShareContentSecond = styled.div`
  width: 47%;
  height: 150px;
  background-color: white;
  cursor: pointer;
`;
