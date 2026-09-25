-- ============================================================
-- SEKOLONG - Curriculum & Syllabus Foundation
-- Migration: 002_curriculum.sql
-- ============================================================

create extension if not exists pgcrypto;

-- ============================================================
-- 1. SYLLABUS DOCUMENTS
-- ============================================================

create table if not exists public.syllabus_documents (
    id uuid primary key default gen_random_uuid(),

    title text not null,
    description text,

    grade text not null,
    subject text not null,

    curriculum_year text,
    curriculum_version text,

    file_path text not null,
    file_name text not null,
    file_size bigint,

    mime_type text default 'application/pdf',

    processing_status text not null default 'uploaded'
        check (
            processing_status in (
                'uploaded',
                'processing',
                'processed',
                'failed',
                'approved',
                'archived'
            )
        ),

    processing_error text,

    extracted_text text,

    uploaded_by uuid references auth.users(id) on delete set null,

    created_at timestamptz not null default timezone('utc', now()),
    updated_at timestamptz not null default timezone('utc', now())
);

create index if not exists idx_syllabus_documents_grade
    on public.syllabus_documents(grade);

create index if not exists idx_syllabus_documents_subject
    on public.syllabus_documents(subject);

create index if not exists idx_syllabus_documents_status
    on public.syllabus_documents(processing_status);


-- ============================================================
-- 2. SYLLABUS SECTIONS
-- ============================================================

create table if not exists public.syllabus_sections (
    id uuid primary key default gen_random_uuid(),

    syllabus_document_id uuid not null
        references public.syllabus_documents(id)
        on delete cascade,

    section_title text not null,

    section_number text,

    page_start integer,
    page_end integer,

    content text,

    section_order integer not null default 0,

    created_at timestamptz not null default timezone('utc', now())
);

create index if not exists idx_syllabus_sections_document
    on public.syllabus_sections(syllabus_document_id);

create index if not exists idx_syllabus_sections_order
    on public.syllabus_sections(syllabus_document_id, section_order);


-- ============================================================
-- 3. GRADES
-- ============================================================

create table if not exists public.curriculum_grades (
    id uuid primary key default gen_random_uuid(),

    name text not null unique,
    description text,

    created_at timestamptz not null default timezone('utc', now())
);


-- ============================================================
-- 4. SUBJECTS
-- ============================================================

create table if not exists public.curriculum_subjects (
    id uuid primary key default gen_random_uuid(),

    name text not null,
    code text,

    description text,

    grade_id uuid
        references public.curriculum_grades(id)
        on delete set null,

    created_at timestamptz not null default timezone('utc', now()),

    unique(name, grade_id)
);

create index if not exists idx_curriculum_subjects_grade
    on public.curriculum_subjects(grade_id);


-- ============================================================
-- 5. CURRICULUM UNITS
-- ============================================================

create table if not exists public.curriculum_units (
    id uuid primary key default gen_random_uuid(),

    subject_id uuid not null
        references public.curriculum_subjects(id)
        on delete cascade,

    syllabus_document_id uuid
        references public.syllabus_documents(id)
        on delete set null,

    title text not null,
    description text,

    unit_number integer,

    learning_outcomes text,

    source_section_id uuid
        references public.syllabus_sections(id)
        on delete set null,

    created_at timestamptz not null default timezone('utc', now()),
    updated_at timestamptz not null default timezone('utc', now())
);

create index if not exists idx_curriculum_units_subject
    on public.curriculum_units(subject_id);

create index if not exists idx_curriculum_units_syllabus
    on public.curriculum_units(syllabus_document_id);


-- ============================================================
-- 6. CURRICULUM TOPICS
-- ============================================================

create table if not exists public.curriculum_topics (
    id uuid primary key default gen_random_uuid(),

    unit_id uuid not null
        references public.curriculum_units(id)
        on delete cascade,

    title text not null,
    description text,

    topic_order integer not null default 0,

    learning_objectives jsonb not null default '[]'::jsonb,

    source_section_id uuid
        references public.syllabus_sections(id)
        on delete set null,

    source_page_start integer,
    source_page_end integer,

    created_at timestamptz not null default timezone('utc', now()),
    updated_at timestamptz not null default timezone('utc', now())
);

