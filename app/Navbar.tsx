import Link from "next/link";
import { AiFillBug } from "react-icons/ai";

export const Navbar = () => {
  const links = [
    { label: "Dashboard", href: "/" },
    { label: "Issue", href: "/issues" },
  ];

  return (
    <nav className="flex space-x-6 items-center border-b mb-5 px-6 h-14">
      <Link href="/">
        <AiFillBug />
      </Link>
      <ul className="flex space-x-6">
        {links.map((link) => (
          <Link key={link.href} href={link.href}>
            {link.label}
          </Link>
        ))}
      </ul>
    </nav>
  );
};
