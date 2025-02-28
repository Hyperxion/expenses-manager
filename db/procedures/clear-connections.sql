SELECT pg_terminate_backend(pid)
FROM pg_stat_activity
WHERE datname = 'expense-manager'
  AND pid <> pg_backend_pid();