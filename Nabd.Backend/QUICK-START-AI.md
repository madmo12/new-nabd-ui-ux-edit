# 🚀 Quick Start Guide - AI Model Setup

## ⚡ Fast Setup (5 minutes)

### Step 1: Install Python Dependencies
```bash
cd Back/AIModels/Main
pip install -r requirements.txt
```

**What this installs:**
- TensorFlow (AI framework)
- NumPy (numerical computing)

### Step 2: Test Python Script
```bash
python predict.py "[\"fever\", \"cough\"]"
```

**Expected output:**
```
Influenza
```
(or similar disease name)

### Step 3: Run Backend
```bash
cd ../../src/Nabd.API
dotnet run
```

### Step 4: Test API
Open Swagger: `https://localhost:7001/swagger`

**Test endpoint:**
```
POST /api/doctor/diagnosis
```

**Sample request:**
```json
{
  "patientId": "test-123",
  "symptomsText": "fever and cough"
}
```

---

## 🐛 Troubleshooting

### Error: "Python not found"
```bash
# Install Python from: https://www.python.org/downloads/
# Or use full path in code (MainDiagnosisLocalModel.cs line 22)
```

### Error: "TensorFlow not installed"
```bash
pip install tensorflow
```

### Error: "Model file not found"
```bash
# Verify files exist:
dir Back\AIModels\Main
# Should show:
# - best_disease_model.h5
# - symptom_cols.pkl
# - label_encoder.pkl
# - predict.py
```

---

## ✅ Success Indicators

1. ✅ Python script runs without errors
2. ✅ Backend starts successfully
3. ✅ Health check returns `"aiIntegration": "active-local"`
4. ✅ Diagnosis endpoint returns disease name

---

## 📞 Need Help?

Check the detailed documentation:
- **Full Guide**: `AI-INTEGRATION-COMPLETE.md`
- **Model Details**: `AIModels/Main/README.md`
