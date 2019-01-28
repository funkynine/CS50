import sqlite3
import os.path


sqlite_file = 'dbsite.db'

if os.path.exists(sqlite_file):
    print('File exists')
else:
    print('File NOT exists')

conn = sqlite3.connect(sqlite_file)

print(conn)
