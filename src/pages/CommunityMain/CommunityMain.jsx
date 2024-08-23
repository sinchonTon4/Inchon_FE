import React, { useEffect, useState } from "react";
import { instance } from "../../api/instance";
import styled from "styled-components";

// const LIMIT = 6; 몇개씩 줄거냐

//최신순
// 따로 get  공감순 필터링

const CommunityMainItem = ({ item }) => {
  return (
    <div>
      {item.content}
      {/* <Link to="/comunityDeatil/:community_id"></Link> */}
    </div>
  );
};

const CommunityMain = () => {
  const [order, setOrder] = useState("최신순");
  const [category, setCategory] = useState("식재료");
  const [items, setItems] = useState([
    { content: "더미데이터" },
    { content: "덤데2" },
    { content: "zzzzz2" },
  ]);
  const [offeset, setOffset] = useState(0);
  const [hasNext, setHasNext] = useState(false);

  const setOrderCategory = (event) => {
    setOrder(event.target.value);
    console.log(order);
  };

  const setCategoryDetail = (event) => {
    setOrder(event.target.value);
    console.log(order);
  };

  // 처음에 들어오자마자 가져오는 데이터는 최신순  공감순 누르면 공감순 정렬 데이터
  // 만약 nextCursor가 null이면 버튼 비활성화
  // const handleLoad = async (options) => {
  //   try {
  //     const res = await instance.get(`/search?order=${options.order}&offset=${options.offset}&limit=${options.limit}`);
  //     setItems(res.data.items);
  //     setHasNext(res.data.hasNext); // 예시로 hasNext를 응답 데이터에서 가져옴
  //   } catch (e) {
  //     console.log(e.message);
  //   }
  // };

  // const handleLoadMore = async () => {
  //   await handleLoad({ order, offset, limit: 6 }); // 예시로 LIMIT을 6으로 설정
  //   setOffset((prev) => prev + 6); // 페이지네이션을 위해 오프셋 증가
  // };

  // useEffect(() => {
  //   handleLoad({ order, offset: 0, limit: LIMIT });
  // }, [order]);

  return (
    <div>
      CommunityMain
      <select value={order} onChange={setOrderCategory}>
        <option value="최신순">최신순</option>
        <option value="공감순">공감순</option>
      </select>
      <select value={category} onChange={setCategoryDetail}>
        <option value="식재료">식재료</option>
        <option value="생필품">생필품</option>
      </select>
      <MyDiv> Selected Order: {order}</MyDiv>
      <div> Selected Categoty: {category}</div>
      {items.length > 0 ? (
        items.map((item, index) => (
          <CommunityMainItem key={index} item={item} />
        ))
      ) : (
        <div>작성된 글이 없습니다.</div>
      )}
      {hasNext && <button onClick={handleLoadMore}>더 보기</button>}
    </div>
  );
};

export default CommunityMain;

const MyDiv = styled.div`
  font-family: "SSanTokki";
`;
