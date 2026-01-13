import mongoose from "mongoose";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import Admin from "./models/Admin.js";

dotenv.config();

async function updateAdminPassword() {
  try {
    // 1️⃣ Connect to DB
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");

    // 2️⃣ NEW PASSWORD (CHANGE THIS)
    const NEW_PASSWORD = "Kuy@van_Adm1n#2026";

    // 3️⃣ Hash password
    const hashedPassword = await bcrypt.hash("gospel@38", 10);

    // 4️⃣ Update admin password
    const result = await Admin.updateOne(
      { username: "admin" },
      { $set: { password: hashedPassword } }
    );

    console.log("Admin password updated ✅");
    console.log(result);

    process.exit();
  } catch (err) {
    console.error("Error updating admin ❌", err);
    process.exit(1);
  }
}

updateAdminPassword();
