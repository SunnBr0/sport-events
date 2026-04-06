import { Outlet } from "react-router";
import { Header } from "../../widgets/header/ui/Header";

export const AppLayout = () => {
  return (
    <>
      <Header />
      <main >
        <Outlet />
      </main>
    </>
  );
};
