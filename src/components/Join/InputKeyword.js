import styled from "styled-components";
/* 관심키워드 선택 3개 되어서 밑에 좌라락 보여주도록 애니메이션 수정 */
const Wrapper = styled.div`
  width: 300px;
  height: 75px;
  position: relative;
  display: flex;
  flex-direction: column;
  bottom: 30px;
  right: 5px;
`;
const Label = styled.label`
  margin-right: 200px;
  margin-bottom: 5px;
  position: relative;
  right: 10px;
`;

const SelectBox = styled.select`
  border-radius: 5px;
  width: 100%;
  height: 30px;
  border-color: rgba(102, 102, 102, 0.5);
`;

const InputKeyword = ({ keyword, setKeyword }) => {
  return (
    <Wrapper>
      <Label>관심키워드</Label>
      <SelectBox
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        required
      >
        <option value="1">공부</option>
        <option value="2">운동</option>
        <option value="3">일상</option>
        <option value="4">여행</option>
        <option value="5">맛집</option>
        <option value="6">영화</option>
        <option value="7">독서</option>
        <option value="8">음악</option>
        <option value="9">개발</option>
        <option value="10">디자인</option>
        <option value="11">기획</option>
        <option value="12">영어</option>
        <option value="13">사진</option>
        <option value="14">패션</option>
      </SelectBox>
    </Wrapper>
  );
};

export default InputKeyword;
