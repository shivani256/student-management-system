document.addEventListener("DOMContentLoaded", function () {

    function getStudents() {
        return JSON.parse(localStorage.getItem("students")) || [];
    }

    
    const form = document.getElementById("studentForm");

    if (form) {
        form.addEventListener("submit", function (e) {
            e.preventDefault();

            const students = getStudents();

            students.push({
                id: Date.now(),
                name: document.getElementById("name").value,
                email: document.getElementById("email").value,
                course: document.getElementById("course").value
            });

            localStorage.setItem("students", JSON.stringify(students));

            window.location.href = "students.html";
        });
    }

    
    const tableBody = document.getElementById("studentTableBody");

    if (tableBody) {
        const students = getStudents();

        tableBody.innerHTML = students.map(s => `
            <tr>
                <td>#${s.id.toString().slice(-4)}</td>
                <td>${s.name}</td>
                <td>${s.email}</td>
                <td>${s.course}</td>
                <td>
                    <button onclick="deleteStudent(${s.id})">Delete</button>
                </td>
            </tr>
        `).join('');
    }

    
    const totalStudents = document.getElementById("totalStudents");

    if (totalStudents) {
        totalStudents.textContent = getStudents().length;
    }

});

function deleteStudent(id) {
    let students = JSON.parse(localStorage.getItem("students")) || [];
    students = students.filter(s => s.id !== id);
    localStorage.setItem("students", JSON.stringify(students));
    location.reload();
}
