# AI Models Directory

This directory contains local AI models for the Nabd Healthcare System.

## Structure

```
AIModels/
├── Main/
│   └── MainDiagnosisModel.onnx (to be added)
└── Arabic/
    └── ArabicNormalizerModel.onnx (to be added)
```

## Model Types

### 1. Main Diagnosis Model
- **Location**: `Main/MainDiagnosisModel.onnx`
- **Purpose**: Medical diagnosis based on normalized symptoms
- **Input**: List of normalized symptom keywords
- **Output**: Suggested diagnosis text
- **Status**: Pending integration

### 2. Arabic Normalizer Model
- **Location**: `Arabic/ArabicNormalizerModel.onnx`
- **Purpose**: Normalize Arabic/English symptoms text
- **Input**: Raw symptoms text
- **Output**: List of normalized symptom keywords
- **Status**: Pending integration

## Integration Guide

When adding models:

1. Place model files in appropriate subdirectories
2. Update model loading code in `MainDiagnosisLocalModel.cs`
3. Update model loading code in Arabic normalizer (when implemented)
4. Test model inference
5. Update documentation

## Model Loading Example

```csharp
static MainDiagnosisLocalModel()
{
    var modelPath = Path.Combine(
        AppContext.BaseDirectory, 
        "AIModels/Main/MainDiagnosisModel.onnx"
    );
    
    if (File.Exists(modelPath))
    {
        _model = new InferenceSession(modelPath);
    }
}
```

## Notes

- Models are loaded once at application startup (Singleton pattern)
- Model files should NOT be committed to Git (add to .gitignore if large)
- For production, consider model versioning strategy
