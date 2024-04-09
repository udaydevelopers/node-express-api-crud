const express = require('express');
const bodyParser = require('body-parser');
const { connectDB } = require('./db');
const userRoutes = require('./routes/userRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const productRoutes = require('./routes/productRoutes');

const app = express();
const port = 5000;

app.use(bodyParser.json());

connectDB();

app.use('/user', userRoutes);
app.use('/category', categoryRoutes);
app.use('/product', productRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
