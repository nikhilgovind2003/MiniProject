const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyparser =  require("body-parser")
const app = express();
require("dotenv/config")
const morgan = require("morgan");
const ProductRoutes = require("./routes/Product")
const UserRoutes = require("./routes/UserRoutes")
const OrderRoutes = require("./routes/OrderRoutes")
const CategoryRoutes = require("./routes/CategoryRoutes")



app.use(cors());
app.options('*', cors())

app.use(bodyparser.json())
const api = process.env.API
// app.use(morgan('tiny'))



// ROUTES
app.use(`${api}/products`, ProductRoutes)
app.use(`${api}/`, UserRoutes)
// app.use("${api}/order", OrderRoutes)
app.use(`${api}/category`, CategoryRoutes)

mongoose
  .connect(
    process.env.MONGO_URL
  )
  .then(() => {
    console.log("Mongodb Connected successfully");
    app.listen(4000, () => {
      console.log(`Server runs at the port 4000`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
