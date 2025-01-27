export default function ProductTag({ content }: { content: string }) {
  return (
    <div className="absolute top-0 left-0 bg-orange-500 text-white px-2 py-1 text-sm font-semibold z-10">
      {content}
    </div>
  );
}
