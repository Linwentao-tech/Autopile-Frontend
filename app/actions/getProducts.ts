"use server";

export async function getProducts() {
  const response = await fetch(
    `${process.env.API_URL}/Product/GetProductsList`,
    {
      next: { revalidate: 3600 },
    }
  );

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  return data.data;
}
