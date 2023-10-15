import Link from "next/link";

export const Navbar = () => {
  const links = [
    { label: "Dashboard", href: "/" },
    { label: "Issue", href: "/issues" },
  ];
  return (
    <div>
      <Link href="/">Logo</Link>
    </div>
  );
};
