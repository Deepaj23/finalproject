const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const { Sequelize, DataTypes } = require('sequelize');
const cors = require('cors');

const app = express();
app.use(cors());

app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());

const sequelize = new Sequelize('messagebox', 'postgres', '8870942657', {
  host: 'localhost',
  dialect: 'postgres',
});

const Post = sequelize.define('Post', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  message: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

app.post('/form-submit', async (req, res) => {
  try {
    await sequelize.sync();

    const { name, email, message } = req.body;
    const post = await Post.create({ name, email, message });

    await axios.post('https://hooks.slack.com/services/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', {
      blocks: [
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: `Name: *${req.body.name}*\n\n Email: *${req.body.email}*\n\n Message: *${req.body.message}*`,
          },
        },
      ],
    });

    res.send('Form submitted!');
    console.log('test');
  } catch (error) {
    console.error(error);
    res.send('Form submission failed!');
  }
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});










