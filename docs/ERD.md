# School Management System: ER diagram

## Recommended stack

- **Next.js App Router + Tailwind CSS** provides one deployable application with
  server-rendered pages, route handlers, and a responsive UI without splitting
  the frontend and backend into separate projects.
- **PostgreSQL + Prisma** is a strong fit for the relational constraints,
  composite uniqueness requirements, reporting queries, and type-safe access
  from TypeScript. Passwords will be stored as Argon2id hashes and sessions
  will be stored server-side.

## ER diagram

```mermaid
erDiagram
    USERS {
        uuid id PK
        string username UK
        string email UK
        string password_hash
        user_role role
        boolean is_active
        datetime last_login_at
        datetime created_at
        datetime updated_at
    }

    TEACHERS {
        uuid id PK
        uuid user_id FK,UK
        string teacher_code UK
        string first_name
        string last_name
        gender gender
        date date_of_birth
        string phone
        string address
        string qualification
        string subject_specialization
        date hire_date
        person_status status
        datetime created_at
        datetime updated_at
    }

    STUDENTS {
        uuid id PK
        uuid user_id FK,UK
        string admission_number UK
        string first_name
        string last_name
        gender gender
        date date_of_birth
        string phone
        string address
        string guardian_name
        string guardian_phone
        uuid class_id FK
        date admission_date
        student_status status
        datetime created_at
        datetime updated_at
    }

    CLASSES {
        uuid id PK
        string name
        string section
        string academic_year
        uuid class_teacher_id FK
        datetime created_at
        datetime updated_at
    }

    SUBJECTS {
        uuid id PK
        string name
        string code UK
        uuid class_id FK
        uuid teacher_id FK
        datetime created_at
        datetime updated_at
    }

    EXAMS {
        uuid id PK
        string name
        string academic_year
        date start_date
        date end_date
        datetime created_at
        datetime updated_at
    }

    TEACHER_ATTENDANCE {
        uuid id PK
        uuid teacher_id FK
        date date
        teacher_attendance_status status
        time check_in_time
        time check_out_time
        string remarks
        uuid marked_by FK
        datetime created_at
    }

    STUDENT_ATTENDANCE {
        uuid id PK
        uuid student_id FK
        uuid class_id FK
        date date
        student_attendance_status status
        string remarks
        uuid marked_by FK
        datetime created_at
    }

    MARKS {
        uuid id PK
        uuid student_id FK
        uuid subject_id FK
        uuid exam_id FK
        decimal marks_obtained
        decimal max_marks
        string grade
        string remarks
        uuid entered_by FK
        datetime created_at
        datetime updated_at
    }

    GRADE_SCALES {
        uuid id PK
        string scale_name
        string grade
        decimal minimum_percentage
        boolean is_active
        datetime created_at
        datetime updated_at
    }

    USERS ||--o| TEACHERS : "has teacher profile"
    USERS ||--o| STUDENTS : "has student profile"
    TEACHERS ||--o{ CLASSES : "teaches as class teacher"
    TEACHERS ||--o{ SUBJECTS : "teaches"
    CLASSES ||--o{ STUDENTS : "contains"
    CLASSES ||--o{ SUBJECTS : "offers"
    TEACHERS ||--o{ TEACHER_ATTENDANCE : "has"
    USERS ||--o{ TEACHER_ATTENDANCE : "marks"
    STUDENTS ||--o{ STUDENT_ATTENDANCE : "has"
    CLASSES ||--o{ STUDENT_ATTENDANCE : "scopes"
    USERS ||--o{ STUDENT_ATTENDANCE : "marks"
    STUDENTS ||--o{ MARKS : "receives"
    SUBJECTS ||--o{ MARKS : "contains"
    EXAMS ||--o{ MARKS : "contains"
    USERS ||--o{ MARKS : "enters"
```

## Relationship summary

- A **user** may be an administrator without a profile, or have exactly one
  teacher or student profile. `teachers.user_id` and `students.user_id` are
  both non-null and unique, enforcing the one-to-one profile links.
- A **class** can have one optional class teacher and contains many students.
  A student belongs to one class at a time; historical transfers can be added
  later without changing the current enrollment field.
- A **subject** belongs to one class and is assigned to one teacher. The
  composite class/subject/teacher ownership is enforced by authorization
  rules in the API, while the foreign keys preserve referential integrity.
- **Teacher attendance** is unique per teacher and date. **Student attendance**
  is unique per student and date and records the class used when it was
  marked, which preserves reporting context.
- A **mark** belongs to one student, subject, and exam. The composite
  `(student_id, subject_id, exam_id)` constraint prevents duplicate entries.
  Database checks prevent negative marks or marks above `max_marks`.
- **Grade scales** hold configurable minimum percentage thresholds. The marks
  service selects the active rule with the highest threshold not exceeding the
  percentage, then persists the resulting grade for stable historical reports.
- People are deactivated through status fields. Restrictive foreign keys avoid
  accidentally deleting records that are needed for historical attendance or
  marks.

