import styled from 'styled-components';

interface Props {
  text: string;
  setValue: (val: string) => void;
  placeholder?: string;
  type?: string;
  refName?: any;
  inputFunc?: any;
}

const BoxStyle = styled.div`
  width: 100%;
  border: none;
  border-radius: 6px;
  background-color: #f6f7f9;
  box-sizing: border-box;
  padding: 10px;
  color: #89939e;
  font-size: 14px;
  margin-bottom: 20px;
  label {
    display: block;
  }
  input {
    width: 100%;
    border: none;
    background: none;
    line-height: 2;
    margin-top: 6px;
  }
`;

export default function InputText({
  text,
  type,
  placeholder,
  setValue,
  refName,
  inputFunc,
}: Props) {
  return (
    <BoxStyle>
      <label>{text}</label>
      <input
        type={type || 'text'}
        placeholder={placeholder || text}
        onChange={(e) => setValue(e.target.value)}
        ref={refName}
        onInput={inputFunc ? (e) => inputFunc(e) : undefined}
      />
    </BoxStyle>
  );
}
