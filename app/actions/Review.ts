"use server";

import { cookies } from "next/headers";

export async function createReview(formData: FormData) {
  const cookieStore = cookies();
  const authToken = cookieStore.get("AuthToken")?.value;

  if (!authToken) {
    return null;
  }

  // Get form data values
  const productId = formData.get("productId") as string;
  const title = formData.get("title") as string;
  const subtitle = formData.get("subtitle") as string;
  const content = formData.get("content") as string;
  const rating = parseInt(formData.get("rating") as string);
  const image = formData.get("image") as File | null;

  // Create query parameters
  const queryParams = new URLSearchParams({
    ProductId: productId,
    Title: title,
    Subtitle: subtitle || "",
    Content: content,
    Rating: rating.toString(),
  });

  // Create a new FormData instance for just the image
  const apiFormData = new FormData();
  if (image instanceof File) {
    apiFormData.append("Image", image);
  }

  try {
    const response = await fetch(
      `${process.env.API_URL}/Review/CreateReview?${queryParams.toString()}`,
      {
        method: "POST",
        body: image ? apiFormData : null, // Only send form data if there's an image
        headers: {
          Cookie: `AuthToken=${authToken}`,
        },
        credentials: "include",
        cache: "no-store",
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Server response:", errorText);
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error("Error creating review:", error);
    throw error;
  }
}

export async function getReviews(productId: string) {
  const response = await fetch(
    `${process.env.API_URL}/Review/GetReviewByProductId?productId=${productId}`,
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const data = await response.json();
  return data.data;
}

export async function deleteReview(reviewId: string) {
  const cookieStore = cookies();
  const authToken = cookieStore.get("AuthToken")?.value;

  if (!authToken) {
    throw new Error("Authentication required");
  }

  const response = await fetch(`${process.env.API_URL}/Review/${reviewId}`, {
    method: "DELETE",
    headers: {
      Cookie: `AuthToken=${authToken}`,
    },
    credentials: "include",
    cache: "no-store",
  });

  if (response.status === 204) {
    return true; // Successfully deleted
  }

  // If not 204, try to get error details from response
  const errorText = await response.text();
  console.error("Delete review error response:", errorText);
  throw new Error(
    `Failed to delete review: ${response.status} ${
      errorText || response.statusText
    }`
  );
}
