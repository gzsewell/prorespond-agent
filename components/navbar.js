// components/Navbar.js
import Link from "next/link";

export default function Navbar() {
  return (
    <div className="absolute top-4 right-4 flex space-x-4">
      <Link href="/" className="text-blue-600 underline hover:text-blue-800">
        🏠 Home
      </Link>
      <Link
        href="/history"
        className="text-blue-600 underline hover:text-blue-800"
      >
        📜 History
      </Link>
    </div>
  );
}
