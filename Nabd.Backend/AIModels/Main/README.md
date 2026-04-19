# Main Disease Diagnosis Model

## 📋 Overview
This directory contains the **primary disease diagnosis AI model** that runs locally within the .NET backend.

## 📁 Files

### Model Files
- **`best_disease_model.h5`** - Trained TensorFlow/Keras model for disease classification
- **`symptom_cols.pkl`** - Pickle file containing symptom column names (input feature order)
- **`label_encoder.pkl`** - Pickle file for mapping predicted class indices to disease names

### Inference Script
- **`predict.py`** - Python script that loads the model and performs inference
  - Called from .NET via `ProcessStartInfo`
  - Accepts JSON array of symptoms as command-line argument
  - Returns disease name to stdout

## 🔧 How It Works

### 1. .NET Backend Flow
```
DiagnosisController 
  → DiagnosisService.ProcessDiagnosisAsync()
    → NormalizeSymptomsAsync() [placeholder - extracts keywords]
    → MainDiagnosisLocalModel.DiagnoseAsync()
      → Spawns Python subprocess
      → Passes normalized symptoms as JSON
      → Reads disease name from stdout
```

### 2. Python Inference Flow
```python
# Input: ["fever", "cough", "headache"]
# Process:
1. Load model files (model, symptom_cols, label_encoder)
2. Create input vector (one-hot encoding based on symptom_cols)
3. Run model.predict()
4. Get predicted class index
5. Convert to disease name using label_encoder
6. Print disease name to stdout
# Output: "Influenza"
```

## 🚀 Usage

### From .NET
```csharp
// Injected as Singleton in Program.cs
services.AddSingleton<IMainDiagnosisModel, MainDiagnosisLocalModel>();

// Used in DiagnosisService
var diagnosis = await _mainDiagnosisModel.DiagnoseAsync(normalizedSymptoms);
```

### Manual Testing (Python)
```bash
cd AIModels/Main
python predict.py "[\"fever\", \"cough\", \"headache\"]"
```

## 📦 Requirements

### Python Dependencies
```bash
pip install tensorflow numpy
```

### .NET Dependencies
- No additional packages required (uses built-in `System.Diagnostics.Process`)

## ⚙️ Configuration

### Python Executable Path
By default, the code looks for `python` in PATH. To customize:

**Option 1: Update code**
```csharp
_pythonExecutable = "C:\\Python39\\python.exe"; // Full path
```

**Option 2: Use appsettings.json** (recommended for production)
```json
{
  "AI": {
    "PythonExecutable": "python3"
  }
}
```

## 🛡️ Error Handling

### Common Issues

1. **Python not found**
   - Error: `The system cannot find the file specified`
   - Solution: Install Python or update `_pythonExecutable` path

2. **TensorFlow not installed**
   - Error: `ERROR: TensorFlow not installed`
   - Solution: `pip install tensorflow`

3. **Model files missing**
   - Error: `ERROR: File not found: best_disease_model.h5`
   - Solution: Ensure all 3 files (.h5, .pkl, .pkl) are in this directory

4. **Timeout (30 seconds)**
   - Error: `AI model inference timed out`
   - Solution: Check model size and system resources

### Fallback Behavior
If the Python script fails, the system returns:
```
"Unable to determine diagnosis - Please perform manual clinical evaluation"
```

This ensures the API never crashes due to AI failures.

## 📊 Model Information

### Input Format
- **Type**: One-hot encoded vector
- **Size**: Number of symptoms in `symptom_cols.pkl`
- **Example**: `[0, 1, 0, 1, 0, ...]` (1 = symptom present, 0 = absent)

### Output Format
- **Type**: Disease name (string)
- **Example**: `"Pneumonia"`, `"Gastroenteritis"`, `"Migraine"`

### Performance
- **First call**: ~2-3 seconds (model loading)
- **Subsequent calls**: ~100-300ms (inference only)
- **Note**: Python process is spawned for each request (stateless)

## 🔮 Future Improvements

1. **Model Caching**: Keep Python process alive to avoid reload overhead
2. **ONNX Conversion**: Convert to ONNX for native .NET inference (no Python needed)
3. **Batch Inference**: Process multiple diagnoses in single call
4. **Confidence Scores**: Return probability distribution instead of just top prediction
5. **Arabic Support**: Integrate Arabic symptom normalization model

## 📝 Notes

- Model is loaded **per request** (Python subprocess spawned each time)
- For production, consider converting to ONNX for better performance
- The `MainDiagnosisLocalModel` is registered as **Singleton** in DI container
- Logs are written to application logs with `LogInformation` and `LogError`

## 🧪 Testing

### Test Endpoint
```http
POST /api/doctor/diagnosis
Authorization: Bearer {doctor_jwt_token}
Content-Type: application/json

{
  "patientId": "patient-id-here",
  "symptomsText": "المريض يعاني من سخونية وكحة وصداع"
}
```

### Expected Response
```json
{
  "patientId": "patient-id-here",
  "originalSymptoms": "المريض يعاني من سخونية وكحة وصداع",
  "normalizedSymptoms": ["fever", "cough", "headache"],
  "suggestedDiagnosis": "Influenza",
  "confidenceLevel": 80,
  "generatedAt": "2026-01-08T19:55:00Z"
}
```

---

**Last Updated**: 2026-01-08  
**Model Version**: 1.0  
**Framework**: TensorFlow/Keras  
**Integration**: Python subprocess via .NET
