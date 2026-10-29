CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TYPE "user_role" AS ENUM ('admin', 'teacher', 'student');
CREATE TYPE "gender" AS ENUM ('male', 'female', 'other', 'prefer_not_to_say');
CREATE TYPE "person_status" AS ENUM ('active', 'inactive');
CREATE TYPE "student_status" AS ENUM ('active', 'inactive', 'graduated');
CREATE TYPE "teacher_attendance_status" AS ENUM ('present', 'absent', 'late', 'leave');
CREATE TYPE "student_attendance_status" AS ENUM ('present', 'absent', 'late', 'excused');

CREATE TABLE "users" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "username" VARCHAR(50) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "password_hash" VARCHAR(255) NOT NULL,
    "role" "user_role" NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "last_login_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "teachers" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "user_id" UUID NOT NULL,
    "teacher_code" VARCHAR(30) NOT NULL,
    "first_name" VARCHAR(100) NOT NULL,
    "last_name" VARCHAR(100) NOT NULL,
    "gender" "gender",
    "date_of_birth" DATE,
    "phone" VARCHAR(30),
    "address" VARCHAR(500),
    "qualification" VARCHAR(255),
    "subject_specialization" VARCHAR(255),
    "hire_date" DATE,
    "status" "person_status" NOT NULL DEFAULT 'active',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "teachers_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "classes" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" VARCHAR(50) NOT NULL,
    "section" VARCHAR(30) NOT NULL,
    "academic_year" VARCHAR(20) NOT NULL,
    "class_teacher_id" UUID,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "classes_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "students" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "user_id" UUID NOT NULL,
    "admission_number" VARCHAR(30) NOT NULL,
    "first_name" VARCHAR(100) NOT NULL,
    "last_name" VARCHAR(100) NOT NULL,
    "gender" "gender",
    "date_of_birth" DATE,
    "phone" VARCHAR(30),
    "address" VARCHAR(500),
    "guardian_name" VARCHAR(200) NOT NULL,
    "guardian_phone" VARCHAR(30) NOT NULL,
    "class_id" UUID NOT NULL,
    "admission_date" DATE NOT NULL,
    "status" "student_status" NOT NULL DEFAULT 'active',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "students_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "subjects" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" VARCHAR(100) NOT NULL,
    "code" VARCHAR(30) NOT NULL,
    "class_id" UUID NOT NULL,
    "teacher_id" UUID NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "subjects_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "exams" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" VARCHAR(100) NOT NULL,
    "academic_year" VARCHAR(20) NOT NULL,
    "start_date" DATE NOT NULL,
    "end_date" DATE NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "exams_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "exams_date_range_check" CHECK ("end_date" >= "start_date")
);

CREATE TABLE "teacher_attendance" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "teacher_id" UUID NOT NULL,
    "date" DATE NOT NULL,
    "status" "teacher_attendance_status" NOT NULL,
    "check_in_time" TIME(0),
    "check_out_time" TIME(0),
    "remarks" VARCHAR(500),
    "marked_by" UUID NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "teacher_attendance_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "teacher_attendance_time_check"
        CHECK ("check_out_time" IS NULL OR "check_in_time" IS NULL OR "check_out_time" >= "check_in_time")
);

CREATE TABLE "student_attendance" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "student_id" UUID NOT NULL,
    "class_id" UUID NOT NULL,
    "date" DATE NOT NULL,
    "status" "student_attendance_status" NOT NULL,
    "remarks" VARCHAR(500),
    "marked_by" UUID NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "student_attendance_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "marks" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "student_id" UUID NOT NULL,
    "subject_id" UUID NOT NULL,
    "exam_id" UUID NOT NULL,
    "marks_obtained" DECIMAL(7, 2) NOT NULL,
    "max_marks" DECIMAL(7, 2) NOT NULL,
    "grade" VARCHAR(20) NOT NULL,
    "remarks" VARCHAR(500),
    "entered_by" UUID NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "marks_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "marks_maximum_check" CHECK ("max_marks" > 0),
    CONSTRAINT "marks_range_check"
        CHECK ("marks_obtained" >= 0 AND "marks_obtained" <= "max_marks")
);

CREATE TABLE "grade_scales" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "scale_name" VARCHAR(50) NOT NULL,
    "grade" VARCHAR(20) NOT NULL,
    "minimum_percentage" DECIMAL(5, 2) NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "grade_scales_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "grade_scales_percentage_check"
        CHECK ("minimum_percentage" >= 0 AND "minimum_percentage" <= 100)
);

CREATE UNIQUE INDEX "users_username_key" ON "users"("username");
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");
CREATE UNIQUE INDEX "teachers_user_id_key" ON "teachers"("user_id");
CREATE UNIQUE INDEX "teachers_teacher_code_key" ON "teachers"("teacher_code");
CREATE UNIQUE INDEX "students_user_id_key" ON "students"("user_id");
CREATE UNIQUE INDEX "students_admission_number_key" ON "students"("admission_number");
CREATE UNIQUE INDEX "classes_name_section_academic_year_key"
    ON "classes"("name", "section", "academic_year");
CREATE UNIQUE INDEX "subjects_code_key" ON "subjects"("code");
CREATE UNIQUE INDEX "exams_name_academic_year_key" ON "exams"("name", "academic_year");
CREATE UNIQUE INDEX "teacher_attendance_teacher_id_date_key"
    ON "teacher_attendance"("teacher_id", "date");
