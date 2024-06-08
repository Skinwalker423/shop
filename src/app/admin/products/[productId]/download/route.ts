import { NextRequest, NextResponse } from "next/server";
import db from "../../../../../../db";
import { notFound } from "next/navigation";
import fs from "fs/promises";

export async function GET(
  request: NextRequest,
  {
    params: { productId },
  }: { params: { productId: string } }
) {
  console.log("params", productId);

  const product = await db.product.findUnique({
    where: { id: productId },
    select: {
      filePath: true,
      name: true,
    },
  });

  if (product == null || !product.filePath)
    return notFound();

  const { size } = await fs.stat(product.filePath);
  const file = await fs.readFile(product.filePath);
  const extension = product.filePath.split(".").pop();

  if (!file) return notFound();

  return new NextResponse(file, {
    status: 200,
    statusText: "OK",
    headers: {
      "Content-Disposition": `attachment; filename="${product.name}.${extension}"`,
      "Content-Length": size.toString(),
    },
  });
}
