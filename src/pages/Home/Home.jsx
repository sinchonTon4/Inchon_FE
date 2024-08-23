import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Headers from "../../components/Headers";
import RankItem from "./RankItem";
import CommunityItem from "./CommunityItem";
import mockImage from "./mockImage.png";
import { useNavigate } from "react-router-dom";
import { instance } from "../../api/instance";

const Home = () => {
  const [currentShare, setCurrentShare] = useState("fooditem");
  const [currentCommunity, setCurrentCommunity] = useState("total");
  const [dataShare, setDataShare] = useState([]);
  const [dataCommunity, setDataCommunity] = useState([]);
  const nav = useNavigate();

  const gotoMain = () => {
    nav("/communityMain");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const params = {
          category: currentShare,
          order: "people_num",
          page: "1",
        };
        const res = await instance.get("/cobying/", { params });
        console.log(res);

        setDataShare(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [currentShare]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const params = {
          category: currentCommunity,
          order: "like",
          page: 1,
        };
        const res = await instance.get("/community", { params });
        setDataCommunity(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [currentCommunity]);

  const onClickBtn = (e) => {
    if (e.target.name === "fooditem" || e.target.name === "lifeitem") {
      setCurrentShare(e.target.name);
    } else {
      setCurrentCommunity(e.target.name);
    }
  };
  return (
    <div>
      <Headers></Headers>
      <SectionWrapper>
        <div className="sectionWrapper">
          <div className="tagWrapper">
            <div className="titleTag">인기 공동 구매</div>
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
          <div className="tagWrapper">
            <div className="titleTag" onClick={gotoMain}>
              커뮤니티 인기글
            </div>
            <div className="subTagWrapper">
              <button
                className={`subTag ${currentCommunity === "total" ? "isSelected" : ""}`}
                name="total"
                onClick={onClickBtn}
              >
                전체
              </button>
              <button
                className={`subTag ${currentCommunity === "cook" ? "isSelected" : ""}`}
                name="cook"
                onClick={onClickBtn}
              >
                요리
              </button>
              <button
                className={`subTag ${currentCommunity === "lifestyle" ? "isSelected" : ""}`}
                name="lifestyle"
                onClick={onClickBtn}
              >
                생활
              </button>
            </div>
          </div>
          <div className="contentWrapper">
            {[1, 2, 3].map((item) => {
              return (
                <CommunityContent
                  onClick={() => {
                    nav(`/communityDetail/`);
                  }}
                  className="communitycontent"
                >
                  <CommunityItem
                    rankNum={2}
                    textTitle={"쉬운 화장실 청소법"}
                    textContent={
                      " 건강과 지속 가능성을 추구하는 이들을 위해, 맛과 영양이 가득한 채식요리 레시피를 소개합니다. 이 글에서는 간단하지만 맛있는 채식 요리10가지를 선보입니다. 첫 번째 레시피는 아보카도 토스트, 아침 식사로완벽하며 영양소가 풍부합니다. 두 번째는 콩과 야채를 사용한 푸짐한채식 칠리, 포만감을 주"
                    }
                    itemImg={mockImage}
                  ></CommunityItem>
                </CommunityContent>
              );
            })}
          </div>
        </div>
      </SectionWrapper>
    </div>
  );
};

export default Home;

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

  .titleTag {
    width: 25%;
    background: #53acff;
    color: white;
    text-align: center;
    font-size: 30px;
    font-style: normal;
    font-weight: 500;
    line-height: 74px;
    cursor: pointer;
    /* padding: 16px 25px 16px 25px; */
    width: 350px;
    height: 74px;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  }

  .subTagWrapper {
    width: 100%;
    display: flex;
    gap: 20px;
  }

  .subTag {
    cursor: pointer;
    width: 15%;
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

const CommunityContent = styled(ShareContent)`
  width: 30%;
  height: 50%;
`;
