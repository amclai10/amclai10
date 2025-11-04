function generateHTML() {
    const form = document.querySelector("form");

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

    const courses = Array.from(document.querySelectorAll(".course")).map(course => ({
        department: course.querySelector("[name='courseDepartment']")?.value,
        number: course.querySelector("[name='courseNumber']").value,
        name: course.querySelector("[name='courseName']").value,
        description: course.querySelector("[name='courseDescription']").value
    }));

    const imageSource = pictureFile ? URL.createObjectURL(pictureFile) : 'images/aidanmclain-profile.png';

    // Escaping function
    function escapeHtml(text) {
        if (!text) return '';
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    // Build course list with escaping
    const coursesList = courses.map(course => {
        const courseCode = course.department ? `${course.department}-${course.number}` : course.number;
        return "\n" + `              <li>${escapeHtml(courseCode)} - ${escapeHtml(course.name)}: ${escapeHtml(course.description)}</li>`;
    }).join("");

    // Build the HTML content string
    const htmlContent = `<h2>BYO Introduction</h2>
<h3>${escapeHtml(firstName)} ${escapeHtml(middleName)} ${escapeHtml(lastName)} ${escapeHtml(divider)} ${escapeHtml(mascotAdjective)} ${escapeHtml(mascotAnimal)}</h3>
<figure class="profile-picture">
    <img src="${escapeHtml(imageSource)}" alt="Profile Picture">
    <figcaption>${escapeHtml(pictureCaption)}</figcaption>
</figure>
<div class="bio">
    <ul class="bio-list">
        <li><h3>Personal Statement</h3><p>${escapeHtml(personalStatement)}</p></li>
        <li><h3>Personal Background</h3><p>${escapeHtml(personalBackground)}</p></li>
        <li><h3>Professional Background</h3><p>${escapeHtml(professionalBackground)}</p></li>
        <li><h3>Academic Background</h3><p>${escapeHtml(academicBackground)}</p></li>
        <li><h3>Background in Web Development</h3><p>${escapeHtml(webDevBackground)}</p></li>
        <li><h3>Primary Computer</h3><p>${escapeHtml(computer)}</p></li>
        ${funnyThing ? `<li><h3>Funny/Interesting Thing About Me</h3><p>${escapeHtml(funnyThing)}</p></li>` : ''}
        ${additionalInfo ? `<li><h3>I'd also like to share</h3><p>${escapeHtml(additionalInfo)}</p></li>` : ''}
    </ul>
    <div class="courses-section">
        <h3>My Courses</h3>
        <ul class="course-list">${coursesList}</ul>
    </div>
    <div class="quote-section">
        <blockquote>"${escapeHtml(quote)}"</blockquote>
        <cite>- ${escapeHtml(quoteAuthor)}</cite>
    </div>
</div>`;

    // Escape the entire HTML content for raw display
    const escapedHtmlContent = escapeHtml(htmlContent);

    // Insert into main
    const mainElement = document.querySelector("main");
    if (mainElement) {
        mainElement.innerHTML = `<pre><code class="language-html">${escapedHtmlContent}</code></pre>
<button type="button" onclick="location.reload()">Reset Form</button>`;

        // Highlight the code
        if (typeof hljs !== 'undefined') {
            hljs.highlightAll();
        }
    }
}