CREATE UNIQUE INDEX "student_attendance_student_id_date_key"
    ON "student_attendance"("student_id", "date");
CREATE UNIQUE INDEX "marks_student_id_subject_id_exam_id_key"
    ON "marks"("student_id", "subject_id", "exam_id");
CREATE UNIQUE INDEX "grade_scales_scale_name_grade_key"
    ON "grade_scales"("scale_name", "grade");

CREATE INDEX "users_role_idx" ON "users"("role");
CREATE INDEX "users_is_active_idx" ON "users"("is_active");
CREATE INDEX "teachers_status_idx" ON "teachers"("status");
CREATE INDEX "students_class_id_idx" ON "students"("class_id");
CREATE INDEX "students_status_idx" ON "students"("status");
CREATE INDEX "classes_class_teacher_id_idx" ON "classes"("class_teacher_id");
CREATE INDEX "classes_academic_year_idx" ON "classes"("academic_year");
CREATE INDEX "subjects_class_id_idx" ON "subjects"("class_id");
CREATE INDEX "subjects_teacher_id_idx" ON "subjects"("teacher_id");
CREATE INDEX "exams_academic_year_idx" ON "exams"("academic_year");
CREATE INDEX "exams_start_date_end_date_idx" ON "exams"("start_date", "end_date");
CREATE INDEX "teacher_attendance_teacher_id_idx" ON "teacher_attendance"("teacher_id");
CREATE INDEX "teacher_attendance_marked_by_idx" ON "teacher_attendance"("marked_by");
CREATE INDEX "teacher_attendance_date_idx" ON "teacher_attendance"("date");
CREATE INDEX "student_attendance_student_id_idx" ON "student_attendance"("student_id");
CREATE INDEX "student_attendance_class_id_idx" ON "student_attendance"("class_id");
CREATE INDEX "student_attendance_marked_by_idx" ON "student_attendance"("marked_by");
CREATE INDEX "student_attendance_date_idx" ON "student_attendance"("date");
CREATE INDEX "marks_student_id_idx" ON "marks"("student_id");
CREATE INDEX "marks_subject_id_idx" ON "marks"("subject_id");
CREATE INDEX "marks_exam_id_idx" ON "marks"("exam_id");
CREATE INDEX "marks_entered_by_idx" ON "marks"("entered_by");
CREATE INDEX "grade_scales_scale_name_is_active_minimum_percentage_idx"
    ON "grade_scales"("scale_name", "is_active", "minimum_percentage");

ALTER TABLE "teachers"
    ADD CONSTRAINT "teachers_user_id_fkey"
    FOREIGN KEY ("user_id") REFERENCES "users"("id")
    ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE "classes"
    ADD CONSTRAINT "classes_class_teacher_id_fkey"
    FOREIGN KEY ("class_teacher_id") REFERENCES "teachers"("id")
    ON DELETE SET NULL ON UPDATE CASCADE;

ALTER TABLE "students"
    ADD CONSTRAINT "students_user_id_fkey"
    FOREIGN KEY ("user_id") REFERENCES "users"("id")
    ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE "students"
    ADD CONSTRAINT "students_class_id_fkey"
    FOREIGN KEY ("class_id") REFERENCES "classes"("id")
    ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE "subjects"
    ADD CONSTRAINT "subjects_class_id_fkey"
    FOREIGN KEY ("class_id") REFERENCES "classes"("id")
    ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE "subjects"
    ADD CONSTRAINT "subjects_teacher_id_fkey"
    FOREIGN KEY ("teacher_id") REFERENCES "teachers"("id")
    ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE "teacher_attendance"
    ADD CONSTRAINT "teacher_attendance_teacher_id_fkey"
    FOREIGN KEY ("teacher_id") REFERENCES "teachers"("id")
    ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE "teacher_attendance"
    ADD CONSTRAINT "teacher_attendance_marked_by_fkey"
    FOREIGN KEY ("marked_by") REFERENCES "users"("id")
    ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE "student_attendance"
    ADD CONSTRAINT "student_attendance_student_id_fkey"
    FOREIGN KEY ("student_id") REFERENCES "students"("id")
    ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE "student_attendance"
    ADD CONSTRAINT "student_attendance_class_id_fkey"
    FOREIGN KEY ("class_id") REFERENCES "classes"("id")
    ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE "student_attendance"
    ADD CONSTRAINT "student_attendance_marked_by_fkey"
    FOREIGN KEY ("marked_by") REFERENCES "users"("id")
    ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE "marks"
    ADD CONSTRAINT "marks_student_id_fkey"
    FOREIGN KEY ("student_id") REFERENCES "students"("id")
    ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE "marks"
    ADD CONSTRAINT "marks_subject_id_fkey"
    FOREIGN KEY ("subject_id") REFERENCES "subjects"("id")
    ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE "marks"
    ADD CONSTRAINT "marks_exam_id_fkey"
    FOREIGN KEY ("exam_id") REFERENCES "exams"("id")
    ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE "marks"
    ADD CONSTRAINT "marks_entered_by_fkey"
    FOREIGN KEY ("entered_by") REFERENCES "users"("id")
    ON DELETE RESTRICT ON UPDATE CASCADE;

