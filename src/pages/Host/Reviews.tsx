import { BsStarFill } from "react-icons/bs";

export default function Reviews() {
  const reviewsData = [
    {
      rating: 5,
      name: "Elliot",
      date: "January 3, 2023",
      text: "The beach bum is such an awesome van! Such a comfortable trip. We had it for 2 weeks and there was not a single issue. Super clean when we picked it up and the host is very comfortable and understanding. Highly recommend!",
      id: "1",
    },
    {
      rating: 5,
      name: "Sandy",
      date: "December 12, 2022",
      text: "This is our third time using the Modest Explorer for our travels and we love it! No complaints, absolutely perfect!",
      id: "2",
    },
  ];

  return (
    <section className="py-6 md:px-0 px-4 text-[#161616]">
      <div className="container mx-auto space-y-6">
        <div className="flex justify-between">
          <h1 className="text-2xl font-bold">Your reviews</h1>
          <p className="text-base font-normal">
            Last <span className="font-medium underline">30 days</span>
          </p>
        </div>
        <img className="py-6" src="/reviews.png" alt="Review graph" />
        <h3 className="text-lg font-bold">Reviews (2)</h3>
        {reviewsData.map((review) => (
          <div key={review.id}>
            <div className="space-y-4 py-4">
              <div className="flex">
                {[...Array(review.rating)].map((_, i) => (
                  <BsStarFill className="text-[#FF8C38]" key={i} />
                ))}
              </div>
              <div className="flex items-center gap-2">
                <p className="text-lg font-bold">{review.name}</p>
                <p className="text-[#8C8C8C] text-lg font-thin">
                  {review.date}
                </p>
              </div>
              <p className="text-base font-semibold break-words">
                {review.text}
              </p>
            </div>
            <hr />
          </div>
        ))}
      </div>
    </section>
  );
}
