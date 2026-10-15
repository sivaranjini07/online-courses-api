const express = require('express');

const app = express();

app.use(express.json());


let courses = [];
let nextId = 1;

app.get('/courses', (req, res) => {
    res.status(200).json(courses);
});


app.get('/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === Number(req.params.id));

    if (!course) {
        return res.status(404).json({
            message: 'Course not found'
        });
    }

    res.status(200).json(course);
});


app.post('/courses', (req, res) => {
    const course = {
        id: nextId++,
        ...req.body
    };

    courses.push(course);

    res.status(201).json(course);
});


app.put('/courses/:id', (req, res) => {
    const index = courses.findIndex(
        c => c.id === Number(req.params.id)
    );

    if (index === -1) {
        return res.status(404).json({
            message: 'Course not found'
        });
    }

    courses[index] = {
        ...req.body,
        id: Number(req.params.id)
    };

    res.status(200).json(courses[index]);
});


app.delete('/courses/:id', (req, res) => {
    const index = courses.findIndex(
        c => c.id === Number(req.params.id)
    );

    if (index === -1) {
        return res.status(404).json({
            message: 'Course not found'
        });
    }

    courses.splice(index, 1);

    res.status(204).send();
});
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});