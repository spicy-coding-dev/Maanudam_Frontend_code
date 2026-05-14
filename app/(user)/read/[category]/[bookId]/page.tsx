import ReaderClient from "./ReaderClient";

export default async function Page({
  params,
}: {
  params: Promise<{ category: string; bookId: string }>;
}) {
  const { bookId } = await params;

  return <ReaderClient bookId={bookId} />;
}
