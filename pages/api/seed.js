import nc from "next-connect";
import Product from "../../models/Product";
import User from "../../models/User";
import Order from "../../models/Order";
import db from "../../utils/MongoDB";
import data from "../../utils/data";

const handler = nc();

handler.get(async (req, res) => {
  await db.connect();
  await User.deleteMany();
  await User.insertMany(data.users);

  await Product.deleteMany();
  await Product.insertMany(data.products);

  await Order.deleteMany();
  await db.disconnect();
  res.send({ message: "seeded successfully" });
});

export default handler;
