# E-Health Management System

A web-based healthcare management system developed using HTML, CSS, JavaScript, Node.js, Express.js, and MySQL.

## 📌 Project Overview

The E-Health Management System is designed to manage basic healthcare-related information through a simple web interface.

The system provides modules for managing:

* Patients
* Doctors
* Appointments
* Medical Records
* Dashboard Statistics

## 🚀 Features

### Patient Management

* Add new patients
* View patient details
* Edit patient information
* Delete patient records

### Doctor Management

* Add doctors
* View doctor details
* Edit doctor information
* Delete doctor records

### Appointment Management

* Schedule appointments
* Select patients and doctors
* Set appointment date and time
* Update appointment status
* Edit and delete appointments

### Medical Records

* Add medical records
* Store diagnosis and treatment details
* Store prescriptions
* Edit and delete medical records

### Dashboard

* Total patient count
* Total doctor count
* Total appointment count
* Total medical record count

## 🛠️ Technologies Used

* HTML5
* CSS3
* JavaScript
* Node.js
* Express.js
* MySQL
* REST API
* Git & GitHub

## 📂 Project Structure

```text
E-Health-Management-System/
│
├── backend/
│   ├── server.js
│   └── db.js
│
├── frontend/
│   ├── index.html
│   ├── patients.html
│   ├── doctors.html
│   ├── appointments.html
│   └── medical-records.html
│
├── database/
│
├── .gitignore
├── package.json
├── package-lock.json
└── README.md
```

## ⚙️ Installation

### 1. Clone the repository

```bash
git clone https://github.com/M-Dhivyadharshini/E-Health-Management-System.git
```

### 2. Open the project

```bash
cd E-Health-Management-System
```

### 3. Install dependencies

```bash
npm install
```

### 4. Configure the database

Create a `.env` file in the project root:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=YOUR_MYSQL_PASSWORD
DB_NAME=ehealth_db
DB_PORT=3306
```

### 5. Start the server

```bash
node backend/server.js
```

The application will run at:

```text
http://localhost:3000
```

## 🔐 Environment Variables

The `.env` file contains database credentials and is intentionally excluded from GitHub using `.gitignore`.

Never upload your database password or other secret credentials to GitHub.

## 📊 Database

The system uses MySQL with the following main tables:

* `users`
* `patients`
* `doctors`
* `appointments`
* `medical_records`

## 👩‍💻 Author

**M Dhivyadharshini**

## 📄 License

This project was developed for educational and project purposes.
