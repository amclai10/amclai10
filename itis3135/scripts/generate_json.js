function generate() {
    const form = document.querySelector("form");
    const formData = new FormData(form);
    
    // Convert FormData to object using Object.fromEntries()
    const formObject = Object.fromEntries(formData.entries());
    
    // Handle courses separately to create a proper structure
    const courses = Array.from(document.querySelectorAll(".course")).map(function(course) {
        return {
            number: course.querySelector("[name='courseNumber']").value,
            name: course.querySelector("[name='courseName']").value,
            description: course.querySelector("[name='courseDescription']").value
        };
    });
    
    // Remove individual course fields and add structured courses array
    const courseFields = ['courseNumber', 'courseName', 'courseDescription'];
    courseFields.forEach(function(field) {
        delete formObject[field];
    });
    formObject.courses = courses;
    
    const jsonString = JSON.stringify(formObject, null, 2);
    const mainElement = document.querySelector("main");
    const newMain = `<pre><code class="language-json">${jsonString}</code></pre>
    <button type="button" onclick="location.reload()">Reset Form</button>`;
    
    if (mainElement) {
        mainElement.innerHTML = newMain;
        // Re-run syntax highlighting if highlight.js is available
        if (typeof hljs !== 'undefined') {
            hljs.highlightAll();
        }
    }
}

function deleteCourse(button) {
    const courseDiv = button.parentElement;
    courseDiv.remove();
}