1. nvm use 18
2. npm install
3. npm run dev

9 chapter
pnpm install next@canary

11 chapter
pnpm i use-debounce

14 chapter
package.json
"scripts": {
...
"lint": "next lint"
},

15 chapter
pnpm i next-auth@beta

## rendering

============

pnpm install server-only

# translator DEEPL

pnpm install axios

=======
User name,Password,Console sign-in URL
cat1960m,k+E5L'9$,https://872515266060.signin.aws.amazon.com/console

=====================
make backup of DB
----------------
1) brew install postgresql@15 (in terminal)
2) brew services start postgresql@15
3) pg_dump --version
4)  brew link postgresql@15 --force  (if needed only)  
5) pg_dump -h ep-young-violet-a4mauuqn-pooler.us-east-1.aws.neon.tech -U neondb_owner -d neondb -F p > backup.sql
    password:  npg_cG7FNRT5Dwzn
6) file in  /Users/yourname/backups/  

to restore : psql -U postgres -d your-db-name -f backup.sql ( not try yet)