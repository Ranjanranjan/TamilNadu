import mongoose from "mongoose";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import Admin from "./models/Admin.js";

dotenv.config();

async function createOrUpdateAdmin() {
  try {
    // 1️⃣ Connect to DB
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");

    const USERNAME = "admin";
    const PASSWORD = "gospel@38";

    // 2️⃣ Hash password
    const hashedPassword = await bcrypt.hash(PASSWORD, 10);

    // 3️⃣ Try to update existing admin
    let result = await Admin.updateOne(
      { username: USERNAME },
      { $set: { password: hashedPassword } }
    );

    // 4️⃣ If no admin exists, create one
    if (result.matchedCount === 0) {
      const newAdmin = new Admin({
        username: USERNAME,
        password: hashedPassword,
      });
      await newAdmin.save();
      console.log("✅ Admin user created:", USERNAME);
    } else {
      console.log("✅ Admin password updated:", USERNAME);
    }

    process.exit();
  } catch (err) {
    console.error("Error creating/updating admin ❌", err);
    process.exit(1);
  }
}

createOrUpdateAdmin();
