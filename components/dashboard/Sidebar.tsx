export default function Sidebar() {
  return (
    <aside className="w-64 bg-black text-white min-h-screen p-6">
      <h1 className="text-2xl font-bold mb-10">
        ConvertLister
      </h1>

      <nav className="space-y-4">
        <div className="hover:text-gray-300 cursor-pointer">
          Dashboard
        </div>

        <div className="hover:text-gray-300 cursor-pointer">
          Jobs
        </div>

        <div className="hover:text-gray-300 cursor-pointer">
          Workers
        </div>

        <div className="hover:text-gray-300 cursor-pointer">
          Scheduler
        </div>

        <div className="hover:text-gray-300 cursor-pointer">
          Analytics
        </div>

        <div className="hover:text-gray-300 cursor-pointer">
          Settings
        </div>
      </nav>
    </aside>
  );
}
