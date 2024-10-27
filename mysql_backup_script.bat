cd C:\Program Files\MySQL\MySQL Server 8.0\bin
set mysql_user=root
set mysql_password=masterkey
mysqldump --user=%mysql_user% --password=%mysql_password% --all-databases > d:\backup\mysql\server\all-databases.sql
for /f "tokens=1* delims==" %%a in (D:\PROJECTS\INFORMATIC\OIIS\server\prod\.env) do if /i %%a==DB_NAME SET DB_NAME=%%b
set DB_NAME=%DB_NAME:"=%
echo "DB_NAME>%DB_NAME%"
mysqldump --user=%mysql_user% --password=%mysql_password% --databases %DB_NAME% > d:\backup\mysql\server\%DB_NAME%.sql
if %ERRORLEVEL% neq 0 eventcreate /ID 1 /L APPLICATION /T ERROR /SO mysql-backup-script /D "Backup failed: error during dump creation" && exit
