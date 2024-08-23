import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Headers from "../../components/Headers";
import styled from "styled-components";
import share from "../../assets/share.svg";
import heart from "../../assets/heart.svg";
import profile1 from "../../assets/profile1.svg";
import profile2 from "../../assets/profile2.svg";
import commentUp from "../../assets/commentUp.svg";
import axios from "axios";
import foodImg from "../../assets/foodItem.svg";

const CommunityDetail = () => {
  const { community_id } = useParams(); // community_id 가져오기
  const [like, setLike] = useState(0);
  const [comment, setComment] = useState("");
  const [commentItems, setCommentItems] = useState([]);
  const [detail, setDetail] = useState({});

  const dumi = [
    {
      user_id: 1,
      community_id: 1,
      description: "오늘 점심은 뭐 먹을까요? 우동? 돈까스?ㅋㅋㅋ",
      like: 0,
    },
    {
      user_id: 2,
      community_id: 1,
      description: "저는 돈까스가 좋네요! 👍",
      like: 2,
    },
    {
      user_id: 3,
      community_id: 1,
      description: "우동도 맛있지만 돈까스가 더 매력적이죠!",
      like: 5,
    },
  ];

  const user_id = localStorage.getItem("id") || "1"; // Default to "1" if no value is found

  const onClickLike = () => {
    setLike(like + 1);
  };

  const handleChange = (e) => {
    setComment(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 댓글 데이터 설정
    const commentData = {
      user_id: user_id,
      community_id: community_id,
      description: comment,
      like: 0,
    };

    try {
      const response = await axios.post(
        `/comments/${community_id}`,
        commentData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        setCommentItems([...commentItems, response.data]);
        setComment(""); // 댓글 입력 필드 비우기
      } else {
        console.error("댓글 작성 실패:", response.statusText);
      }
    } catch (error) {
      console.error("서버 요청 중 오류 발생:", error);
    }
  };

  useEffect(() => {
    const fetchPostDetail = async () => {
      try {
        const response = await axios.get(`/community/${community_id}`);
        if (response.status === 200) {
          const data = response.data;
          setDetail(data);
          setLike(data.like); // 게시물의 like 수 설정
        } else {
          console.error("게시물 데이터 가져오기 실패:", response.statusText);
        }
      } catch (error) {
        console.error("게시물 데이터 요청 중 오류 발생:", error);
      }
    };

    fetchPostDetail();
  }, [community_id]);

  useEffect(() => {
    // Placeholder for future effects if needed
  }, [commentItems]);

  return (
    <div>
      <Headers />
      <WriteDetailBox>
        <TagTitle>
          <WriteTitle>{detail.title || "식료품 공구 방법"}</WriteTitle>
          <TagBox>
            {/* Render tags if available */}
            {detail.tags?.map((tag, index) => (
              <TagOneBox key={index}>{tag}</TagOneBox>
            ))}
          </TagBox>
        </TagTitle>
        <MiddleSection>
          <CircleBox>
            <div className="CircleOne">
              <BlueImg onClick={onClickLike} src={heart} />
              <p className="like">{like || 0}</p>
            </div>
            <div>
              <BlueImg src={share} />
            </div>
          </CircleBox>
          <ImgCenter src={detail.img || foodImg} alt="Community" />
          <div></div>
        </MiddleSection>
        <UserWriting>
          {detail.description ||
            "건강과 지속 가능성을 추구하는 이들을 위해, 맛과 영양이 가득한 채식 요리 레시피를 소개합니다. 이 글에서는 간단하지만 맛있는 채식 요리 10가지를 선보입니다. 첫 번째 레시피는 아보카도 토스트, 아침 식사로 완벽하며 영양소가 풍부합니다. 두 번째는 콩과 야채를 사용한 푸짐한 채식 칠리, 포만감을 주는 동시에 영양소를 공급합니다. 세 번째는 색다른 맛의 채식 패드타이, 고소한 땅콩 소스로 풍미를 더합니다. 네 번째는 간단하고 건강한 콥 샐러드, 신선한 야채와 단백질이 가득합니다. 다섯 번째로는 향긋한 허브와 함께하는 채식 리조또, 크리미한 맛이 일품입니다. 여섯 번째는 에너지를 주는 채식 스무디 볼, 과일과 견과류의 완벽한 조합입니다. 일곱 번째는 건강한 채식 버거, 만족감 있는 식사를 제공합니다. 여덟 번째는 채식 파스타 프리마베라, 신선한 야채와 토마토 소스의 조화가 뛰어납니다. 아홉 번째는 채식 볶음밥, 풍부한 맛과"}
        </UserWriting>
      </WriteDetailBox>
      <CommentComp>
        <CommnetTitle>댓글</CommnetTitle>
        <CommentBack>
          {(commentItems.length > 0 ? commentItems : dumi).map((item, index) => (
            <CommentOneBox key={index}>
              <div>
                <img src={profile1} alt="profile" />
              </div>
              <p>{item.description}</p>
            </CommentOneBox>
          ))}
        </CommentBack>
        <CommentNewBox onSubmit={handleSubmit}>
          <img src={profile2} alt="profile" />
          <CommentInput value={comment} onChange={handleChange} />
          <img src={commentUp} className="commentUp" onClick={handleSubmit} />
        </CommentNewBox>
      </CommentComp>
    </div>
  );
};

export default CommunityDetail;

// Styled components...

const WriteDetailBox = styled.div`
  margin: 60px 76px 37px;
  width: calc(100% - 152px);
  background: #f6f6f6;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const TagTitle = styled.div`
  width: calc(100% - 90px);
  margin: 54px 47px 0;
  display: flex;
  justify-content: space-between;
`;

const WriteTitle = styled.div`
  width: 40%;
  height: 112px;
  background: #53acff;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  color: #fff;
  text-align: center;
  font-family: "SCD_Medium";
  font-size: 50px;
  line-height: normal;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TagBox = styled.div`
  width: 60%;
  height: 112px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 40px;
`;

const TagOneBox = styled.div`
  height: 60px;
  background: #c0e1ff;
  width: 30%;
  color: #53acff;
  text-align: center;
  font-family: "SCD_Medium";
  font-size: 30px;
  line-height: normal;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MiddleSection = styled.div`
  width: calc(100% - 90px);
  margin: 0 47px;
  position: relative;
  display: flex;
  justify-content: space-between;
`;

const CircleBox = styled.div`
  margin: 10px 0 0 10px;
  display: flex;
  flex-direction: row;
  gap: 20px;
  width: 85px;

  .CircleOne {
    text-align: center;
  }

  .like {
    height: 10px;
  }
`;

const BlueImg = styled.img`
  width: 45px;
`;

const ImgCenter = styled.img`
  width: 220px;
  height: 220px;
`;

const UserWriting = styled.div`
  margin: 5px 60px 30px;
  width: calc(100% - 120px);
  background: #fff;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  min-height: 220px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  line-height: 150%;
`;

const CommentComp = styled.div`
  width: calc(100% - 256px);
  margin: 0 128px 56px;
  background: #f6f6f6;
  min-height: 500px;
`;

const CommnetTitle = styled.div`
  width: 198px;
  height: 92px;
  color: #53acff;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "SCD_Medium";
  font-size: 40px;
  line-height: normal;
  text-align: center;
  background: #c0e1ff;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
`;

const CommentBack = styled.div`
  background-color: #fff;
  width: calc(100% - 300px);
  margin: 30px 150px 18px;
  height: 257px;
  padding: 15px;
  overflow-y: auto; /* Changed to auto */
`;

const CommentNewBox = styled.form`
  width: calc(100% - 504px);
  margin: 0 252px;
  display: flex;
  justify-content: space-between;
  gap: 20px;
`;

const CommentInput = styled.input`
  width: 100%;
  min-width: 200px;
  background: #c0e1ff;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  border: none;
  color: #000;
  text-align: center;
  font-family: "SCD_Medium";
  font-size: 15px;
  line-height: normal;
`;

const CommentOneBox = styled.div`
  width: calc(100% - 530px);
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 26px;
  p {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 33px;
    background: #c0e1ff;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  }
`;
