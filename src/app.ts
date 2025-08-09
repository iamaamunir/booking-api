import express from "express";

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Welcome Rental booking app",
  });
});


export default app;
