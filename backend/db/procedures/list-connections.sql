SELECT pid, usename, application_name, client_addr, state 
FROM pg_stat_activity 
WHERE datname = 'expense-manager';
