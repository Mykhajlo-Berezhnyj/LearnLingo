import { Outlet } from "react-router-dom";

type TeachersProps = {
  className?: string;
};

export default function Teachers({ className }: TeachersProps) {
  return (
    <section className={className}>
      <h2>Teachers</h2>
      <Outlet />
    </section>
  );
}
