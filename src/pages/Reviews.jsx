import { useEffect, useState } from "react";
import "./Reviews.css";

const dishReviews = [
  {
    dish: "Butter Chicken",
    rating: 5,
    reviews: 86,
  },
  {
    dish: "Chicken Biryani",
    rating: 4.7,
    reviews: 72,
  },
  {
    dish: "Paneer Tikka",
    rating: 4.6,
    reviews: 54,
  },
  {
    dish: "Garlic Naan",
    rating: 4.5,
    reviews: 41,
  },
];

function Stars({ rating }) {
  const fullStars = Math.round(rating);

  return (
    <span className="stars">
      {"★".repeat(fullStars)}
      <span className="empty-stars">
        {"★".repeat(5 - fullStars)}
      </span>
    </span>
  );
}

function Reviews() {
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [sort, setSort] = useState("latest");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // FETCH REVIEWS FROM MONGODB
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(
          "http://127.0.0.1:5000/api/reviews"
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || "Failed to fetch reviews."
          );
        }

        setReviews(data);
      } catch (error) {
        console.error("Fetch reviews error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  // SUBMIT REVIEW
  const submitReview = async (e) => {
    e.preventDefault();

    if (!comment.trim()) {
      alert("Please write a review.");
      return;
    }

    const storedUser = JSON.parse(
      localStorage.getItem("user") || "null"
    );

    if (!storedUser) {
      alert("Please login before writing a review.");
      return;
    }

    try {
      setSubmitting(true);

      const response = await fetch(
        "http://127.0.0.1:5000/api/reviews",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userName: storedUser.name,
            restaurantName: "The Bombay Kitchen",
            dishName: "",
            rating: rating,
            comment: comment,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(
          data.message || "Failed to submit review."
        );
        return;
      }

      // Add newly created review to the top
      setReviews((prevReviews) => [
        data.review,
        ...prevReviews,
      ]);

      setComment("");
      setRating(5);

      alert("Review submitted successfully!");
    } catch (error) {
      console.error("Submit review error:", error);

      alert(
        "Unable to connect to the server. Make sure the backend is running."
      );
    } finally {
      setSubmitting(false);
    }
  };

  const sortedReviews = [...reviews].sort((a, b) => {
    if (sort === "highest") {
      return b.rating - a.rating;
    }

    if (sort === "lowest") {
      return a.rating - b.rating;
    }

    return (
      new Date(b.createdAt) -
      new Date(a.createdAt)
    );
  });

  return (
    <div className="reviews-page">

      {/* HEADER */}

      <section className="reviews-header">
        <p className="section-label">
          CUSTOMER REVIEWS
        </p>

        <h1>Reviews & Ratings</h1>

        <p>
          See what customers think about the restaurant
          and its dishes.
        </p>
      </section>

      <main className="reviews-container">

        {/* RATING SUMMARY */}

        <section className="rating-summary">

          <div className="overall-rating">
            <span className="big-rating">
              4.6
            </span>

            <div>
              <Stars rating={5} />

              <p>
                {reviews.length} customer reviews
              </p>
            </div>
          </div>

          <div className="rating-bars">

            <div>
              <span>5 ★</span>

              <div className="bar">
                <div className="bar-fill five"></div>
              </div>

              <span>78%</span>
            </div>

            <div>
              <span>4 ★</span>

              <div className="bar">
                <div className="bar-fill four"></div>
              </div>

              <span>15%</span>
            </div>

            <div>
              <span>3 ★</span>

              <div className="bar">
                <div className="bar-fill three"></div>
              </div>

              <span>5%</span>
            </div>

            <div>
              <span>2 ★</span>

              <div className="bar">
                <div className="bar-fill two"></div>
              </div>

              <span>1%</span>
            </div>

            <div>
              <span>1 ★</span>

              <div className="bar">
                <div className="bar-fill one"></div>
              </div>

              <span>1%</span>
            </div>

          </div>

        </section>

        {/* DISH REVIEWS */}

        <section className="dish-review-section">

          <div className="section-heading-row">
            <div>
              <p className="section-label">
                DISH LEVEL
              </p>

              <h2>Popular Dish Ratings</h2>
            </div>
          </div>

          <div className="dish-review-grid">

            {dishReviews.map((dish) => (
              <div
                className="dish-review-card"
                key={dish.dish}
              >

                <div className="dish-icon">
                  🍽️
                </div>

                <div>
                  <h3>{dish.dish}</h3>

                  <div className="dish-rating">
                    ★ {dish.rating}
                  </div>

                  <p>
                    {dish.reviews} customer reviews
                  </p>
                </div>

              </div>
            ))}

          </div>

        </section>

        {/* WRITE REVIEW */}

        <section className="write-review">

          <div>
            <p className="section-label">
              SHARE YOUR EXPERIENCE
            </p>

            <h2>Write a Review</h2>

            <p className="review-help">
              Tell other customers about your
              experience.
            </p>
          </div>

          <form onSubmit={submitReview}>

            <label>Your Rating</label>

            <div className="rating-selector">

              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  className={
                    star <= rating
                      ? "selected-star"
                      : ""
                  }
                  onClick={() =>
                    setRating(star)
                  }
                >
                  ★
                </button>
              ))}

            </div>

            <label>Your Review</label>

            <textarea
              value={comment}
              onChange={(e) =>
                setComment(e.target.value)
              }
              placeholder="Write your experience..."
              rows="5"
            />

            <button
              className="submit-review"
              type="submit"
              disabled={submitting}
            >
              {submitting
                ? "Submitting..."
                : "Submit Review"}
            </button>

          </form>

        </section>

        {/* CUSTOMER REVIEWS */}

        <section className="customer-reviews">

          <div className="reviews-list-header">

            <div>
              <p className="section-label">
                CUSTOMERS
              </p>

              <h2>What People Are Saying</h2>
            </div>

            <select
              value={sort}
              onChange={(e) =>
                setSort(e.target.value)
              }
            >
              <option value="latest">
                Latest
              </option>

              <option value="highest">
                Highest Rated
              </option>

              <option value="lowest">
                Lowest Rated
              </option>
            </select>

          </div>

          <div className="review-list">

            {loading ? (
              <p>Loading reviews...</p>
            ) : sortedReviews.length === 0 ? (
              <p>
                No reviews yet. Be the first to
                review this restaurant!
              </p>
            ) : (
              sortedReviews.map((review) => (

                <article
                  className="review-card"
                  key={review._id}
                >

                  <div className="review-avatar">
                    {review.userName
                      ?.charAt(0)
                      .toUpperCase()}
                  </div>

                  <div className="review-content">

                    <div className="review-top">

                      <div>
                        <h3>
                          {review.userName}
                        </h3>

                        <div>
                          <Stars
                            rating={review.rating}
                          />
                        </div>
                      </div>

                      <span className="review-date">
                        {new Date(
                          review.createdAt
                        ).toLocaleDateString()}
                      </span>

                    </div>

                    <p>{review.comment}</p>

                    <button className="helpful">
                      👍 Helpful
                    </button>

                  </div>

                </article>

              ))
            )}

          </div>

        </section>

      </main>

    </div>
  );
}

export default Reviews;