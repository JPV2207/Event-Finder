// middlewares/validateUser.js
export function validateUser(req, res, next) {
  const { username, email, password } = req.body;

  // Validate username
  if (!username || username.trim() === "") {
    return res.status(400).json({ error: "Username is required" });
  }

  // Validate email
  if (!email || !email.includes("@")) {
    return res.status(400).json({ error: "Valid email is required" });
  }

  // Validate password
  if (!password || password.length < 6) {
    return res
      .status(400)
      .json({ error: "Password must be at least 6 characters long" });
  }

  next();
}
