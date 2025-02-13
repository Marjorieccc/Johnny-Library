import { ReactNode } from "react";

type SideBarProps = {
  children: ReactNode;
};

export default function DropDownList({ children }: SideBarProps) {
  return (
    <>
      {/* Filter by Format */}
      <ul className="divide-y border-y">{children}</ul>
    </>
  );
}
