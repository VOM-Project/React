import styled from "styled-components";

const Wrapper = styled.div`
  width: 300px;
  height: 75px;
  position: relative;
  display: flex;
  flex-direction: column;
  bottom: 70px;
`;
const Label = styled.label`
  margin-right: 250px;
  margin-bottom: 5px;
`;

const SelectBox = styled.select`
  border-radius: 5px;
  width: 100%;
  height: 40px;
  border-color: rgba(102, 102, 102, 0.5);
`;

const InputRegion = ({ region, setRegion }) => {
  return (
    <Wrapper>
      <Label>지역</Label>
      <SelectBox
        value={region}
        onChange={(e) => setRegion(e.target.value)}
        required
      >
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
      </SelectBox>
    </Wrapper>
  );
};

export default InputRegion;
