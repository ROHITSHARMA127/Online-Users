// add review 
app.post("/api/review/add", (request, response) => {
  const { user_id, hotel_id, rating, comment } = request.body;

  // Validate required fields
  if (!user_id || !hotel_id || !rating) {
    return response.status(400).json({ message: "user_id, hotel_id and rating are required!" });
  }

  db.query(
    "INSERT INTO reviews (user_id, hotel_id, rating, comment) VALUES (?, ?, ?, ?)",
    [user_id, hotel_id, rating, comment],
    (error, result) => {
      if (error) {
        return response.status(500).json({
          message: "Internal server error: " + error
        });
      }

      return response.status(200).json({
        message: "Review added successfully",
        review_id: result.insertId
      });
    }
  );
});


// get review
app.get("/api/review/hotel/:id", (request, response) => {
  const hotelId = request.params.id;

  db.query(
    `SELECT reviews.*, users.name AS user_name
     FROM reviews
     JOIN users ON reviews.user_id = users.id
     WHERE reviews.hotel_id = ?
     ORDER BY reviews.id DESC`,
    [hotelId],
    (error, result) => {
      if (error) {
        return response.status(500).json({
          message: "Internal server error: " + error
        });
      }

      if (result.length === 0) {
        return response.status(404).json({ message: "No reviews found" });
      }

      return response.status(200).json({
        message: "Reviews fetched successfully",
        data: result
      });
    }
  );
});
