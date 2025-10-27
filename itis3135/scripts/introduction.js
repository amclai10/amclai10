// Wait for the DOM to load before accessing elements
document.addEventListener('DOMContentLoaded', function() {
    const formElement = document.querySelector("form");
    formElement.addEventListener("submit", (e) => {
        e.preventDefault(); // prevents page refresh / default behavior
        submit(); // Call the submit function
    });
});

function deleteCourse(button) {
    button.parentElement.remove();
}

function addCourse() {
    const courseTemplate = `
        <div class="course">
            <label for="courseNumber">Course Number:</label>
            <input type="text" id="courseNumber" name="courseNumber" placeholder="Enter course number" required>

            <label for="courseName">Course Name:</label>
            <input type="text" id="courseName" name="courseName" placeholder="Enter course name" required>

            <label for="courseDescription">Course Description:</label>
            <input type="text" id="courseDescription" name="courseDescription" placeholder="Enter course description" required>
            <button type="button" onclick="deleteCourse(this)">Remove Course</button>
        </div>
    `;
    const courseContainer = document.createElement('div');
    courseContainer.innerHTML = courseTemplate;
    const addButton = document.querySelector('button[onclick="addCourse()"]');
    const coursesSection = document.getElementById('coursesTaking');
    coursesSection.insertBefore(courseContainer.firstElementChild, addButton);
}

function submit() {
    const form = document.querySelector("form"); // Missing form variable declaration
    
    // Get all form values
    const firstName = form.elements["firstName"].value;
    const middleName = form.elements["middleName"].value;
    const lastName = form.elements["lastName"].value;
    const mascotAdjective = form.elements["mascotAdjective"].value;
    const mascotAnimal = form.elements["mascotAnimal"].value;
    const divider = form.elements["divider"].value;
    const pictureFile = form.elements["picture"].files[0];
    const pictureCaption = form.elements["pictureCaption"].value;
    const personalStatement = form.elements["personalStatement"].value;
    const personalBackground = form.elements["personalBackground"].value;
    const professionalBackground = form.elements["professionalBackground"].value;
    const academicBackground = form.elements["academicBackground"].value;
    const computer = form.elements["primaryComputer"].value;
    const webDevBackground = form.elements["webDevBackground"].value;
    const funnyThing = form.elements["funnyThing"].value;
    const additionalInfo = form.elements["additionalInfo"].value;
    const quote = form.elements["quote"].value;
    const quoteAuthor = form.elements["quoteAuthor"].value;

    // Get courses
    const courses = Array.from(document.querySelectorAll(".course")).map(course => ({
        number: course.querySelector("[name='courseNumber']").value,
        name: course.querySelector("[name='courseName']").value,
        description: course.querySelector("[name='courseDescription']").value
    }));

    const coursesList = courses.map(course =>
        `<li>${course.number} - ${course.name}: ${course.description}</li>`
    ).join("");

    // Handle image display - check if file exists
    const imageSource = pictureFile ? URL.createObjectURL(pictureFile) : 'images/aidanmclain-profile.png';

    // Create the introduction page content
    const introTemplate = `
        <h2>BYO Introduction</h2>
        <h3>${firstName} ${middleName} ${lastName} ${divider} ${mascotAdjective} ${mascotAnimal}</h3>
        <figure class="profile-picture">
            <img src="${imageSource}" alt="Profile Picture">
            <figcaption>${pictureCaption}</figcaption>
        </figure>
        <div class="bio">
            <ul class="bio-list">
                <li>
                    <h3>Personal Statement</h3>
                    <p>${personalStatement}</p>
                </li>
                <li>
                    <h3>Personal Background</h3>
                    <p>${personalBackground}</p>
                </li>
                <li>
                    <h3>Professional Background</h3>
                    <p>${professionalBackground}</p>
                </li>
                <li>
                    <h3>Academic Background</h3>
                    <p>${academicBackground}</p>
                </li>
                <li>
                    <h3>Background in Web Development</h3>
                    <p>${webDevBackground}</p>
                </li>
                <li>
                    <h3>Primary Computer</h3>
                    <p>${computer}</p>
                </li>
                ${funnyThing ? `<li><h3>Funny/Interesting Thing About Me</h3><p>${funnyThing}</p></li>` : ''}
                ${additionalInfo ? `<li><h3>I'd also like to share</h3><p>${additionalInfo}</p></li>` : ''}
            </ul>
            <div class="courses-section">
                <h3>My Courses</h3>
                <ul class="course-list">${coursesList}</ul>
            </div>
            <div class="quote-section">
                <blockquote>"${quote}"</blockquote>
                <cite>- ${quoteAuthor}</cite>
            </div>
        </div>
        <button type="button" onclick="location.reload()">Reset Form</button>
    `;

    const mainElement = document.querySelector("main");
    if (mainElement) {
        mainElement.innerHTML = introTemplate;
    }
}

function reset() {
    location.reload();
}

function clearFields() {
    const form = document.querySelector("form");
    const elements = form.elements;
    for (let i = 0; i < elements.length; i++) {
        if (elements[i].type !== 'submit' && elements[i].type !== 'reset' && elements[i].type !== 'button') {
            elements[i].value = "";
        }
    }
}
