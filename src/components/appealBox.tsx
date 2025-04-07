interface AppealBoxProps {
  title: string;
  content: string;
}

export default function AppealBox({ title, content }: AppealBoxProps) {
  return (
    <>
      <h2 className="text-lg mb-1.5 font-semibold">{title}</h2>
      <p className="text-sm whitespace-pre-wrap">{content}</p>
    </>
  );
}
