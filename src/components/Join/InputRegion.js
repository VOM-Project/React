import styled from "styled-components";

const Wrapper = styled.div`
  width: 300px;
  height: 75px;
`;

const InputRegion = () => {
  return (
    <Wrapper>
      <select>
        <option value="1">서울특별시</option>
        <option value="2">경기도</option>
        <option value="3">인천광역시</option>
        <option value="4">강원도</option>
        <option value="5">충청도</option>
        <option value="6">대전광역시</option>
        <option value="7">세종특별시</option>
        <option value="8">광주광역시</option>
        <option value="9">전라도</option>
        <option value="10">경상도</option>
        <option value="11">대구광역시</option>
        <option value="12">울산광역시</option>
        <option value="13">부산광역시</option>
        <option value="14">제주도</option>
      </select>
    </Wrapper>
  );
};

export default InputRegion;
