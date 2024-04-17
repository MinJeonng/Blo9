interface Props {
  children?: string;
}
export function ErrorMsgRed({ children }: Props) {
  return <p style={{ color: 'red', fontSize: '12px' }}>{children}</p>;
}
export function ErrorMsgGrey({ children }: Props) {
  return <p style={{ color: '#777', fontSize: '12px' }}>{children}</p>;
}
