type Props = {
  title?: string;
};

export default function Navbar({ title = "Text content" }: Props) {
  return <div>{title}</div>;
}