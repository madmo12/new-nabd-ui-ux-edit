# 🚀 Production Deployment Guide - AI Model

## 📋 Pre-Deployment Checklist

### 1. Python Environment Setup

**Option A: System-wide Python (Simple)**
```bash
# Install Python 3.8+ on server
python --version  # Verify

# Install dependencies globally
pip install tensorflow numpy
```

**Option B: Virtual Environment (Recommended)**
```bash
# Create virtual environment
cd /path/to/Back/AIModels/Main
python -m venv venv

# Activate (Linux/Mac)
source venv/bin/activate

# Activate (Windows)
.\venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt
```

**Option C: Docker (Best for Production)**
```dockerfile
# In your Dockerfile
FROM mcr.microsoft.com/dotnet/aspnet:8.0

# Install Python
RUN apt-get update && apt-get install -y python3 python3-pip

# Copy AI model files
COPY AIModels /app/AIModels

# Install Python dependencies
RUN pip3 install -r /app/AIModels/Main/requirements.txt

# Copy .NET app
COPY src/Nabd.API/bin/Release/net8.0/publish/ /app

WORKDIR /app
ENTRYPOINT ["dotnet", "Nabd.API.dll"]
```

### 2. Configuration

**Update `appsettings.Production.json`** (Optional):
```json
{
  "AI": {
    "PythonExecutable": "python3",  // or full path
    "ModelTimeout": 30,
    "EnableFallback": true
  }
}
```

**Update `MainDiagnosisLocalModel.cs`** (if needed):
```csharp
// Line 22 - Change Python executable
_pythonExecutable = configuration["AI:PythonExecutable"] ?? "python3";
```

### 3. File Permissions

```bash
# Ensure Python script is executable
chmod +x /path/to/AIModels/Main/predict.py

# Ensure model files are readable
chmod 644 /path/to/AIModels/Main/*.h5
chmod 644 /path/to/AIModels/Main/*.pkl
```

### 4. Testing Before Deployment

```bash
# Test Python script
cd AIModels/Main
python test_setup.py

# Expected output: All tests passed

# Test .NET app
cd ../../src/Nabd.API
dotnet run --environment Production

# Test health check
curl https://localhost:7001/api/doctor/diagnosis/health
```

---

## 🌐 Deployment Scenarios

### Scenario 1: Windows Server (IIS)

1. **Install Python on Server**
   - Download from python.org
   - Add to PATH

2. **Install Dependencies**
   ```cmd
   cd C:\inetpub\wwwroot\YourApp\AIModels\Main
   pip install -r requirements.txt
   ```

3. **Configure IIS**
   - Ensure App Pool has access to Python
   - Set environment variables if needed

4. **Test**
   ```cmd
   python predict.py "[\"fever\"]"
   ```

### Scenario 2: Linux Server (Nginx + Kestrel)

1. **Install Python**
   ```bash
   sudo apt update
   sudo apt install python3 python3-pip
   ```

2. **Install Dependencies**
   ```bash
   cd /var/www/nabd/AIModels/Main
   pip3 install -r requirements.txt
   ```

3. **Configure Systemd Service**
   ```ini
   [Service]
   Environment="PATH=/usr/bin:/usr/local/bin"
   WorkingDirectory=/var/www/nabd
   ExecStart=/usr/bin/dotnet /var/www/nabd/Nabd.API.dll
   ```

4. **Test**
   ```bash
   python3 predict.py "[\"fever\"]"
   ```

### Scenario 3: Docker Container

**Dockerfile**:
```dockerfile
FROM mcr.microsoft.com/dotnet/aspnet:8.0

# Install Python
RUN apt-get update && \
    apt-get install -y python3 python3-pip && \
    rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /app

# Copy AI models
COPY AIModels ./AIModels

# Install Python dependencies
RUN pip3 install --no-cache-dir -r AIModels/Main/requirements.txt

# Copy .NET app
COPY src/Nabd.API/bin/Release/net8.0/publish/ .

# Expose port
EXPOSE 80

# Run app
ENTRYPOINT ["dotnet", "Nabd.API.dll"]
```

**Build & Run**:
```bash
docker build -t nabd-api .
docker run -p 8080:80 nabd-api
```

### Scenario 4: Azure App Service

1. **Enable Python Extension**
   - In Azure Portal → App Service → Extensions
   - Add Python 3.x extension

2. **Configure Application Settings**
   ```
   AI__PythonExecutable = python3
   ```

3. **Deploy via GitHub Actions**
   ```yaml
   - name: Install Python dependencies
     run: |
       cd AIModels/Main
       pip install -r requirements.txt --target .
   ```

---

## 🔧 Performance Optimization

### 1. Use Python Virtual Environment

