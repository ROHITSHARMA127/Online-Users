// Get All Hotels
app.get("/api/hotels", (request, response) => {
  db.query("SELECT * FROM hotels", (error, result) => {
    if (error) {
      return response.status(500).json({ message: "Server internal error: " + error });
    }

    if (result.length === 0) {
      return response.status(404).json({ message: "No hotels found" });
    }

    return response.status(200).json({
      message: "Hotels fetched successfully",
      hotels: result
    });
  });
});


// Get Hotel Details by ID
app.get("/api/hotels/:id", (request, response) => {
  const id = request.params.id;

  db.query("SELECT * FROM hotels WHERE id = ?", [id], (error, result) => {
    if (error) {
      return response.status(500).json({ message: "Server internal error: " + error });
    }

    if (result.length === 0) {
      return response.status(404).json({ message: "Hotel not found" });
    }

    return response.status(200).json({
      message: "Hotel details fetched successfully",
      hotel: result[0]
    });
  });
});




