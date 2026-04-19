# 🎯 خطة الموديل الوسيط - Gemini API Integration

## 📋 الفكرة

استخدام **Gemini API** للـ NLP (تحويل العربي → أعراض) فقط، والتشخيص النهائي من **الموديل المحلي**.

---

## 🏗️ المعمارية

```
┌─────────────────────────────────────────────────────────┐
│  User Input (Arabic)                                    │
│  "المريض عنده سخونية وكحة وصداع"                       │
└────────────────────┬────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────┐
│  Gemini API (Intermediate Model)                        │
│  - يفهم العربي                                          │
│  - يستخرج الأعراض                                       │
│  - يحولها لمصطلحات طبية إنجليزية                       │
└────────────────────┬────────────────────────────────────┘
                     │
                     ▼
         ["fever", "cough", "headache"]
                     │
                     ▼
┌─────────────────────────────────────────────────────────┐
│  Main Model (Local TensorFlow)                          │
│  - يستقبل الأعراض المنظمة                               │
│  - يعمل التشخيص                                         │
│  - يرجع اسم المرض                                       │
└────────────────────┬────────────────────────────────────┘
                     │
                     ▼
              "Influenza"
                     │
                     ▼
┌─────────────────────────────────────────────────────────┐
│  Doctor Dashboard                                       │
│  - يعرض التشخيص                                         │
│  - يعرض الأعراض المستخرجة                               │
│  - يعرض مستوى الثقة                                     │
└─────────────────────────────────────────────────────────┘
```

---

## ✅ المميزات

### 1️⃣ **دقة عالية**
- ✅ Gemini ممتاز في فهم العربي
- ✅ موديلك يضمن التشخيص الطبي

### 2️⃣ **تكلفة منخفضة**
- ✅ Gemini API رخيص جدًا
- ✅ مش محتاج تدرب موديل NLP

### 3️⃣ **سهولة التنفيذ**
- ✅ Prompt engineering بسيط
- ✅ Integration سريع

### 4️⃣ **Fallback آمن**
- ✅ لو Gemini فشل → keyword extraction بسيط
- ✅ النظام مش هيتعطل

---

## 🔧 التنفيذ

### **الملفات المطلوبة**

1. ✅ **`GeminiService.cs`** - تم إنشاؤه
   - يستدعي Gemini API
   - يحول العربي → JSON symptoms
   - Fallback للـ keyword extraction

2. ⏳ **تحديث `DiagnosisService.cs`**
   - استبدال placeholder بـ Gemini
   - استدعاء `_geminiService.NormalizeArabicSymptomsAsync()`

3. ⏳ **Dependency Injection**
   - تسجيل `IGeminiService` في `ServiceExtensions.cs`

4. ⏳ **Configuration**
   - إضافة Gemini API Key في `appsettings.json`

---

## 📝 الكود المطلوب

### **1. appsettings.json**

```json
{
  "Gemini": {
    "ApiKey": "YOUR_GEMINI_API_KEY_HERE"
  }
}
```

### **2. ServiceExtensions.cs**

```csharp
// في AddApplicationServices()
services.AddHttpClient<IGeminiService, GeminiService>();
```

### **3. DiagnosisService.cs**

```csharp
private readonly IGeminiService _geminiService;

public DiagnosisService(
    ILogger<DiagnosisService> logger,
    IMainDiagnosisModel mainDiagnosisModel,
    IGeminiService geminiService) // إضافة
{
    _logger = logger;
    _mainDiagnosisModel = mainDiagnosisModel;
    _geminiService = geminiService; // إضافة
}

private async Task<List<string>> NormalizeSymptomsAsync(string symptomsText)
{
    _logger.LogInformation("Normalizing symptoms using Gemini API");
    
    // Get available symptoms from model (optional optimization)
    // var availableSymptoms = await GetAvailableSymptomsAsync();
    
    // Call Gemini API
    var symptomsJson = await _geminiService.NormalizeArabicSymptomsAsync(
        symptomsText, 
        new List<string>() // or availableSymptoms
    );
    
    // Parse JSON
    var symptoms = JsonSerializer.Deserialize<List<string>>(symptomsJson);
    
    _logger.LogInformation("Extracted {Count} symptoms", symptoms.Count);
    
    return symptoms ?? new List<string>();
}
```

---

## 💰 التكلفة

### **Gemini API Pricing** (تقريبي)

| الاستخدام | التكلفة |
|-----------|---------|
| 1000 request | ~$0.01 - $0.05 |
| 10,000 request | ~$0.10 - $0.50 |
| 100,000 request | ~$1 - $5 |

**مثال**:
- لو عندك 100 تشخيص يوميًا
- التكلفة الشهرية: ~$0.15 - $0.75
- **رخيص جدًا!** 💰

---

## 🧪 الاختبار

### **Test Case 1: عربي**
```
Input: "المريض عنده سخونية وكحة وصداع"
Gemini → ["fever", "cough", "headache"]
Local Model → "Influenza"
```

### **Test Case 2: عربي عامية**
```
Input: "عندي سخونة ووجع في راسي وكحة"
Gemini → ["fever", "headache", "cough"]
Local Model → "Upper Respiratory Infection"
```

### **Test Case 3: Fallback**
```
Input: "سخونية وكحة" (لو Gemini فشل)
Fallback → ["fever", "cough"]
Local Model → "Common Cold"
```

---

## 🚀 خطوات التنفيذ

### **Phase 1: Setup** (15 دقيقة)
1. ✅ إنشاء `GeminiService.cs` - تم
2. ⏳ الحصول على Gemini API Key
3. ⏳ إضافة API Key في `appsettings.json`
4. ⏳ تسجيل Service في DI

### **Phase 2: Integration** (30 دقيقة)
1. ⏳ تحديث `DiagnosisService.cs`
2. ⏳ اختبار Gemini API
3. ⏳ اختبار End-to-End

### **Phase 3: Optimization** (اختياري)
1. ⏳ Cache للأعراض المتاحة
2. ⏳ Retry logic للـ API
3. ⏳ Rate limiting

---

## 📊 المقارنة

| الخيار | المميزات | العيوب |
|--------|----------|--------|
| **Gemini API** | ✅ سريع<br>✅ رخيص<br>✅ دقيق | ⚠️ يحتاج إنترنت |
| **Local NLP Model** | ✅ بدون إنترنت<br>✅ خصوصية | ❌ صعب التدريب<br>❌ يحتاج وقت |
| **Keyword Extraction** | ✅ بسيط<br>✅ سريع | ❌ دقة منخفضة |

**التوصية**: ✅ **Gemini API** (أفضل حل)

---

## 🔮 المستقبل

### **Phase 4: تحسينات** (لاحقًا)
1. Fine-tune Gemini prompt
2. إضافة validation للأعراض
3. Multi-language support
4. Confidence scoring

---

## ✅ الخلاصة

**الحل المقترح**:
```
Arabic Text → [Gemini API] → Symptoms → [Local Model] → Disease
```

**المميزات**:
- ✅ Gemini للـ NLP فقط (رخيص)
- ✅ الموديل المحلي للتشخيص (دقيق)
- ✅ Fallback آمن
- ✅ سهل التنفيذ

**التكلفة**: ~$0.15 - $0.75 شهريًا

**الوقت**: ~1 ساعة للتنفيذ الكامل

---

**🎯 جاهز للتنفيذ!**
