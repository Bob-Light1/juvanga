# Future migrations

F0 creates no database or business migrations. JUV-201 establishes the initial schema and SQL tests.

Use `YYYYMMDDHHMMSS_description.sql` names, UTC and one author per schema change. Migrations are immutable after application. Include constraints, indexes, RLS, grants and tests. Never make unrecorded manual changes to the hosted schema. Restore storage objects separately; PostgreSQL dumps do not include files.
