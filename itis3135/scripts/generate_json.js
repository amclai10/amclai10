/* FORM VARIABLES
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


const githubAccount = form.elements["githubAccount"].value;
const githubPages = form.elements["githubPages"].value;
const cltWebHome = form.elements["cltWebHome"].value;
const coursePage = form.elements["coursePage"].value;
const fccProfile = form.elements["fccProfile"].value;
const linkedinProfile = form.elements["linkedinProfile"].value;
const acknowledgementStatement = form.elements["acknowledgementStatement"].value;
const acknowledgementDate = form.elements["acknowledgementDate"].value;

const courses = Array.from(document.querySelectorAll(".course")).map(course => ({
    department: course.querySelector("[name='courseDepartment']").value,
    number: course.querySelector("[name='courseNumber']").value,
    name: course.querySelector("[name='courseName']").value,
    description: course.querySelector("[name='courseDescription']").value
}));

const jsonTemplate = {

    "firstName": firstName,
    "middleName": middleName,
    "lastName": lastName,
    "mascotAdjective": mascotAdjective,
    "mascotAnimal": mascotAnimal,
    "divider": divider,
    "picture": pictureFile,
    "pictureCaption": pictureCaption,
    "personalStatement": personalStatement,
    "personalBackground": personalBackground,
    "professionalBackground": professionalBackground,
    "academicBackground": academicBackground,
    "primaryComputer": computer,
    "webDevBackground": webDevBackground,
    "funnyThing": funnyThing,
    "additionalInfo": additionalInfo,
    "quote": quote,
    "quoteAuthor": quoteAuthor,
    "acknowledgementStatement": acknowledgementStatement,
    "acknowledgementDate": acknowledgementDate,
    courses: [
        {
            "Department": courses[0].department,
            "number": courses[0].number,
            "name": courses[0].name,
            "description": courses[0].description
        },
    ],
    links: [
        {
            "githubAccount": githubAccount,
        },
        {
            "githubPages": githubPages,
        },
        {
            "cltWebHome": cltWebHome,
        },
        {
            "coursePage": coursePage,
        },
        {
            "fccProfile": fccProfile,
        },
        {
            "linkedinProfile": linkedinProfile,
        }
    ]
}
*/

function generate() {
    const form = document.querySelector("form");
    const formData = new FormData(form);

    const formObject = Object.fromEntries(formData);

    const courses = Array.from(document.querySelectorAll(".course")).map(course => ({
        department: course.querySelector("[name='courseDepartment']").value,
        number: course.querySelector("[name='courseNumber']").value,
        name: course.querySelector("[name='courseName']").value,
        description: course.querySelector("[name='courseDescription']").value
    }));
    const courseFields = ['department', 'number', 'name', 'description'];

    courseFields.forEach(function(field) {
        delete formObject[field];
    });
    formObject.courses = courses;

    const jsonString = JSON.stringify(formObject, null, 2);
    const newMain = `
    <pre><code class="language-json">${jsonString}</code></pre>
    <button type="button" onclick="location.reload()">Reset</button>
`;
    const mainElement = document.querySelector("main");


    if (mainElement) {
        mainElement.innerHTML = newMain;
        if (typeof hljs !== 'undefined') {
            hljs.highlightAll();
        }
    }
}