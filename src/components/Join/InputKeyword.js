import styled from "styled-components";

const Wrapper = styled.div`
  width: 300px;
  height: 75px;
`;

const InputKeyword = ({ keyword, setKeyword }) => {
  return (
    <Wrapper>
      <select
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
      </select>
    </Wrapper>
  );
};

export default InputKeyword;
