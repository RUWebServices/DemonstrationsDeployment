const express = require('express');
const app = express();

app.get('/api/message', (req, res) => {
    return res.json(process.env.ENVIRONMENTAL_MESSAGE);
});

app.listen(process.env.PORT, () => console.log('Listening!'));
