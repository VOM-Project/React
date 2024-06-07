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
  const handleSelectRegion = (e) => {
    const selectedRegion = e.target.value.trim(); // 선택된 값을 얻어옴
    if (selectedRegion !== "") {
      setRegion(selectedRegion);
    }
  };
  return (
    <Wrapper>
      <Label>지역</Label>
      <SelectBox value={region} onChange={handleSelectRegion} required>
        <option value="">선택하세요</option>
        <option value="서울특별시">서울특별시</option>
        <option value="경기도">경기도</option>
        <option value="인천광역시">인천광역시</option>
        <option value="강원도">강원도</option>
        <option value="충청도">충청도</option>
        <option value="대전광역시">대전광역시</option>
        <option value="세종특별시">세종특별시</option>
        <option value="광주광역시">광주광역시</option>
        <option value="전라도">전라도</option>
        <option value="경상도">경상도</option>
        <option value="대구광역시">대구광역시</option>
        <option value="울산광역시">울산광역시</option>
        <option value="부산광역시">부산광역시</option>
        <option value="제주도">제주도</option>
      </SelectBox>
    </Wrapper>
  );
};

export default InputRegion;
