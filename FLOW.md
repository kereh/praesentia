# Praesentia - Attendance Management System Flow

## Overview

Praesentia is an attendance management system for academic institutions. The system manages attendance tracking for classes (kelas), allowing lecturers (dosen) to create classes and students (mahasiswa) to join and submit attendance along with performance evaluations.

---

## User Roles

| Role | Description |
|------|-------------|
| **Admin** | System administrator with full access |
| **Pegawai** | Staff member with faculty-level access |
| **Dosen** | Lecturer who creates and manages classes |
| **Mahasiswa** | Student who joins classes and submits attendance |

---

## Core Entities

```mermaid
erDiagram
    FAKULTAS ||--o{ JURUSAN : contains
    FAKULTAS ||--o{ KELAS : has
    JURUSAN ||--o{ KELAS : has
    MATA_KULIAH ||--o{ KELAS : assigned_to
    DOSEN ||--o{ KELAS : creates
    KELAS ||--o{ KELAS_SESSION : has
    KELAS_SESSION ||--o{ ABSEN_MAHASISWA : tracks
    KELAS_SESSION ||--o{ PENILAIAN_DOSEN : receives
    MAHASISWA ||--o{ ABSEN_MAHASISWA : submits
    MAHASISWA ||--o{ PENILAIAN_DOSEN : submits
```

---

## Application Flow

### Phase 1: Dosen Creates a Class

```mermaid
flowchart TD
    A[Dosen Login] --> B[Navigate to Create Class]
    B --> C[Fill Class Form]
    C --> D{Validate Form}
    D -->|Valid| E[Generate Unique Code]
    D -->|Invalid| C
    E --> F[Save Class to Database]
    F --> G[Display Class Code to Dosen]

    subgraph "Class Form Fields"
        C1[Nama Kelas]
        C2[Fakultas]
        C3[Jurusan]
        C4[Semester]
        C5[Mata Kuliah]
    end
```

#### Required Fields:
- **Nama Kelas**: Class name
- **Kode**: Auto-generated unique 6-character code
- **Fakultas**: Faculty/department
- **Jurusan**: Major/program
- **Mata Kuliah**: Course subject
- **Semester**: Academic semester

---

### Phase 2: Mahasiswa Joins Class

```mermaid
flowchart TD
    A[Mahasiswa Login] --> B[Navigate to Join Class]
    B --> C[Enter Class Code]
    C --> D{Validate Code}
    D -->|Valid| E[Add Mahasiswa to Class]
    D -->|Invalid| F[Show Error Message]
    F --> C
    E --> G[Show Class Dashboard]
```

#### Join Process:
1. Mahasiswa receives class code from Dosen
2. Mahasiswa enters the 6-character code
3. System validates the code exists
4. System adds Mahasiswa to the class roster
5. Mahasiswa can now access class sessions

---

### Phase 3: Class Session & Attendance

```mermaid
flowchart TD
    A[Dosen Starts Class Session] --> B[Generate Session QR/Code]
    B --> C[Session Window Opens]

    D[Mahasiswa Opens App] --> E[Select Active Class]
    E --> F[Submit Attendance Form]

    subgraph "Attendance Form"
        F1[Check-in Time - Auto]
        F2[Location - Optional]
        F3[Status - Hadir/Izin/Sakit]
    end

    F --> G{Within Time Window?}
    G -->|Yes| H[Record Attendance]
    G -->|No| I[Mark as Late/Absent]

    H --> J[Session Continues]
    I --> J
```

#### Attendance Status Types:
| Status | Description |
|--------|-------------|
| **Hadir** | Present |
| **Izin** | Excused absence |
| **Sakit** | Sick leave |
| **Alpha** | Unexcused absence |
| **Terlambat** | Late |

---

### Phase 4: Dosen Performance Evaluation

```mermaid
flowchart TD
    A[Class Session Ends] --> B[Trigger Evaluation Form]
    B --> C[Mahasiswa Fills Performance Form]

    subgraph "Performance Form Fields"
        C1[Kehadiran Dosen - 1-5]
        C2[Kualitas Materi - 1-5]
        C3[Metode Pengajaran - 1-5]
        C4[Interaksi - 1-5]
        C5[Komentar - Optional]
    end

    C --> D[Submit Evaluation]
    D --> E[Data Saved Anonymously]
```

#### Evaluation Criteria:
1. **Kehadiran Dosen**: Lecturer punctuality and presence
2. **Kualitas Materi**: Quality of teaching materials
3. **Metode Pengajaran**: Teaching methodology
4. **Interaksi**: Interaction with students
5. **Komentar**: Additional comments (optional)

---

### Phase 5: Data & Reports Generation

```mermaid
flowchart TD
    A[Class/Semester Ends] --> B[Aggregate Data]

    B --> C[Mahasiswa Attendance Report]
    B --> D[Dosen Performance Report]
    B --> E[Class Statistics]

    subgraph "Mahasiswa Report"
        C1[Total Sessions]
        C2[Attended Sessions]
        C3[Attendance Percentage]
        C4[Status Breakdown]
    end

    subgraph "Dosen Report"
        D1[Average Ratings]
        D2[Rating per Category]
        D3[Student Comments]
        D4[Trend Analysis]
    end

    subgraph "Class Statistics"
        E1[Average Attendance Rate]
        E2[Session Count]
        E3[Student Count]
    end
```

#### Generated Reports:

**Mahasiswa Attendance Report:**
- Total classes attended
- Attendance percentage
- Breakdown by status (hadir, izin, sakit, alpha)
- Attendance trend over time

**Dosen Performance Report:**
- Average rating per category
- Overall performance score
- Student feedback summary
- Comparison across classes/semesters

**Class Statistics:**
- Overall attendance rate
- Most/least attended sessions
- Performance metrics

---

## TODO - Implementation Checklist

### Database Schema Updates
- [ ] Add `semester` field to `kelas` table
- [ ] Add `dosen_id` field to `kelas` table
- [ ] Complete `absenDosen` table with required fields
- [ ] Complete `absenMahasiswa` table with required fields
- [ ] Create `kelasSession` table for class sessions
- [ ] Create `kelasMahasiswa` junction table for class enrollment
- [ ] Create `penilaianDosen` table for performance evaluations

### Dosen Features
- [ ] Create class form with all required fields
- [ ] Unique code generation logic
- [ ] Start/end class session functionality
- [ ] View class roster
- [ ] View attendance summary
- [ ] Export attendance data

### Mahasiswa Features
- [ ] Join class with code
- [ ] View enrolled classes
- [ ] Submit attendance (check-in/check-out)
- [ ] Fill dosen performance form
- [ ] View attendance history

### Reporting Features
- [ ] Mahasiswa attendance report generation
- [ ] Dosen performance report generation
- [ ] Class statistics dashboard
- [ ] Export reports to PDF/Excel

### Admin/Pegawai Features
- [ ] Manage all classes
- [ ] Override attendance records
- [ ] View all reports
- [ ] Manage users and roles

---

## API Endpoints (Suggested)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/kelas` | Create new class |
| GET | `/api/kelas/:id` | Get class details |
| POST | `/api/kelas/join` | Join class with code |
| POST | `/api/session/start` | Start class session |
| POST | `/api/session/end` | End class session |
| POST | `/api/attendance` | Submit attendance |
| POST | `/api/evaluation` | Submit dosen evaluation |
| GET | `/api/reports/attendance/:mahasiswaId` | Get mahasiswa report |
| GET | `/api/reports/dosen/:dosenId` | Get dosen performance |
| GET | `/api/reports/kelas/:kelasId` | Get class statistics |
