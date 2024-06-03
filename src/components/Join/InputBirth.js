import styled from "styled-components";

const Wrapper = styled.div`
  width: 300px;
  height: 75px;
  position: relative;
  bottom: 50px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;
const Label = styled.label`
  margin-right: 200px;
  margin-bottom: 10px;
`;
const InputContainer = styled.div`
  display: flex;
  flex-direction: row;
  position: relative;
  right: 10px;
  gap: 10px; /* Space between elements */
`;

const InputBox = styled.input`
  width: 90px;
  border-color: rgba(102, 102, 102, 0.2);
  border-radius: 12px;
  height: 30px;
  padding: 5px;
`;

const SelectBox = styled.select`
  width: 100px;
  border-color: rgba(102, 102, 102, 0.2);
  border-radius: 12px;
  padding: 5px;
`;

const InputBirth = ({
  birthYear,
  setBirthYear,
  birthMonth,
  setBirthMonth,
  birthDay,
  setBirthDay,
}) => {
  return (
    <Wrapper>
      <Label>생년월일</Label>
      <InputContainer>
        <InputBox
          type="number"
          value={birthYear}
          onChange={(e) => setBirthYear(e.target.value)}
          required
          placeholder="년도(YYYY)"
        ></InputBox>
        <SelectBox
          value={birthMonth}
          onChange={(e) => setBirthMonth(e.target.value)}
          required
        >
          <option value="01">1월</option>
          <option value="02">2월</option>
          <option value="03">3월</option>
          <option value="04">4월</option>
          <option value="05">5월</option>
          <option value="06">6월</option>
          <option value="07">7월</option>
          <option value="08">8월</option>
          <option value="09">9월</option>
          <option value="10">10월</option>
          <option value="11">11월</option>
          <option value="12">12월</option>
        </SelectBox>
        <InputBox
          type="number"
          value={birthDay}
          onChange={(e) => setBirthDay(e.target.value)}
          required
          placeholder="일(DD)"
        ></InputBox>
      </InputContainer>
    </Wrapper>
  );
};

export default InputBirth;
