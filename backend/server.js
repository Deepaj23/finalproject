const express = require('express')
const axios = require('axios')

const app = express()

// app.set('view engine', 'ejs')
// app.set('views', 'views')

app.use(express.urlencoded({ extended: false }))

// app.get('/', (req, res) => {
// 	res.render('index.ejs')
// })

app.get('/', (req, res) => {
  res.sendFile(__dirname, '../', 'frondend','src','App.js');
});

app.post('/form-submit', (req, res) => {
	axios
		.post('https://hooks.slack.com/services/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', {
			blocks: [
				{
					type: 'section',
					text: {
						type: 'mrkdwn',
						text: `Name: *${req.body.name}*\n\n Email: *${req.body.email}*`,
					},
				},
			],
		})
		.then(() => {
			res.send('Form submitted!')
		})
		.catch(() => {
			res.send('Form submission failed!')
		})
})

app.listen(5000, () => {
	console.log('Example app listening on port 5000!')
})






