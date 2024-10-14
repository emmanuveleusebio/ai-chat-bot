const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();

app.use(express.json());
app.use(cors());

app.post('/', async (req, res) => {
    try {

        const API_TOKEN = process.env.HUGGING_FACE_SECRETkEY
        console.log(req.body);
        const searchTerm = req.body.search;

        // request to the huggingface
        const aiResult = await fetch('https://api-inference.huggingface.co/models/EleutherAI/gpt-neo-2.7B', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${API_TOKEN}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ inputs: searchTerm })
        })

        const data = await aiResult.json();
        console.log(data)
        res.json({ data })
    } catch (error) {
        console.log(error);
    }
})

app.listen(3001, () => console.log('port running on 3001'))