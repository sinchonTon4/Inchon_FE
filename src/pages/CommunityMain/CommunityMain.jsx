import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Headers from "../../components/Headers.jsx";
import dumi from "../../assets/dumi.svg";
import { instance } from "../../api/instance.js";

const LIMIT = 9; // Number of items per page

const CommunityMainItem = ({ item, index }) => {
  const navigate = useNavigate();

  const goDetail = (id) => {
    navigate(`/comunity/${id}`);
  };

  return (
    <ItemWrap>
      <CircleBlue>{index}</CircleBlue>
      <WritingItem>
        <ItemContent>
          <ItemTitle>
            <div onClick={() => goDetail(item.id)}>{item.title}</div>
          </ItemTitle>
          {/* <TagContents>
            {item.tags.map((tag, i) => (
              <OneTag key={i}>{tag}</OneTag> // Add a unique key for each tag
            ))}
          </TagContents> */}
        </ItemContent>
        <ItemImg src={item.img || dumi} />
      </WritingItem>
    </ItemWrap>
  );
};

const CommunityMain = () => {
  const navigate = useNavigate();
  const [order, setOrder] = useState("최신순");
  const [category, setCategory] = useState(""); // Set default category to empty string
  const [items, setItems] = useState(["dkjnw"]);
  const [offset, setOffset] = useState(0);
  const [hasNext, setHasNext] = useState(false);

  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory);
    setOffset(0); // Reset offset when category changes
    setItems([]); // Clear current items
  };

  const handleOrderChange = () => {
    setOrder((prevOrder) => (prevOrder === "최신순" ? "공감순" : "최신순"));
  };

  const GotoNew = () => {
    navigate("/communityNew");
  };

  const fetchPosts = async (category, order, offset) => {
    const isOrder = order === "공감순" ? "like" : "";
    try {
      const response = await instance.get(`/community`, {
        params: {
          category: category,
          order: isOrder,
          page: 1, // Calculate page number from offset
        },
      });

      // Extract data from response
      const data = response.data.results.data;
      const nextUrl = response.data.next;
      const count = response.data.count;
      const hasNext = nextUrl !== null;

      // Update state with new data and pagination status
      setItems((prevItems) => [...prevItems, ...data]);
      setHasNext(hasNext);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const handleLoadMore = () => {
    setOffset((prevOffset) => prevOffset + LIMIT);
  };

  useEffect(() => {
    fetchPosts(category, order, offset);
  }, [category, order, offset]);

  return (
    <div>
      <Headers />
      <ButtonWrap>
        <CategoryButton
          isActive={category === ""}
          onClick={() => handleCategoryChange("")}
        >
          전체
        </CategoryButton>
        <CategoryButton
          isActive={category === "cook"}
          onClick={() => handleCategoryChange("cook")}
        >
          요리
        </CategoryButton>
        <CategoryButton
          isActive={category === "lifestyle"}
          onClick={() => handleCategoryChange("lifestyle")}
        >
          생활
        </CategoryButton>
      </ButtonWrap>

      <WritingComponet>
        <OrderBox>
          <button className="write" onClick={GotoNew}>
            글쓰기
          </button>
          <button className="toggle" onClick={handleOrderChange}>
            {order === "최신순" ? "공감순" : "최신순"}
          </button>
        </OrderBox>
        {items.length > 0 ? (
          <>
            <ItemWrapper>
              {items.map((item, index) => (
                <CommunityMainItem
                  key={item.id}
                  item={item}
                  index={index + 1}
                />
              ))}
            </ItemWrapper>
          </>
        ) : (
          <div className="notext">작성된 글이 없습니다.</div>
        )}
      </WritingComponet>

      {hasNext && <button onClick={handleLoadMore}>더 보기</button>}
    </div>
  );
};

export default CommunityMain;

// Styled components here...

const ButtonWrap = styled.div`
  width: calc(100% - 335px);
  margin: 47px 167.5px;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  gap: 90px;
`;

const CategoryButton = styled.button`
  cursor: pointer;
  width: 20%;
  max-width: 350px;
  height: 78px;
  flex: 1;
  background: ${({ isActive }) => (isActive ? "#53acff" : "#C0E1FF")};
  box-shadow: 0 3px 5px rgba(0, 0, 0, 0.3);
  border: none;
  color: ${({ isActive }) => (isActive ? "#fff" : "#53ACFF")};
  text-align: center;
  font-family: "SCD_Medium";
  font-size: 35px;
  font-style: normal;
  line-height: normal;
`;

const WritingComponet = styled.div`
  position: relative;
  min-height: 628px;
  width: calc(100% - 235px);
  margin: 0 117.5px;
  background: #f6f6f6;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  overflow: scroll;

  .notext {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #53acff;
    text-align: center;
    font-family: "SCD_Medium";
    margin-top: 100px;
  }
`;

const ItemWrap = styled.div`
  width: calc(100% - 152px);
  margin: 20px 76px;
  height: 255px;
  padding: 20px 0;
  position: relative;
`;

const CircleBlue = styled.div`
  background: #53acff;
  font-size: 35px;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  position: absolute;
  top: -30px;
  left: -30px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  z-index: 10;
`;

const WritingItem = styled.div`
  height: 200px;
  border-top: 5px solid #53acff;
  background: #fff;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  position: relative;
`;

const OrderBox = styled.div`
  position: absolute;
  width: 300px;
  margin-bottom: 20px;
  display: flex;
  gap: 20px;
  height: 50px;
  z-index: 10;
  text-align: center;
  top: 21px;
  right: 74px;

  .write {
    cursor: pointer;
    width: 181px;
    border: none;
    font-family: "SCD_Medium";
    color: #53acff;
    text-align: center;
    font-size: 20px;
    background: #c0e1ff;
    line-height: normal;
  }

  .toggle {
    cursor: pointer;
    width: 181px;
    border: none;
    font-family: "SCD_Medium";
    color: #fff;
    text-align: center;
    font-size: 20px;
    background: #53acff;
    line-height: normal;
  }
`;

const ItemWrapper = styled.div`
  position: relative;
  margin-top: 30px;
  padding-top: 30px;
`;

const ItemTitle = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;

  div {
    width: 40%;
    color: #fff;
    text-align: center;
    font-family: "SCD_Medium";
    font-size: 20px;
    max-width: 311px;
    display: flex;
    align-items: center;
    justify-content: center;
    line-height: normal;
    background: #53acff;
    height: 50px;
  }
`;

const ItemContent = styled.div`
  width: 65%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 150px 0 60px;
  gap: 27px;
`;

const TagContents = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 52px;
  gap: 20px;
`;

const OneTag = styled.div`
  width: 20%;
  background: #c0e1ff;
  color: #53acff;
  text-align: center;
  font-family: "SCD_Medium";
  font-size: 30px;
  line-height: normal;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ItemImg = styled.img`
  width: 20%;
  height: 80%;
  object-fit: cover;
  border-radius: 10px;
  margin-left: 20px;
  z-index: 5;
  position: absolute;
  top: 20px;
  right: 40px;
`;
