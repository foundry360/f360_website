import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

type MarkdownBodyProps = {
  content: string;
};

/** Renders CMS / file-backed markdown — swap source, keep this component. */
export function MarkdownBody({ content }: MarkdownBodyProps) {
  return (
    <div className="prose-f360 max-w-5xl">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
    </div>
  );
}
