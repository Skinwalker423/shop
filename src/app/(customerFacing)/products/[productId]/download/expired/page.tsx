import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const DownloadVerificationExpiredPage = () => {
  return (
    <>
      <h1 className='text-4xl mb-4'>
        Download link expired
      </h1>
      <Button asChild>
        <Link href={"/orders"}>Get new link</Link>
      </Button>
    </>
  );
};

export default DownloadVerificationExpiredPage;
