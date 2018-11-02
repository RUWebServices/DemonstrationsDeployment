const express = require('express');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3000;
const app = express();

function Show(name, description) {
    this.id = name.toLowerCase().replace(' ', '-');
    this.name = name;
    this.description = description;
};

function Character(name, gender, showId) {
    this.id = name.toLowerCase().replace(' ', '-');
    this.name = name;
    this.gender = gender;
    this.showId = showId;
};

const characters = [
    {
        id: 'grumpy-bear',
        name: 'Grumpy Bear',
        gender: 'male',
        showId: 'care-bears'
    },
    {
        id: 'love-a-lot-bear',
        name: 'Love-A-Lot Bear',
        gender: 'female',
        showId: 'care-bears'
    },
    {
        id: 'scrooge-mcduck',
        name: 'Scrooge McDuck',
        gender: 'male',
        showId: 'duck-tales'
    },
    {
        id: 'huey',
        name: 'Huey',
        gender: 'male',
        showId: 'duck-tales'
    },
    {
        id: 'fred-flintstone',
        name: 'Fred Flintstone',
        gender: 'male',
        showId: 'flintstones'
    },
    {
        id: 'wilma-flintstone',
        name: 'Wilma Flintstone',
        gender: 'female',
        showId: 'flintstones'
    }
]

const shows = [
    {
        id: 'care-bears',
        name: 'The Care Bears',
        description: 'The Care Bears live in a faraway place up in the clouds called Care-a-Lot, which constitutes a part of the Kingdom of Caring.'
    },
    {
        id: 'duck-tales',
        name: 'Duck Tales',
        description: 'Based upon Uncle Scrooge and other Duck universe comic books created by Carl Barks, the show follows Scrooge McDuck, his three grandnephews Huey, Dewey, and Louie, and close friends of the group, on various adventures, most of which either involve seeking out treasure or thwarting the efforts of villains seeking to steal Scrooge\'s fortune or his Number One Dime.'
    },
    {
        id: 'flintstones',
        name: 'Flintstones',
        description: 'The show\'s premise is that it is set in a comical, satirical version of the "Stone Age" which, in spite of using primitive technology, resembles mid-20th century suburban America. The plots deliberately resemble the sitcoms of the era, with the caveman Flintstone and Rubble families getting into minor conflicts characteristic of modern life. The show is set in the Stone Age town of Bedrock (pop. 2500). In this fantasy version of the past, dinosaurs and other long-extinct animals co-exist with cavemen, saber-toothed cats, and woolly mammoths.'
    }
]

app.use(bodyParser.json());

app.get('/api/shows', (req, res) => {
    return res.json(shows);
});

app.get('/api/shows/:showId/characters', (req, res) => {
    const { showId } = req.params;
    return res.json(characters.filter(c => c.showId === showId));
});

app.post('/api/shows', (req, res) => {
    const { name, description } = req.body;
    const newShow = new Show(name, description);
    shows.push(newShow);

    return res.json(newShow);
});

app.post('/api/shows/:showId/characters', (req, res) => {
    const { name, gender } = req.body;
    const { showId } = req.params;

    if (!shows.find(s => s.id === showId)) { return res.status(404).send(); }

    const newCharacter = new Character(name, gender, showId);
    characters.push(newCharacter);

    return res.json(newCharacter);
});


app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
