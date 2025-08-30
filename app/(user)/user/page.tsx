import { Metadata } from "next";
import DashboardUnderMenu from "./DashboardUnderMenu";

export const metadata: Metadata = {
  title: "Panel administracyjny",
};

export default async function Page() {
  return (
    <div className="font-sans w-full">
      <DashboardUnderMenu />
    </div>
  );
}
