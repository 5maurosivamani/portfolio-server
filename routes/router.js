const express = require("express");
const router = express.Router();
// const pool = require("../db"); // Import the MySQL connection
const portfolioFormSchema = require("../validation/portfolioFormSchema");
const { ValidationError } = require("../errors");
const sendMail = require("../helper");

router.get("/", (req, res) => {
  // send response a welcome message
  res.send({ message: "Welcome to Portfolio API!" });
});

router.post("/contact", async (req, res, next) => {
  const { error } = portfolioFormSchema.validate(req.body);

  if (error) {
    // Pass the error to the ValidationError class
    return next(new ValidationError(error.details[0].message));
  }

  try {
    const { name, email, subject, message } = req.body; // Adjust fields as necessary

    // const connection = await pool.getConnection();

    // const query =
    //   "INSERT INTO contact_message (name, email, subject, message) VALUES (?, ?, ?, ?)";

    // const [results] = await pool.execute(query, [
    //   name,
    //   email,
    //   subject,
    //   message,
    // ]);

    // connection.release(); // Close the connection

    const { success, error } = await sendMail(name, email, subject, message);
    // return;
    if (!success) throw new Error(error);
    
    res
      .status(201)
      .json({ success: true, message: "Data inserted", id: results.insertId });
  } catch (err) {
    // console.log("err", err)
    next(err);
  }
});

module.exports = router;
