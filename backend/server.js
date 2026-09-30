const express = require("express");
const cors = require("cors");
require("dotenv").config();

const db = require("./db");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname + "/../frontend"));


// ===============================
// TEST
// ===============================

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/../frontend/index.html");
});


// ===============================
// DASHBOARD STATISTICS
// ===============================

app.get("/api/dashboard-stats", (req, res) => {

    const sql =
        "SELECT " +
        "(SELECT COUNT(*) FROM patients) AS patients, " +
        "(SELECT COUNT(*) FROM doctors) AS doctors, " +
        "(SELECT COUNT(*) FROM appointments) AS appointments, " +
        "(SELECT COUNT(*) FROM medical_records) AS medical_records";

    db.query(sql, (err, result) => {

        if (err) {
            return res.status(500).json({
                error: err.message
            });
        }

        res.json(result[0]);
    });
});


// ===============================
// PATIENTS
// ===============================

app.get("/api/patients", (req, res) => {

    const sql = "SELECT * FROM patients";

    db.query(sql, (err, result) => {

        if (err) {
            return res.status(500).json({
                error: err.message
            });
        }

        res.json(result);
    });
});


app.post("/api/patients", (req, res) => {

    const sql =
        "INSERT INTO patients " +
        "(name, age, gender, phone, email, address, blood_group) " +
        "VALUES (?, ?, ?, ?, ?, ?, ?)";

    const values = [
        req.body.name,
        req.body.age,
        req.body.gender,
        req.body.phone,
        req.body.email,
        req.body.address,
        req.body.blood_group
    ];

    db.query(sql, values, (err, result) => {

        if (err) {
            return res.status(500).json({
                error: err.message
            });
        }

        res.json({
            message: "Patient added successfully",
            patientId: result.insertId
        });
    });
});


app.put("/api/patients/:id", (req, res) => {

    const sql =
        "UPDATE patients SET " +
        "name = ?, age = ?, gender = ?, phone = ?, " +
        "email = ?, address = ?, blood_group = ? " +
        "WHERE id = ?";

    const values = [
        req.body.name,
        req.body.age,
        req.body.gender,
        req.body.phone,
        req.body.email,
        req.body.address,
        req.body.blood_group,
        req.params.id
    ];

    db.query(sql, values, (err, result) => {

        if (err) {
            return res.status(500).json({
                error: err.message
            });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: "Patient not found"
            });
        }

        res.json({
            message: "Patient updated successfully"
        });
    });
});


app.delete("/api/patients/:id", (req, res) => {

    const sql = "DELETE FROM patients WHERE id = ?";

    db.query(sql, [req.params.id], (err, result) => {

        if (err) {
            return res.status(500).json({
                error: err.message
            });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: "Patient not found"
            });
        }

        res.json({
            message: "Patient deleted successfully"
        });
    });
});


// ===============================
// DOCTORS
// ===============================

app.get("/api/doctors", (req, res) => {

    const sql = "SELECT * FROM doctors";

    db.query(sql, (err, result) => {

        if (err) {
            return res.status(500).json({
                error: err.message
            });
        }

        res.json(result);
    });
});


app.post("/api/doctors", (req, res) => {

    const sql =
        "INSERT INTO doctors " +
        "(name, specialization, phone, email) " +
        "VALUES (?, ?, ?, ?)";

    const values = [
        req.body.name,
        req.body.specialization,
        req.body.phone,
        req.body.email
    ];

    db.query(sql, values, (err, result) => {

        if (err) {
            return res.status(500).json({
                error: err.message
            });
        }

        res.json({
            message: "Doctor added successfully",
            doctorId: result.insertId
        });
    });
});


app.put("/api/doctors/:id", (req, res) => {

    const sql =
        "UPDATE doctors SET " +
        "name = ?, specialization = ?, phone = ?, email = ? " +
        "WHERE id = ?";

    const values = [
        req.body.name,
        req.body.specialization,
        req.body.phone,
        req.body.email,
        req.params.id
    ];

    db.query(sql, values, (err, result) => {

        if (err) {
            return res.status(500).json({
                error: err.message
            });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: "Doctor not found"
            });
        }

        res.json({
            message: "Doctor updated successfully"
        });
    });
});


app.delete("/api/doctors/:id", (req, res) => {

    const sql = "DELETE FROM doctors WHERE id = ?";

    db.query(sql, [req.params.id], (err, result) => {

        if (err) {
            return res.status(500).json({
                error: err.message
            });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: "Doctor not found"
            });
        }

        res.json({
            message: "Doctor deleted successfully"
        });
    });
});


// ===============================
// APPOINTMENTS
// ===============================

