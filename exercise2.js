const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/mongo-exercises')
.then(() => console.log('Connected to MongoDb...'))
.catch(err => console.error('Could not connect to MongoDb...', err));

const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [String],
    date: { type: Date, default: Date.now },
    isPublished: Boolean,
    price: Number
});

const Course = mongoose.model('Course', courseSchema);

// async function getCourse() {
//     const courses = await Course.find({ isPublished:true, tags: {$in: ['backend', 'frontend']} })
//     .limit(10)
//     .sort({ price: -1}).
//     select({ name:1, author:1 });
//     console.log(courses);
// }

async function getCourse() {
    const courses = await Course.find({ isPublished:true })
    .or([{tags : 'backend'}, {tags: 'frontend'}])
    .limit(10)
    .sort({ price: -1}).
    select({ name:1, author:1, price:1 });
    console.log(courses);
}

getCourse();