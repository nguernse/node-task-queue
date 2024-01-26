import Link from "next/link";
import { WithClassname } from "../definitions";
import { cn } from "../utils/cn";
import Image from "next/image";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/jobs", label: "Jobs" },
];

type Props = WithClassname;

export default function Navigation({ className }: Props) {
  return (
    <aside
      className={cn("min-w-[150px] h-screen border-r bg-white", className)}
    >
      <Link
        href="/"
        className="w-full bg-slate-50 hover:bg-slate-100 flex items-center justify-center"
      >
        <Image
          alt="logo"
          src="/next.svg"
          width={50}
          height={50}
          className="h-16 w-16"
        />
      </Link>
      <nav>
        {navLinks.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className="p-2 text-center block text-slate-600 hover:bg-slate-100"
          >
            {label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
