# Nabd Authentication Setup

##  Issue Resolved
The login 401 error was caused by users being seeded without password hashes. The database seeders have been updated to use ASP. NET Identity's `UserManager` for proper password hashing.

## Current Status
- ✅ Backend API is running on `http://localhost:5117`
- ✅ Database migrations have been applied
- ⚠️ **Database is currently empty** - no users exist yet

## Quick Start - Create a Test Account

Since the database is currently empty, you need to create an account via registration:

### Option 1: Register via Frontend (Recommended)
1. Go to your frontend registration page
2. Create a new account with your details
3. Use those credentials to log in

### Option 2: Register via API (using curl or Postman)

**Register as a Patient:**
```bash
curl -X POST http://localhost:5117/api/Auth/register/patient \
  -H "Content-Type: application/json" \
  -d '{
    "email": "patient@example.com",
    "password": "Test@123",
    "confirmPassword": "Test@123",
    "firstName": "John",
    "lastName": "Doe",
    "phoneNumber": "+201234567890",
    "birthDate": "1990-01-01",
    "gender": 0
  }'
```

**Register as a Doctor:**
```bash
curl -X POST http://localhost:5117/api/Auth/register/doctor \
  -H "Content-Type: application/json" \
  -d '{
    "email": "doctor@example.com",
    "password": "Test@123",
    "confirmPassword": "Test@123",
    "firstName": "Dr. Jane",
    "lastName": "Smith",
    "phoneNumber": "+201234567891",
    "birthDate": "1980-01-01",
    "gender": 1,
    "medicalSpecialty": 0,
    "yearsOfExperience": 10,
    "biography": "Experienced doctor"
  }'
```

## Future Database Seeding

The database seeders have been updated to properly hash passwords. When you're ready to seed the database with test data:

1. Uncomment the seeding code in `Program.cs` (lines 45-46)
2. Restart the application
3. All seeded users will have the password: **`Test@123`**

### Example Seeded Users (when seeding is enabled):
- **Patients**: `ahmed.mahmoud@patient.com`, `fatma.ali@patient.com`, etc.
- **Doctors**: `ahmed.alaraby@doctor.com`, `sara.mahmoud@doctor.com`, etc.
- **Password for all**: `Test@123`

## Technical Changes Made

1. ✅ Updated `VerifierSeed.cs` to use `UserManager<Verifier>`  
2. ✅ Updated `PatientSeed.cs` to use `UserManager<Patient>`
3. ✅ Updated `DoctorSeed.cs` to use `UserManager<Doctor>`
4. ✅ Updated `DatabaseSeeder.cs` to inject UserManager instances
5. ✅ All users now properly hashed with ASP.NET Identity

## Troubleshooting

### "Invalid credentials" error
- Make sure you're using credentials for an account that exists
- If you just created the account, verify email confirmation isn't required
- Try registering a new account

### Database reset needed
If you need to completely reset the database:
```bash
sqlcmd -S DESKTOP-DPG240N -E -Q "DROP DATABASE IF EXISTS NabdDB; CREATE DATABASE NabdDB;"
dotnet ef database update --project src/Nabd.API
```
