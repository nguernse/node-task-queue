import { HTMLProps } from "react";

type Props = HTMLProps<HTMLButtonElement>;

export function SubmitButton({ children, disabled = false }: Props) {
  return (
    <button
      className="ml-auto py-2 px-3 bg-blue-500 enabled:hover:bg-blue-700 disabled:opacity-75 rounded text-white"
      type="submit"
      aria-disabled={disabled}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
