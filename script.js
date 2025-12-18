const studentForm = document.getElementById('studentForm');
const studentTableBody = document.getElementById('studentTableBody');
const searchInput = document.getElementById('searchInput');

// Ambil data dari LocalStorage saat pertama kali load
let students = JSON.parse(localStorage.getItem('mahasiswa')) || [];
let editIndex = -1; 

function renderTable(filter = "") {
    studentTableBody.innerHTML = '';
    
    students.forEach((student, index) => {
        if (student.name.toLowerCase().includes(filter.toLowerCase()) || student.nim.toString().includes(filter)) {
            
            
            const row = `
                <tr>
                    <td class="ps-4 fw-bold text-primary">${student.nim}</td>
                    <td>
                        <div class="fw-semibold">${student.name}</div>
                    </td>
                    <td><span class="badge bg-light text-dark border">${student.major}</span></td>
                    <td class="text-center">
                        <button class="btn-edit me-2" onclick="editStudent(${index})"><i class="fas fa-edit"></i></button>
                        <button class="btn-delete" onclick="deleteStudent(${index})"><i class="fas fa-trash"></i></button>
                    </td>
                </tr>
            `;
            studentTableBody.innerHTML += row;
        }
    });

    // Opsional: Tampilkan pesan jika data kosong
    if (studentTableBody.innerHTML === '') {
        studentTableBody.innerHTML = `<tr><td colspan="4" class="text-center text-muted py-3">Data tidak ditemukan</td></tr>`;
    }
}

studentForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const nim = document.getElementById('nim').value;
    const major = document.getElementById('major').value;

    if (editIndex === -1) {
        students.push({ name, nim, major });
    } else {
        students[editIndex] = { name, nim, major };
        editIndex = -1;
        const btn = document.getElementById('submitBtn'); // Gunakan ID tombol
        btn.innerHTML = '<i class="fas fa-plus me-1"></i> Simpan';
    }

    saveAndRefresh();
    studentForm.reset();
});

function deleteStudent(index) {
    if (confirm("Yakin ingin menghapus data ini?")) {
        students.splice(index, 1);
        saveAndRefresh();
    }
}

function editStudent(index) {
    const student = students[index];
    document.getElementById('name').value = student.name;
    document.getElementById('nim').value = student.nim;
    document.getElementById('major').value = student.major;

    editIndex = index;
    const btn = document.getElementById('submitBtn');
    btn.innerHTML = '<i class="fas fa-save me-1"></i> Update Data';
    window.scrollTo(0, 0);
}

searchInput.addEventListener('input', (e) => {
    renderTable(e.target.value);
});

function saveAndRefresh() {
    localStorage.setItem('mahasiswa', JSON.stringify(students));
    renderTable();
}

renderTable();