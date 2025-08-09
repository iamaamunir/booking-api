import express from "express";
const app = express();
app.use(express.json());
app.get("/", (req, res) => {
    res.status(200).json({
        status: "success",
        message: "Welcome Fitness Tracker",
    });
});
export default app;
//# sourceMappingURL=app.js.map