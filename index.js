const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
.then(() => console.log('Connected to MongoDb...'))
.catch(err => console.error('Could not connect to MongoDb...', err));

const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [String],
    date: { type: Date, default: Date.now },
    isPublished: Boolean
});

const Course = mongoose.model('Course', courseSchema);

async function createCourse(){
    const course = new Course({
        name: 'Angular.js Course',
        author: 'Manoj',
        tags: ['angular', 'frontend'],
        isPublished: true
    });
    
    const result = await course.save();
    console.log(result);
};

async function getCourse() {
    //For Pagination
    const pageNumber = 1;
    const pageSize = 10;

    const courses = await Course
    .find({ author: 'Manoj', isPublished:true })
    .skip((pageNumber-1) * pageSize)
    .limit(10)
    .sort({ name: 1}).
    select({ name:1, tags:1 });
    console.log(courses);
}

async function updateCourse (id) {
    const result = await Course.updateOne({ _id: id }, {
        $set: {
            author: 'Manoj2',
            isPublished: false
        }
    });
    console.log(result);
}

async function removeCourse (id) {
    const result = await Course.deleteOne({ _id: id });
//  const course = await Course.findByIdAndRemove(id);
    console.log(result);
}

updateCourse('671e7e439045c9fbab850d4c');