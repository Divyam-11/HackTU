function Dashboard() {
  return (
    <div>
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-red-500 col-span-1 flex justify-evenly">
          <div className="font-roboto font-semibold">Weather</div>
          <div className="font-roboto font-semibold">27C</div>
        </div>
        <div className="bg-blue-500 col-span-2">hi</div>
      </div>
    </div>
  );
}
export default Dashboard;