create index if not exists idx_curriculum_topics_unit
    on public.curriculum_topics(unit_id);

create index if not exists idx_curriculum_topics_order
    on public.curriculum_topics(unit_id, topic_order);


-- ============================================================
-- 7. LEARNING OUTCOMES
-- ============================================================

create table if not exists public.learning_outcomes (
    id uuid primary key default gen_random_uuid(),

    topic_id uuid not null
        references public.curriculum_topics(id)
        on delete cascade,

    outcome text not null,

    outcome_order integer not null default 0,

    source_text text,

    created_at timestamptz not null default timezone('utc', now())
);

create index if not exists idx_learning_outcomes_topic
    on public.learning_outcomes(topic_id);


-- ============================================================
-- 8. AI GENERATION JOBS
-- ============================================================

create table if not exists public.ai_generation_jobs (
    id uuid primary key default gen_random_uuid(),

    job_type text not null
        check (
            job_type in (
                'curriculum',
                'course',
                'lesson',
                'quiz',
                'question_bank',
                'translation',
                'remediation'
            )
        ),

    status text not null default 'queued'
        check (
            status in (
                'queued',
                'processing',
                'completed',
                'failed',
                'cancelled'
            )
        ),

    source_document_id uuid
        references public.syllabus_documents(id)
        on delete set null,

    source_topic_id uuid
        references public.curriculum_topics(id)
        on delete set null,

    result jsonb,

    error_message text,

    created_by uuid
        references auth.users(id)
        on delete set null,

    created_at timestamptz not null default timezone('utc', now()),
    completed_at timestamptz
);

create index if not exists idx_ai_generation_jobs_status
    on public.ai_generation_jobs(status);

create index if not exists idx_ai_generation_jobs_type
    on public.ai_generation_jobs(job_type);


-- ============================================================
-- 9. UPDATED-AT TRIGGER
-- ============================================================

drop trigger if exists syllabus_documents_set_updated_at
    on public.syllabus_documents;

create trigger syllabus_documents_set_updated_at
before update on public.syllabus_documents
for each row
execute function public.set_updated_at();


drop trigger if exists curriculum_units_set_updated_at
    on public.curriculum_units;

create trigger curriculum_units_set_updated_at
before update on public.curriculum_units
for each row
execute function public.set_updated_at();


drop trigger if exists curriculum_topics_set_updated_at
    on public.curriculum_topics;

create trigger curriculum_topics_set_updated_at
before update on public.curriculum_topics
for each row
execute function public.set_updated_at();


-- ============================================================
-- 10. ROW LEVEL SECURITY
-- ============================================================

alter table public.syllabus_documents enable row level security;
alter table public.syllabus_sections enable row level security;
alter table public.curriculum_grades enable row level security;
alter table public.curriculum_subjects enable row level security;
alter table public.curriculum_units enable row level security;
alter table public.curriculum_topics enable row level security;
alter table public.learning_outcomes enable row level security;
alter table public.ai_generation_jobs enable row level security;


-- ============================================================
-- ADMIN POLICIES
-- ============================================================

create policy "Admins can manage syllabus documents"
on public.syllabus_documents
for all
using (public.is_admin())
with check (public.is_admin());


create policy "Admins can manage syllabus sections"
on public.syllabus_sections
for all
using (public.is_admin())
with check (public.is_admin());


create policy "Admins can manage curriculum grades"
on public.curriculum_grades
for all
using (public.is_admin())
with check (public.is_admin());


create policy "Admins can manage curriculum subjects"
on public.curriculum_subjects
for all
using (public.is_admin())
with check (public.is_admin());


create policy "Admins can manage curriculum units"
on public.curriculum_units
for all
using (public.is_admin())
with check (public.is_admin());


create policy "Admins can manage curriculum topics"
on public.curriculum_topics
for all
using (public.is_admin())
with check (public.is_admin());


create policy "Admins can manage learning outcomes"
on public.learning_outcomes
for all
using (public.is_admin())
with check (public.is_admin());


create policy "Admins can manage AI generation jobs"
on public.ai_generation_jobs
for all
using (public.is_admin())
with check (public.is_admin());


-- ============================================================
-- END
-- ============================================================
