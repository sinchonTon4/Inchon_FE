import styled from "styled-components";

const Headers = () => {
  return (
    <HeaderWrapper>
      <HeaderBox>
        <Logo>유니빌</Logo>
        <Profile>프</Profile>
      </HeaderBox>
    </HeaderWrapper>
  );
};

export default Headers;

const HeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  height: 164px;
  background: #53acff;
  position: relative;
`;

const HeaderBox = styled.div`
  width: calc(100% - 114px);
  margin: 0 57px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const LeftSpacer = styled.div`
  flex: 1; /* 왼쪽 공간을 차지하여 로고를 가운데에 위치시킵니다. */
`;

const Logo = styled.div`
  font-family: "SSanTokki";
  font-size: 60px;
  color: #fff;
  text-align: center;
  flex: 1; /* 로고가 가운데 위치하도록 설정 */
`;

const Profile = styled.div`
  color: #fff;
  font-size: 18px;
`;
