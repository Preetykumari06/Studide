const express = require('express');
const cors = require('cors');
const sequelize = require('./Config/db');
const userRouter = require('./Routes/User');
const productRouter = require('./Routes/Product');
const PORT = process.env.PORT || 4040;
const app = express();
app.use(express.json());
app.use(cors());

app.use('/users', userRouter);
app.use('/products', productRouter);

app.get('/', (req, res) => {
    res.send('Hello, Welcome!');
});


sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is Running on http://localhost:${PORT}`);
    });
});

// app.listen(port, async () => {
//     await sequelize.authenticate();
//     console.log(`Server is Running on http://localhost:${port}`);
// });
