import { registerAs } from "@nestjs/config";
import { UserTypeEnum } from "src/users/enum/User.enum";

export default registerAs("database", () => ({
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT || 27017,
  name: process.env.DATABASE_NAME,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASS,
  initialUser: {
    firstName: "Test",
    lastName: "User",
    gender: 0,
    email: "inquiry@yopmail.com",
    password: "Test@123",
    userType: UserTypeEnum.User
  },
  mongo: {
    connectionString: process.env.DATABASE_CONNECTION,
  },
}));
