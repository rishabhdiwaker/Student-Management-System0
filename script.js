const students = [
    { ID: 1, name: 'Heera', email: 'heera@gmail.com',age: 22, grade: 'A', degree: 'B.Tech' },
    { ID: 2, name: 'Bhanu', email: 'bhanu@outlook.com', age: 26, grade: 'B', degree: 'MBA' },
    { ID: 3, name: 'Jyoti', email: 'jyoti@yahoo.com', age: 24, grade: 'A+', degree: 'M.S.' }
  ];

  const studentForm = document.getElementById("studentForm");
  const studentTableBody = document.getElementById("studentTableBody");
  const searchInput = document.getElementById("searchInput");

  let editMode = false;
  let currentStudentId = null;

  renderStudents();

  studentForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const nameInput = document.getElementById("nameInput");
    const emailInput = document.getElementById("emailInput");
    const ageInput = document.getElementById("ageInput");
    const gradeInput = document.getElementById("gradeInput");
    const degreeInput = document.getElementById("degreeInput");

    const name = nameInput.value;
    const email = emailInput.value;
    const age = parseInt(ageInput.value);
    const grade = gradeInput.value;
    const degree = degreeInput.value;

    if (editMode) {
      updateStudent(currentStudentId, name, email, age, grade, degree);
    } else {
      addStudent(name, email, age, grade, degree);
    }

    studentForm.reset();
    editMode = false;
    currentStudentId = null;
    renderStudents();
  });

  searchInput.addEventListener("input", function () {
    const searchTerm = searchInput.value.toLowerCase();
    const filteredStudents = students.filter(function (student) {
      return (
        student.name.toLowerCase().includes(searchTerm) ||
        student.email.toLowerCase().includes(searchTerm) ||
        student.degree.toLowerCase().includes(searchTerm)
      );
    });
    renderStudents(filteredStudents);
  });

  function renderStudents(studentsArray = students) {
    studentTableBody.innerHTML = "";

    studentsArray.forEach(function(student) {
      const row = document.createElement("tr");

      const idCell = document.createElement("td");
      idCell.innerText = student.ID;
      row.appendChild(idCell);

      const nameCell = document.createElement("td");
      nameCell.innerText = student.name;
      row.appendChild(nameCell);

      const emailCell = document.createElement("td");
      emailCell.innerText = student.email;
      row.appendChild(emailCell);
      
      const ageCell = document.createElement("td");
      ageCell.innerText = student.age;
      row.appendChild(ageCell);

      const gradeCell = document.createElement("td");
      gradeCell.innerText = student.grade;
      row.appendChild(gradeCell);
      
      const degreeCell = document.createElement("td");
      degreeCell.innerText = student.degree;
      row.appendChild(degreeCell);

      const actionsCell = document.createElement("td");

      const editButton = document.createElement("button");
      
      editButton.style.backgroundColor="black";
      editButton.style.border="none"
      editButton.style.cursor="pointer"
      editButton.style.padding="0px 10px 0 0";

    
 const img1 = document.createElement("img");
 img1.src = "./edit.png";

 editButton.appendChild(img1);
      editButton.addEventListener("click", function () {
        fillFormForEdit(student);
      });
      actionsCell.appendChild(editButton);

      const deleteButton = document.createElement("button");
         deleteButton.id="imageContainer";
         deleteButton.style.backgroundColor="black";
         deleteButton.style.border="none";
         deleteButton.style.cursor="pointer"
         
    
    const img = document.createElement("img");

    img.src = "./trash.png";

    deleteButton.appendChild(img);
      deleteButton.addEventListener("click", function () {
        deleteStudent(student.ID);
        renderStudents();
      });
      actionsCell.appendChild(deleteButton);

      row.appendChild(actionsCell);

      studentTableBody.appendChild(row);
    });
  }
//Add student
  function addStudent(name, email, age, grade,  degree) {
    const newStudent = {
      ID: students.length + 1,
      name: name,
      email: email,
      age: age,
      grade: grade,
      degree: degree
    };

    students.push(newStudent);
  }
//edit
  function updateStudent(studentId, name, email, age, grade, degree) {
    const student = students.find(function (student) {
      return student.ID === studentId;
    });

    if (student) {
      student.name = name;
      student.email = email;
      student.age = age;
      student.grade = grade;
      student.degree = degree;
    }
    studentForm.reset();
    editMode = false;
    currentStudentId = null;
    submitButton.innerText = "Add Student";
  }
//delete
  function deleteStudent(studentId) {
    const index = students.findIndex(function (student) {
      return student.ID === studentId;
    });

    if (index !== -1) {
      students.splice(index, 1);
    }
  }
// update
  function fillFormForEdit(student) {
    const nameInput = document.getElementById("nameInput");
    const emailInput = document.getElementById("emailInput");
    const ageInput = document.getElementById("ageInput");
    const gradeInput = document.getElementById("gradeInput");
    const degreeInput = document.getElementById("degreeInput");

    nameInput.value = student.name;
    emailInput.value = student.email;
    ageInput.value = student.age;
    gradeInput.value = student.grade;
    degreeInput.value = student.degree;

    submitButton.innerText = "Edit Student";
    editMode = true;
    currentStudentId = student.ID;
  }