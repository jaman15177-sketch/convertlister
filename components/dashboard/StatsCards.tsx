type Props = {
  totalJobs: number;
  activeJobs: number;
  completedJobs: number;
  failedJobs: number;
};

export default function StatsCards({
  totalJobs,
  activeJobs,
  completedJobs,
  failedJobs,
}: Props) {
  const cards = [
    {
      title: "Total Jobs",
      value: totalJobs,
    },
    {
      title: "Active Jobs",
      value: activeJobs,
    },
    {
      title: "Completed",
      value: completedJobs,
    },
    {
      title: "Failed",
      value: failedJobs,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
      {cards.map((card) => (
        <div
          key={card.title}
          className="bg-white shadow rounded-2xl p-6 border"
        >
          <h2 className="text-gray-500 text-sm">
            {card.title}
          </h2>

          <p className="text-3xl font-bold mt-2">
            {card.value}
          </p>
        </div>
      ))}
    </div>
  );
}
