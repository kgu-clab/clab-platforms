import { Outlet } from "react-router";

export default function RootLayout() {
  return (
    <main className="absolute inset-0">
      <div className="mx-auto flex min-h-screen max-w-[400px] bg-gray-50 font-sans">
        <Outlet />
      </div>
    </main>
  );
}
