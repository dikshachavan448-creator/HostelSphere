function StatCard({ title, value, icon, color }) {
  return (
    <div
      className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
    >
      <div className="flex justify-between items-center">

        <div>
          <p className="text-gray-500 text-sm font-medium">
            {title}
          </p>

          <h2 className="text-3xl font-bold mt-2">
            {value}
          </h2>
        </div>

        <div className={`${color} p-4 rounded-2xl text-white`}>
          {icon}
        </div>

      </div>
    </div>
  );
}

export default StatCard;