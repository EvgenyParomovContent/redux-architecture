import { Game } from "@/features/game";
import { Header } from "./header";
import { StoreProvider } from "./providers/store-provider";

export function App() {
  return (
    <StoreProvider>
      <HomePageLayout header={<Header />}>
        <Game />
      </HomePageLayout>
    </StoreProvider>
  );
}

function HomePageLayout({
  header,
  children,
}: {
  header: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-slate-50 min-h-screen">
      {header}
      <main className="pt-6 mx-auto w-max">{children}</main>
    </div>
  );
}
