export const getStatusStyle = (status: string) => {
  switch (status) {
    case "completed":
      return "bg-green-100 text-green-700 border-green-200";

    case "running":
      return "bg-blue-100 text-blue-700 border-blue-200";

    case "failed":
      return "bg-red-100 text-red-700 border-red-200";

    case "pending":
      return "bg-yellow-100 text-yellow-700 border-yellow-200";

    default:
      return "bg-gray-100 text-gray-700 border-gray-200";
  }
};
