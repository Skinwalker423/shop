import { NextRequest, NextResponse } from "next/server";
import db from "../../../../../../../db";
import { notFound } from "next/navigation";
import fs from "fs/promises";

export const dynamic = "force-dynamic"; // defaults to auto
export async function GET(
  request: NextRequest,
  {
    params: { productId, downloadVerification },
  }: {
    params: {
      productId: string;
      downloadVerification: string;
    };
  }
) {
  console.log("params", productId);

  const verificationToken =
    await db.downloadVerification.findUnique({
      where: {
        id: downloadVerification,
      },
      include: {
        product: {
          select: {
            filePath: true,
            name: true,
          },
        },
      },
    });

  console.log(
    "vtid",
    verificationToken?.productId,
    productId
  );

  if (
    verificationToken == null ||
    verificationToken.productId !== productId
  )
    return notFound();

  const today = new Date();

  if (verificationToken.expriresAt < today) {
    return notFound();
  }

  const productFilepath =
    verificationToken.product.filePath;
  const productName = verificationToken.product.name;
  // const product = await db.product.findUnique({
  //   where: { id: productId },
  //   select: {
  //     filePath: true,
  //     name: true,
  //   },
  // });

  if (productFilepath == null) return notFound();

  const { size } = await fs.stat(productFilepath);
  const file = await fs.readFile(productFilepath);
  const extension = productFilepath.split(".").pop();

  if (!file) return notFound();

  return new NextResponse(file, {
    status: 200,
    statusText: "OK",
    headers: {
      "Content-Disposition": `attachment; filename="${productName}.${extension}"`,
      "Content-Length": size.toString(),
    },
  });
}
