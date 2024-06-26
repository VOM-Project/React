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
  bottom: 15px;
`;

const PExplain = styled.p`
  position: relative;
  bottom: 30px;
  right: 102px;
  font-size: 12px;
`;

const SelectBox = styled.select`
  border-radius: 5px;
  width: 100%;
  height: 30px;
  border-color: rgba(102, 102, 102, 0.5);
  position: relative;
  bottom: 30px;
`;

const KeywordBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 10px;
  position: relative;
  bottom: 35px;
`;

const Keyword = styled.div`
  background-color: #e0e0e0;
  border-radius: 5px;
  padding: 5px 10px;
  margin: 5px;
  font-size: 14px;
`;
const RemoveButton = styled.button`
  background: none;
  border: none;
  color: black;
  cursor: pointer;
  font-size: 8px;
  position: relative;
  left: 7px;
  bottom: 10px;
`;

const InputKeyword = ({ keyword, setKeyword }) => {
  const handleSelectKeyword = (e) => {
    const selectedKeyword = e.target.value.trim(); // 선택된 값을 얻어옴
    if (selectedKeyword !== "") {
      setKeyword((prevList) => [...prevList, selectedKeyword]);
    }
  };
  const handleRemoveKeyword = (kw) => {
    setKeyword((prevList) => prevList.filter((item) => item !== kw));
  };

  return (
    <Wrapper>
      <Label>관심키워드</Label>
      <PExplain>3개를 선택하세요</PExplain>
      <SelectBox value={keyword} onChange={handleSelectKeyword} required>
        <option value="">선택하세요</option>
        <option value="공부">공부</option>
        <option value="운동">운동</option>
        <option value="일상">일상</option>
        <option value="여행">여행</option>
        <option value="맛집">맛집</option>
        <option value="영화">영화</option>
        <option value="독서">독서</option>
        <option value="음악">음악</option>
        <option value="개발">개발</option>
        <option value="디자인">디자인</option>
        <option value="기획">기획</option>
        <option value="영어">영어</option>
        <option value="사진">사진</option>
        <option value="패션">패션</option>
      </SelectBox>
      <KeywordBox>
        {keyword.map((kw, index) => (
          <Keyword key={index}>
            {kw}
            <RemoveButton onClick={() => handleRemoveKeyword(kw)}>
              X
            </RemoveButton>
          </Keyword>
        ))}
      </KeywordBox>
    </Wrapper>
  );
};

export default InputKeyword;
