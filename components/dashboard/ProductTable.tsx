async function getProducts() {
  const res = await fetch(
    "http://localhost:3000/api/trends",
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  return res.json();
}

export default async function ProductTable() {
  const products = await getProducts();

  return (
    <div className="bg-zinc-950 border border-zinc-800 rounded-3xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-zinc-900">
            <tr>
              <th className="text-left px-6 py-4">
                Product
              </th>

              <th className="text-left px-6 py-4">
                Source
              </th>

              <th className="text-left px-6 py-4">
                Score
              </th>

              <th className="text-left px-6 py-4">
                Status
              </th>
            </tr>
          </thead>

          <tbody>
            {products.map((product: any) => (
              <tr
                key={product.id}
                className="border-t border-zinc-900 hover:bg-zinc-900/40 transition"
              >
                <td className="px-6 py-5 font-semibold">
                  {product.keyword}
                </td>

                <td className="px-6 py-5 text-zinc-300">
                  {product.source}
                </td>

                <td className="px-6 py-5 font-bold text-lg">
                  {product.score}
                </td>

                <td className="px-6 py-5">
                  <span
                    className={`px-4 py-2 rounded-full text-sm font-semibold ${
                      product.label === "SUPER WINNER"
                        ? "bg-white text-black"
 async function getProducts() {
  const res = await fetch(
    "http://localhost:3000/api/trends",
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  return res.json();
}

export default async function ProductTable() {
  const products = await getProducts();

  return (
    <div className="bg-zinc-950 border border-zinc-800 rounded-3xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-zinc-900">
            <tr>
              <th className="text-left px-6 py-4">
                Product
              </th>

              <th className="text-left px-6 py-4">
                Source
              </th>

              <th className="text-left px-6 py-4">
                Score
              </th>

              <th className="text-left px-6 py-4">
                Status
              </th>
            </tr>
          </thead>

          <tbody>
            {products.map((product: any) => (
              <tr
                key={product.id}
                className="border-t border-zinc-900 hover:bg-zinc-900/40 transition"
              >
                <td className="px-6 py-5 font-semibold">
                  {product.keyword}
                </td>

                <td className="px-6 py-5 text-zinc-300">
                  {product.source}
                </td>

                <td className="px-6 py-5 font-bold text-lg">
                  {product.score}
                </td>

                <td className="px-6 py-5">
                  <span
                    className={`px-4 py-2 rounded-full text-sm font-semibold ${
                      product.label === "SUPER WINNER"
                        ? "bg-white text-black"
                        : "bg-zinc-800 text-white"
                    }`}
                  >
                    {product.label}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}                       : "bg-zinc-800 text-white"
                    }`}
                  >
                    {product.label}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
