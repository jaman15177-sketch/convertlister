"use client";

import { useEffect, useState } from "react";

interface Product {
  id?: string;
  title: string;
  score: number;
  label?: string;
  trend?: string;
}

async function getProducts(): Promise<Product[]> {
  try {
    const res = await fetch("/api/trends", {
      cache: "no-store",
    });

    if (!res.ok) {
      return [];
    }

    const data = await res.json();

    return Array.isArray(data) ? data : data.products || [];
  } catch (error) {
    console.error("Failed to fetch products:", error);
    return [];
  }
}

export default function ProductTable() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProducts() {
      const data = await getProducts();
      setProducts(data);
      setLoading(false);
    }

    loadProducts();
  }, []);

  if (loading) {
    return (
      <div className="rounded-2xl border p-6">
        <p>Loading products...</p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border p-6 overflow-x-auto">
      <div className="mb-4">
        <h2 className="text-2xl font-bold">Trending Products</h2>
        <p className="text-sm opacity-70">
          AI-ranked winning products dashboard
        </p>
      </div>

      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b">
            <th className="text-left p-3">Title</th>
            <th className="text-left p-3">Score</th>
            <th className="text-left p-3">Trend</th>
            <th className="text-left p-3">Label</th>
          </tr>
        </thead>

        <tbody>
          {products.length === 0 ? (
            <tr>
              <td colSpan={4} className="p-4 text-center">
                No products found
              </td>
            </tr>
          ) : (
            products.map((product, index) => (
              <tr
                key={product.id || index}
                className="border-b hover:bg-gray-50 transition"
              >
                <td className="p-3 font-medium">{product.title}</td>

                <td className="p-3">{product.score}</td>

                <td className="p-3">
                  {product.trend || "Unknown"}
                </td>

                <td className="p-3">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      product.label === "SUPER WINNER"
                        ? "bg-black text-white"
                        : "bg-gray-200 text-black"
                    }`}
                  >
                    {product.label || "NORMAL"}
                  </span>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
