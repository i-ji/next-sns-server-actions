import LoadingPage from "@/app/components/layout/loading/LoadingPage";
import LoadingUserHeader from "@/app/components/layout/loading/LoadingUserHeader";

export default async function Loading() {
  const headerSlot = <LoadingUserHeader />;
  return <LoadingPage headerSlot={headerSlot} />;
}
