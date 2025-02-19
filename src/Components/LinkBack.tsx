import { Link } from "react-router";
import { HiArrowLeft } from "react-icons/hi";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  to: string;
}

export default function LinkBack({ children, to }: Props) {
  return (
    <Link to={to}>
      <div className="flex items-center text-blue-600 hover:text-blue-800">
        <HiArrowLeft className="mr-2 size-5" />
        {children}
      </div>
    </Link>
  );
}
