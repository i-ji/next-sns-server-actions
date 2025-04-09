import LoadingPage from "@/app/components/layout/loading/LoadingPage";
import LoadingHeader from "./components/layout/loading/LoadingHeader";

export default function Loading() {
  const headerSlot = <LoadingHeader />;
  return <LoadingPage headerSlot={headerSlot} />;
}
