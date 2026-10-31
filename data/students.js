// In-memory data store for this practical. Records reset when the server restarts.
let nextId = 1003;

const students = [
  {
    id: 'STU1001',
    name: 'Aarav Mehta',
    email: 'aarav@example.com',
    prn: '202401040021',
    mobile: '9876543210',
    course: 'B.Tech'
  },
  {
    id: 'STU1002',
    name: 'Isha Kulkarni',
    email: 'isha@example.com',
    prn: '202401040022',
    mobile: '9123456780',
    course: 'B.Tech'
  }
];

function getAll() {
  return [...students];
}

function findById(id) {
  return students.find(student => student.id === id);
}

function findByPrn(prn) {
  return students.find(student => student.prn === prn);
}

function findByEmail(email) {
  const normalized = String(email || '').toLowerCase();
  return students.find(student => student.email.toLowerCase() === normalized);
}

function create(data) {
  const student = { id: `STU${nextId++}`, ...data };
  students.push(student);
  return student;
}

module.exports = { getAll, findById, findByPrn, findByEmail, create };
