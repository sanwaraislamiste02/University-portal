router.put("/profile/update", async (req, res) => {
  try {
    const { email, name, phone, age, department, address,
            dob, gender, blood, nationality,
            studentId, program, year, batch, rollNo, admDate,
            designation, officeRoom, expertise } = req.body;

    await User.findOneAndUpdate({ email }, {
      name, phone, age, department, address,
      dob, gender, blood, nationality,
      studentId, program, year, batch, rollNo, admDate,
      designation, officeRoom, expertise
    });
    res.json({ message: "Profile updated successfully!" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});