app.get("/api/appointments", (req, res) => {

    const sql =
        "SELECT appointments.id, " +
        "appointments.patient_id, " +
        "appointments.doctor_id, " +
        "patients.name AS patient_name, " +
        "doctors.name AS doctor_name, " +
        "doctors.specialization, " +
        "appointments.appointment_date, " +
        "appointments.appointment_time, " +
        "appointments.reason, " +
        "appointments.status " +
        "FROM appointments " +
        "INNER JOIN patients ON appointments.patient_id = patients.id " +
        "INNER JOIN doctors ON appointments.doctor_id = doctors.id " +
        "ORDER BY appointments.appointment_date, appointments.appointment_time";

    db.query(sql, (err, result) => {

        if (err) {
            return res.status(500).json({
                error: err.message
            });
        }

        res.json(result);
    });
});


app.post("/api/appointments", (req, res) => {

    const sql =
        "INSERT INTO appointments " +
        "(patient_id, doctor_id, appointment_date, appointment_time, reason, status) " +
        "VALUES (?, ?, ?, ?, ?, ?)";

    const values = [
        req.body.patient_id,
        req.body.doctor_id,
        req.body.appointment_date,
        req.body.appointment_time,
        req.body.reason,
        req.body.status
    ];

    db.query(sql, values, (err, result) => {

        if (err) {
            return res.status(500).json({
                error: err.message
            });
        }

        res.json({
            message: "Appointment added successfully",
            appointmentId: result.insertId
        });
    });
});


app.put("/api/appointments/:id", (req, res) => {

    const sql =
        "UPDATE appointments SET " +
        "patient_id = ?, doctor_id = ?, appointment_date = ?, " +
        "appointment_time = ?, reason = ?, status = ? " +
        "WHERE id = ?";

    const values = [
        req.body.patient_id,
        req.body.doctor_id,
        req.body.appointment_date,
        req.body.appointment_time,
        req.body.reason,
        req.body.status,
        req.params.id
    ];

    db.query(sql, values, (err, result) => {

        if (err) {
            return res.status(500).json({
                error: err.message
            });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: "Appointment not found"
            });
        }

        res.json({
            message: "Appointment updated successfully"
        });
    });
});


app.delete("/api/appointments/:id", (req, res) => {

    const sql = "DELETE FROM appointments WHERE id = ?";

    db.query(sql, [req.params.id], (err, result) => {

        if (err) {
            return res.status(500).json({
                error: err.message
            });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: "Appointment not found"
            });
        }

        res.json({
            message: "Appointment deleted successfully"
        });
    });
});


// ===============================
// MEDICAL RECORDS
// ===============================

app.get("/api/medical-records", (req, res) => {

    const sql =
        "SELECT medical_records.id, " +
        "medical_records.patient_id, " +
        "patients.name AS patient_name, " +
        "medical_records.diagnosis, " +
        "medical_records.treatment, " +
        "medical_records.prescription, " +
        "medical_records.record_date " +
        "FROM medical_records " +
        "INNER JOIN patients ON medical_records.patient_id = patients.id " +
        "ORDER BY medical_records.record_date DESC";

    db.query(sql, (err, result) => {

        if (err) {
            return res.status(500).json({
                error: err.message
            });
        }

        res.json(result);
    });
});


app.post("/api/medical-records", (req, res) => {

    const sql =
        "INSERT INTO medical_records " +
        "(patient_id, diagnosis, treatment, prescription, record_date) " +
        "VALUES (?, ?, ?, ?, ?)";

    const values = [
        req.body.patient_id,
        req.body.diagnosis,
        req.body.treatment,
        req.body.prescription,
        req.body.record_date
    ];

    db.query(sql, values, (err, result) => {

        if (err) {
            return res.status(500).json({
                error: err.message
            });
        }

        res.json({
            message: "Medical record added successfully",
            recordId: result.insertId
        });
    });
});


app.put("/api/medical-records/:id", (req, res) => {

    const sql =
        "UPDATE medical_records SET " +
        "patient_id = ?, diagnosis = ?, treatment = ?, " +
        "prescription = ?, record_date = ? " +
        "WHERE id = ?";

    const values = [
        req.body.patient_id,
        req.body.diagnosis,
        req.body.treatment,
        req.body.prescription,
        req.body.record_date,
        req.params.id
    ];

    db.query(sql, values, (err, result) => {

        if (err) {
            return res.status(500).json({
                error: err.message
            });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: "Medical record not found"
            });
        }

        res.json({
            message: "Medical record updated successfully"
        });
    });
});


app.delete("/api/medical-records/:id", (req, res) => {

    const sql = "DELETE FROM medical_records WHERE id = ?";

    db.query(sql, [req.params.id], (err, result) => {

        if (err) {
            return res.status(500).json({
                error: err.message
            });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: "Medical record not found"
            });
        }

        res.json({
            message: "Medical record deleted successfully"
        });
    });
});


// ===============================
// START SERVER
// ===============================

const PORT = process.env.PORT || 3000;

if (require.main === module) {

    app.listen(PORT, () => {

        console.log("MySQL + Express server started");

        console.log(
            "Server running at http://localhost:" + PORT
        );

    });

}


// ===============================
// VERCEL EXPORT
// ===============================

module.exports = app;