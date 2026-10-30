# School Management System: ER Diagram

## Database Schema (Matching Supabase Tables)

The database schema matches the 7 primary tables in the Supabase Table Editor:
1. `attendance`
2. `classes`
3. `marks`
4. `students`
5. `subjects`
6. `teachers`
7. `users`

## ER Diagram

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

    ATTENDANCE {
        uuid id PK
        uuid student_id FK
        uuid class_id FK
        date date
        string status
        string remarks
        uuid marked_by FK
        datetime created_at
    }

    MARKS {
        uuid id PK
        uuid student_id FK
        uuid subject_id FK
        string exam
        decimal marks_obtained
        decimal max_marks
        string grade
        string remarks
        uuid entered_by FK
        datetime created_at
        datetime updated_at
    }

    USERS ||--o| TEACHERS : "has teacher profile"
    USERS ||--o| STUDENTS : "has student profile"
    TEACHERS ||--o{ CLASSES : "teaches as class teacher"
    TEACHERS ||--o{ SUBJECTS : "teaches"
    CLASSES ||--o{ STUDENTS : "contains"
    CLASSES ||--o{ SUBJECTS : "offers"
    CLASSES ||--o{ ATTENDANCE : "scopes"
    STUDENTS ||--o{ ATTENDANCE : "has"
    USERS ||--o{ ATTENDANCE : "marks"
    STUDENTS ||--o{ MARKS : "receives"
    SUBJECTS ||--o{ MARKS : "contains"
    USERS ||--o{ MARKS : "enters"
```

## Tables Overview

- **`users`**: Authentication credentials, roles (`admin`, `teacher`, `student`), and account status.
- **`teachers`**: Teacher records linked to users, qualifications, hire date, and class teacher assignments.
- **`students`**: Student records linked to classes, admission numbers, guardian contacts, and status.
- **`classes`**: Grade, section, academic year, and assigned class teacher.
- **`subjects`**: Course subject details, subject code, class assignment, and assigned teacher.
- **`attendance`**: Daily attendance records per student and class with status (Present, Absent, Late, Excused).
- **`marks`**: Academic assessments, subject marks obtained, maximum marks, exam name, and calculated grade.
