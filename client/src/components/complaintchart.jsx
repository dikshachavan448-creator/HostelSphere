function ComplaintChart({ total, pending, resolved }) {
  const max = Math.max(total, pending, resolved, 1);

  const getHeight = (value) => {
    return `${(value / max) * 180}px`;
  };

  return (
    <div className="bg-white rounded-3xl shadow-lg p-6">

      <h2 className="text-2xl font-bold mb-6">
        Complaint Analytics
      </h2>

      <div className="flex justify-around items-end h-60">

        <div className="flex flex-col items-center">

          <div
            className="bg-purple-600 w-16 rounded-t-xl transition-all duration-500"
            style={{ height: getHeight(total) }}
          ></div>

          <p className="mt-3 font-semibold">Total</p>

          <p className="text-purple-600 font-bold">{total}</p>

        </div>

        <div className="flex flex-col items-center">

          <div
            className="bg-yellow-500 w-16 rounded-t-xl transition-all duration-500"
            style={{ height: getHeight(pending) }}
          ></div>

          <p className="mt-3 font-semibold">Pending</p>

          <p className="text-yellow-600 font-bold">{pending}</p>

        </div>

        <div className="flex flex-col items-center">

          <div
            className="bg-green-600 w-16 rounded-t-xl transition-all duration-500"
            style={{ height: getHeight(resolved) }}
          ></div>

          <p className="mt-3 font-semibold">Resolved</p>

          <p className="text-green-600 font-bold">{resolved}</p>

        </div>

      </div>

    </div>
  );
}

export default ComplaintChart;
