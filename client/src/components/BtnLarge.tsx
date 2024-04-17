import styled from 'styled-components';

interface Props {
  text: string;
  func?: (a?: any) => any;
}

const BoxStyle = styled.button`
  width: 100%;
  border: none;
  border-radius: 50px;
  text-align: center;
  background-color: #fbc02d;
  color: #fff;
  line-height: 50px;
  margin: 30px 0;
`;
export default function BtnLarge({ text, func }: Props) {
  return <BoxStyle onClick={func}>{text}</BoxStyle>;
}
