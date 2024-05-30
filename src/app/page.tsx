import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      Test
      <Link
        className='px-4 py-2 bg-destructive text-destructive-foreground'
        href={"/admin"}
      >
        Admin
      </Link>
    </main>
  );
}
