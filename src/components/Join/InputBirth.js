import styled from "styled-components";

const Wrapper = styled.div`
  width: 300px;
  height: 75px;
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
      생년월일
      <br />
      <input
        type="number"
        value={birthYear}
        onChange={(e) => setBirthYear(e.target.value)}
        required
        placeholder="년도(YYYY)"
      ></input>
      <select
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
      </select>
      <input
        type="number"
        value={birthDay}
        onChange={(e) => setBirthDay(e.target.value)}
        required
        placeholder="일(DD)"
      ></input>
    </Wrapper>
  );
};

export default InputBirth;
