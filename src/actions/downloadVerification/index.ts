"use server";

import db from "../../../db";

export const createDownloadVerificationId = async (
  productId: string
) => {
  let verificationToken: DownloadVerification | null = null;

  const expiryDate = new Date(
    Date.now() + 2 * (60 * 60 * 1000)
  );
  verificationToken = await db.downloadVerification.create({
    data: {
      productId,
      expriresAt: expiryDate,
    },
  });
};
