export default function Income() {
  const transactionsData = [
    { amount: 720, date: "Jan 3, '23", id: "1" },
    { amount: 560, date: "Dec 12, '22", id: "2" },
    { amount: 980, date: "Dec 3, '22", id: "3" },
  ];
  return (
    <section className="py-6 md:px-0 px-4 text-[#161616]">
      <div className="container mx-auto space-y-6">
        <h1 className="text-2xl font-bold">Income</h1>
        <p className="text-base font-normal">
          Last <span className="font-medium underline">30 days</span>
        </p>
        <h2 className="text-3xl font-bold">$2,260</h2>
        <img className="py-6" src="/income.png" alt="Income graph" />
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-bold">Your transactions (3)</h3>
          <p className="text-base font-normal">
            Last <span className="font-medium underline">30 days</span>
          </p>
        </div>
        <div className="space-y-4">
          {transactionsData.map((item) => (
            <div
              key={item.id}
              className="bg-white flex justify-between p-6 rounded-lg shadow-sm"
            >
              <h3 className="text-xl font-semibold">${item.amount}</h3>
              <p className="text-base font-thin">{item.date}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
