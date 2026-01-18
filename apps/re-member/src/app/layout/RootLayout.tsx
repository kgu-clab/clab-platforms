import { Outlet } from "react-router";

export default function RootLayout() {
  return (
    <main className="absolute inset-0 overflow-y-hidden">
      <div className="max-w-max-width relative mx-auto flex h-full min-h-screen flex-col overflow-y-hidden">
        <Outlet />
      </div>
    </main>
  );
}
