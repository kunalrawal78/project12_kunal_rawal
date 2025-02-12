# My Next.js App

## 🚀 Project Setup

Follow these steps to set up and run the project locally.

### **Prerequisites**
Ensure you have the following installed:
- **Node.js** (Latest LTS recommended)
- **npm** or **yarn**
- **PostgreSQL** (NeonDB is used in this project)

### **1️⃣ Clone the Repository**
```sh
git clone https://github.com/kunalrawal78/project12_kunal_rawal.git
cd project12_kunal_rawal
```

### **2️⃣ Install Dependencies**
```sh
npm install
```
OR (if using yarn)
```sh
yarn install
```

### **3️⃣ Set Up Environment Variables**
Create a **.env** file in the root directory and add the following:
```env

DATABASE_URL='postgresql://neondb_owner:npg_rzwco85GDPQx@ep-jolly-shape-a41uvrqz-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require'
```
This is  actual NeonDB connection string.

### **4️⃣ Run Database Migrations**
```sh
npx prisma migrate dev --name init
```
This initializes the database schema based on **prisma/schema.prisma**.

### **5️⃣ Start the Development Server**
```sh
npm run dev
```
OR (if using yarn)
```sh
yarn dev
```
Now, open **http://localhost:3000/** in your browser.

### **6️⃣ Build for Production**
To generate a production-ready build:
```sh
npm run build
npm run start
```

## 🛠️ Tech Stack
- **Next.js 15** (App Router, Server Actions)
- **React 19**
- **Tailwind CSS**
- **Prisma ORM** (PostgreSQL/NeonDB)
- **Lucide-react** (Icons)
- **Radix UI**


## 📌 Additional Commands
- **Run Prisma Studio** (Visual database browser):
  ```sh
  npx prisma studio
  ```
- **Check for Linting Issues:**
  ```sh
  npm run lint
  ```