**Benefits**:
- Isolated dependencies
- Faster startup
- Better security

**Setup**:
```bash
cd AIModels/Main
python -m venv venv
source venv/bin/activate  # Linux/Mac
pip install -r requirements.txt
```

**Update C# code**:
```csharp
_pythonExecutable = "/path/to/venv/bin/python";
```

### 2. Pre-warm Model (Optional)

Add to `Program.cs`:
```csharp
// After app.Build()
using (var scope = app.Services.CreateScope())
{
    var model = scope.ServiceProvider.GetRequiredService<IMainDiagnosisModel>();
    await model.DiagnoseAsync(new List<string> { "test" }); // Warm-up call
}
```

### 3. Monitor Performance

**Add Application Insights** (Azure):
```csharp
_logger.LogMetric("AI_Inference_Duration", stopwatch.ElapsedMilliseconds);
```

**Add Custom Metrics**:
```csharp
public async Task<string> DiagnoseAsync(List<string> normalizedSymptoms)
{
    var stopwatch = Stopwatch.StartNew();
    try
    {
        // ... existing code ...
    }
    finally
    {
        stopwatch.Stop();
        _logger.LogInformation("AI inference took {Duration}ms", stopwatch.ElapsedMilliseconds);
    }
}
```

---

## 🛡️ Security Considerations

### 1. Restrict Python Execution

**Validate Input**:
```csharp
// Add to DiagnoseAsync
if (normalizedSymptoms.Any(s => s.Contains(";")))
{
    throw new ArgumentException("Invalid symptom format");
}
```

### 2. Limit Resource Usage

**Add Process Limits**:
```csharp
processStartInfo.Environment["PYTHONMALLOC"] = "malloc_debug";
// Set memory limit (Linux)
processStartInfo.Environment["RLIMIT_AS"] = "1073741824"; // 1GB
```

### 3. Secure Model Files

```bash
# Set restrictive permissions
chmod 400 AIModels/Main/*.h5
chmod 400 AIModels/Main/*.pkl
```

---

## 📊 Monitoring & Logging

### 1. Enable Detailed Logging

**appsettings.Production.json**:
```json
{
  "Logging": {
    "LogLevel": {
      "Nabd.Application.AI": "Information",
      "Default": "Warning"
    }
  }
}
```

### 2. Track Metrics

**Key Metrics to Monitor**:
- AI inference duration
- Python process failures
- Timeout occurrences
- Fallback usage rate

### 3. Set Up Alerts

**Example (Azure)**:
```
Alert if: AI_Inference_Duration > 5000ms
Alert if: Python_Process_Failures > 10/hour
```

---

## 🔄 Rollback Plan

### If AI Integration Fails

1. **Disable AI Feature** (Quick fix):
   ```csharp
   // In DiagnosisService.cs
   public async Task<DiagnosisResponseDto> ProcessDiagnosisAsync(...)
   {
       // Skip AI, return manual evaluation message
       return new DiagnosisResponseDto { ... };
   }
   ```

2. **Use Fallback Always**:
   ```csharp
   // In MainDiagnosisLocalModel.cs
   public async Task<string> DiagnoseAsync(...)
   {
       return "Manual evaluation required";
   }
   ```

---

## ✅ Post-Deployment Verification

### 1. Health Check
```bash
curl https://your-domain.com/api/doctor/diagnosis/health
```

**Expected**:
```json
{
  "status": "healthy",
  "aiIntegration": "active-local"
}
```

### 2. Test Diagnosis
```bash
curl -X POST https://your-domain.com/api/doctor/diagnosis \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"patientId":"test","symptomsText":"fever and cough"}'
```

### 3. Check Logs
```bash
# Look for successful AI inference
grep "AI Diagnosis completed" /var/log/nabd/app.log
```

---

## 📞 Troubleshooting

### Issue: Python not found

**Solution**:
```bash
# Find Python path
which python3

# Update code with full path
_pythonExecutable = "/usr/bin/python3";
```

### Issue: TensorFlow import error

**Solution**:
```bash
# Reinstall TensorFlow
pip3 install --upgrade tensorflow
```

### Issue: Permission denied

**Solution**:
```bash
chmod +x AIModels/Main/predict.py
chown www-data:www-data AIModels/Main/*
```

---

## 🎯 Success Criteria

- [ ] Python installed on production server
- [ ] Dependencies installed successfully
- [ ] `test_setup.py` passes all tests
- [ ] Health check returns "active-local"
- [ ] Sample diagnosis request succeeds
- [ ] Logs show successful AI inference
- [ ] No timeout errors in 24 hours
- [ ] Fallback rate < 5%

---

**Deployment Status**: Ready for Production  
**Last Updated**: 2026-01-08  
**Recommended**: Docker deployment for best results
