import { Spinner } from "flowbite-react";

interface Props {
  fullPage?: boolean;
}

export const Loader = ({ fullPage }: Props) => {
  return (
    <div
      className={`flex w-full ${fullPage ? "h-screen" : ""} items-center justify-center pt-2 `}
    >
      <Spinner aria-label="Extra large spinner example" size="xl" />
    </div>
  );
};
