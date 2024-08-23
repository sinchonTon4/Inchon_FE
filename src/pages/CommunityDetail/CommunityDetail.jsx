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

  return (
    <div>
      <Headers />
      <WriteDetailBox>
        <TagTitle>
          <WriteTitle>{detail.title || "Loading..."}</WriteTitle>
          <TagBox>
            {/* 태그를 렌더링하려면 실제 태그 데이터가 필요함 */}
            {/* 예를 들어, detail.tags.map(tag => <TagOneBox key={tag}>{tag}</TagOneBox>) */}
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
        <UserWriting>{detail.description || "Loading..."}</UserWriting>
      </WriteDetailBox>
      <CommentComp>
        <CommnetTitle>댓글</CommnetTitle>
        <CommentBack>
          {commentItems.map((item, index) => (
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
  width: 45px; /* Fixed typo */
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
`;

const CommentComp = styled.div`
  width: calc(100% - 256px); /* Fixed typo */
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
  width: calc(100% - 300px); /* Fixed typo */
  margin: 30px 150px 18px;
  height: 257px;
  padding: 15px;
  overflow: scroll;
`;

const CommentNewBox = styled.form`
  /* Changed to form to handle submit */
  width: calc(100% - 504px); /* Fixed typo */
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
  width: calc(100% - 530px); /* Fixed typo */
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
