#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Nabd AI Diagnosis Engine
Persistent process that reads JSON from stdin, returns diagnosis as JSON to stdout.
Supports TensorFlow model if available, falls back to rule-based engine.
"""

import sys
import json
import os

# ─────────────────────────────────────────────
# Arabic / English symptom keyword map → disease evidence codes
# ─────────────────────────────────────────────
ARABIC_SYMPTOM_MAP = {
    # headache
    "صداع": "headache", "وجع في الراس": "headache", "ألم في الرأس": "headache",
    "الرأس بيوجع": "headache", "وجع راس": "headache",
    # fever
    "حمى": "fever", "حرارة": "fever", "ارتفاع حرارة": "fever",
    "سخونة": "fever", "ارتفاع درجة الحرارة": "fever",
    # cough
    "سعال": "cough", "كحة": "cough", "كحه": "cough",
    # nausea
    "غثيان": "nausea", "دوخة": "nausea",
    # vomiting
    "قيء": "vomiting", "تقيؤ": "vomiting",
    # fatigue
    "إرهاق": "fatigue", "تعب": "fatigue", "إعياء": "fatigue",
    "ارهاق شديد": "fatigue", "ارهاق": "fatigue",
    # chest pain
    "ألم بالصدر": "chest_pain", "ألم في الصدر": "chest_pain",
    "وجع صدر": "chest_pain", "ضغط في الصدر": "chest_pain",
    # shortness of breath
    "ضيق تنفس": "breathlessness", "ضيق في التنفس": "breathlessness",
    "صعوبة في التنفس": "breathlessness", "لهاثة": "breathlessness",
    # diarrhea
    "إسهال": "diarrhoea", "اسهال": "diarrhoea",
    # abdominal pain
    "ألم في البطن": "abdominal_pain", "وجع بطن": "abdominal_pain",
    "مغص": "abdominal_pain", "مغص شديد": "abdominal_pain",
    # back pain
    "ألم في الظهر": "back_pain", "وجع ظهر": "back_pain",
    # joint pain
    "ألم في المفاصل": "joint_pain", "آلام مفاصل": "joint_pain",
    # skin rash
    "طفح جلدي": "skin_rash", "حكة": "itching", "حكه": "itching",
    # dizziness
    "دوار": "dizziness", "دوخة": "dizziness",
    # weight loss
    "فقدان وزن": "weight_loss", "نقص الوزن": "weight_loss",
    # high bp
    "ضغط دم مرتفع": "high_blood_pressure", "ارتفاع ضغط الدم": "high_blood_pressure",
    # diabetes
    "سكر": "high_blood_sugar",
    # weakness
    "ضعف": "weakness", "وهن": "weakness",
    # swelling
    "تورم": "swelling", "انتفاخ": "swelling",
    # loss of appetite
    "فقدان الشهية": "loss_of_appetite", "مش قادر ياكل": "loss_of_appetite",
    # throat pain
    "ألم في الحلق": "throat_irritation", "التهاب حلق": "throat_irritation",
    # runny nose
    "رشح": "runny_nose", "رشح انف": "runny_nose",
    # muscle pain
    "آلام عضلية": "muscle_pain", "ألم في العضلات": "muscle_pain",
    # constipation
    "إمساك": "constipation",
    # palpitations
    "خفقان": "palpitations", "ضربات قلب سريعة": "palpitations",
    # infection signs
    "التهاب": "inflammation",
    # yellow skin
    "اصفرار": "yellowing_of_skin", "يرقان": "yellowing_of_skin",
}

# ─────────────────────────────────────────────────────────────────────────
# Medical knowledge base: symptom → top diseases (rule-based fallback)
# ─────────────────────────────────────────────────────────────────────────
DISEASE_DB = {
    "Common Cold": {
        "name_ar": "نزلة برد",
        "symptoms": {"runny_nose", "cough", "fever", "throat_irritation", "fatigue"},
        "description_ar": "التهاب فيروسي يصيب الجهاز التنفسي العلوي وهو شائع جداً.",
        "precautions_ar": [
            "الراحة التامة وشرب السوائل بكثرة",
            "تناول مسكنات الألم والخافضة للحرارة إذا لزم",
            "تجنب التعرض للبرد الشديد",
        ],
    },
    "Influenza": {
        "name_ar": "إنفلونزا",
        "symptoms": {"fever", "cough", "fatigue", "muscle_pain", "headache", "throat_irritation"},
        "description_ar": "عدوى فيروسية معدية تصيب الجهاز التنفسي بأعراض حادة.",
        "precautions_ar": [
            "الراحة في الفراش وشرب السوائل الدافئة",
            "مضادات الفيروسات في الحالات الشديدة",
            "اللقاح السنوي للوقاية",
        ],
    },
    "Pneumonia": {
        "name_ar": "التهاب الرئة",
        "symptoms": {"cough", "fever", "breathlessness", "chest_pain", "fatigue"},
        "description_ar": "التهاب يصيب أنسجة الرئة ويمكن أن يكون بكتيرياً أو فيروسياً.",
        "precautions_ar": [
            "المضادات الحيوية حسب وصف الطبيب",
            "الراحة التامة وشرب السوائل",
            "الفحص الإشعاعي للصدر",
        ],
    },
    "Hypertension": {
        "name_ar": "ارتفاع ضغط الدم",
        "symptoms": {"headache", "dizziness", "palpitations", "breathlessness", "high_blood_pressure"},
        "description_ar": "ارتفاع مزمن في ضغط الدم يزيد خطر الإصابة بأمراض القلب والسكتة الدماغية.",
        "precautions_ar": [
            "قياس الضغط بانتظام",
            "تقليل الملح في الطعام",
            "ممارسة الرياضة بانتظام",
            "تناول الأدوية حسب وصف الطبيب",
        ],
    },
    "Diabetes": {
        "name_ar": "مرض السكري",
        "symptoms": {"high_blood_sugar", "fatigue", "weakness", "weight_loss", "dizziness"},
        "description_ar": "اضطراب أيضي يتميز بارتفاع مستوى السكر في الدم.",
        "precautions_ar": [
            "قياس السكر بانتظام",
            "الالتزام بنظام غذائي صحي",
            "ممارسة الرياضة",
            "تناول الدواء حسب وصف الطبيب",
        ],
    },
    "Migraine": {
        "name_ar": "الصداع النصفي",
        "symptoms": {"headache", "nausea", "dizziness", "fatigue"},
        "description_ar": "صداع نبضي شديد يصيب جانباً واحداً من الرأس وقد يصاحبه غثيان وحساسية للضوء.",
        "precautions_ar": [
            "الراحة في غرفة هادئة ومظلمة",
            "مسكنات الألم عند البداية",
            "تجنب محفزات الصداع",
        ],
    },
    "Gastroenteritis": {
        "name_ar": "التهاب المعدة والأمعاء",
        "symptoms": {"nausea", "vomiting", "diarrhoea", "abdominal_pain", "fever"},
        "description_ar": "التهاب في الجهاز الهضمي يسبب إسهالاً وقيئاً وألماً في البطن.",
        "precautions_ar": [
            "شرب السوائل لتعويض الجفاف",
            "الغذاء الخفيف وتجنب الدهون",
            "عزل المريض لمنع العدوى",
        ],
    },
    "Asthma": {
        "name_ar": "الربو",
        "symptoms": {"breathlessness", "cough", "chest_pain", "fatigue"},
        "description_ar": "مرض مزمن يضيق فيه مجرى الهواء في الرئتين مسبباً صعوبة في التنفس والسعال.",
        "precautions_ar": [
            "استخدام البخاخات حسب وصف الطبيب",
            "تجنب المثيرات كالغبار والدخان",
            "خطة طوارئ للنوبات الحادة",
        ],
    },
    "Anemia": {
        "name_ar": "فقر الدم",
        "symptoms": {"fatigue", "weakness", "dizziness", "palpitations", "breathlessness"},
        "description_ar": "نقص في عدد كريات الدم الحمراء أو الهيموغلوبين مما يؤدي لضعف نقل الأكسجين.",
        "precautions_ar": [
            "تناول الحديد ومكملات الفيتامينات",
            "اتباع نظام غذائي غني بالحديد",
            "فحص دم شامل",
        ],
    },
    "Arthritis": {
        "name_ar": "التهاب المفاصل",
        "symptoms": {"joint_pain", "swelling", "weakness", "fatigue"},
        "description_ar": "التهاب في المفاصل يسبب آلاماً وتورماً يصعب معه الحركة.",
        "precautions_ar": [
            "الأدوية المضادة للالتهاب",
            "العلاج الطبيعي والتمارين المناسبة",
            "تجنب الأحمال الثقيلة",
        ],
    },
    "Appendicitis": {
        "name_ar": "التهاب الزائدة الدودية",
        "symptoms": {"abdominal_pain", "fever", "nausea", "vomiting", "loss_of_appetite"},
        "description_ar": "التهاب حاد في الزائدة الدودية يستلزم التدخل الجراحي العاجل.",
        "precautions_ar": [
            "التوجه للطوارئ فوراً",
            "التدخل الجراحي هو العلاج الأساسي",
            "لا تتناول مسكنات قبل رؤية الطبيب",
        ],
    },
    "Jaundice": {
        "name_ar": "اليرقان",
        "symptoms": {"yellowing_of_skin", "fatigue", "abdominal_pain", "loss_of_appetite"},
        "description_ar": "اصفرار الجلد والعينين ناتج عن ارتفاع مستوى البيليروبين في الدم.",
        "precautions_ar": [
            "فحوصات وظائف الكبد",
            "الراحة وشرب السوائل",
            "تجنب الكحول والأطعمة الدهنية",
        ],
    },
    "Skin Allergy": {
        "name_ar": "حساسية الجلد",
        "symptoms": {"itching", "skin_rash", "swelling", "inflammation"},
        "description_ar": "رد فعل تحسسي يظهر على الجلد في شكل حكة وطفح جلدي.",
        "precautions_ar": [
            "تحديد مسبب الحساسية وتجنبه",
            "مضادات الهيستامين",
            "الكريمات الموضعية للتهدئة",
        ],
    },
}


def map_symptoms_to_english(raw_symptoms):
    """
    Map Arabic or free-text symptoms to canonical English keys.
    """
    mapped = set()
    for s in raw_symptoms:
        s_lower = s.strip().lower()
        # Direct Arabic lookup
        for ar_key, eng_key in ARABIC_SYMPTOM_MAP.items():
            if ar_key in s or s in ar_key:
                mapped.add(eng_key)
                break
        else:
            # Accept as-is if already English-like
            if s_lower:
                mapped.add(s_lower.replace(" ", "_"))
    return list(mapped)


def rule_based_diagnose(english_symptoms, age=30, sex="M"):
    """
    Rule-based diagnosis: score each disease by symptom overlap.
    """
    symptom_set = set(english_symptoms)
    scores = []

    for disease, info in DISEASE_DB.items():
        db_symptoms = info["symptoms"]
        if not db_symptoms:
            continue
        overlap = len(symptom_set & db_symptoms)
        if overlap == 0:
            continue
        # Jaccard-like score, weighted by how many symptoms match
        score = (overlap / len(db_symptoms)) * 100.0
        # Bonus: more symptoms from user matched = higher confidence
        bonus = min(overlap * 5, 20)
        confidence = min(score + bonus, 97.0)
        scores.append((disease, confidence, info))

    # Sort descending
    scores.sort(key=lambda x: x[1], reverse=True)

    if not scores:
        # Fallback
        scores = [("Unknown", 10.0, {
            "name_ar": "غير محدد",
            "description_ar": "لم يتم التعرف على الأعراض بشكل كافٍ. يرجى وصف الأعراض بشكل أكثر تفصيلاً.",
            "precautions_ar": ["استشارة طبيب متخصص", "إجراء الفحوصات الطبية اللازمة"]
        })]

    top = scores[:5]
    results = []
    for disease, conf, info in top:
        results.append({
            "disease": disease,
            "confidence": round(conf, 1),
            "name_ar": info.get("name_ar", disease),
            "description_ar": info.get("description_ar", ""),
            "precautions_ar": info.get("precautions_ar", []),
        })
    return results


def try_load_tensorflow_model():
    """
    Try to load TensorFlow/Keras model if it exists.
    Returns model or None.
    """
    try:
        model_path = os.path.join(os.path.dirname(__file__), "model.h5")
        if not os.path.exists(model_path):
            return None, None
        import tensorflow as tf
        import numpy as np
        model = tf.keras.models.load_model(model_path)
        # Try loading symptom columns
        cols_path = os.path.join(os.path.dirname(__file__), "symptom_cols.json")
        if os.path.exists(cols_path):
            with open(cols_path, "r") as f:
                cols = json.load(f)
        else:
            cols = None
        return model, cols
    except Exception as e:
        sys.stderr.write(f"TF model load failed: {e}\n")
        return None, None


def main():
    # Fix Windows encoding for Arabic characters
    if sys.platform == "win32":
        import io
        sys.stdin  = io.TextIOWrapper(sys.stdin.buffer,  encoding="utf-8", errors="replace")
        sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8", errors="replace")
        sys.stderr = io.TextIOWrapper(sys.stderr.buffer, encoding="utf-8", errors="replace")

    sys.stderr.write("Starting Nabd AI Diagnosis Engine...\n")
    sys.stderr.flush()

    # Try TF model
    tf_model, symptom_cols = try_load_tensorflow_model()
    if tf_model:
        sys.stderr.write("TensorFlow model loaded successfully.\n")
    else:
        sys.stderr.write("No TF model found, using rule-based engine.\n")

    # Signal ready
    sys.stdout.write("READY\n")
    sys.stdout.flush()

    while True:
        try:
            line = sys.stdin.readline()
            if not line:
                break
            line = line.strip()
            if not line:
                continue
            if line.upper() == "EXIT":
                break

            # Parse request
            request = json.loads(line)
            raw_symptoms = request.get("evidence_codes", [])
            age = request.get("age", 30)
            sex = request.get("sex", "M")

            # Map to English canonical names
            english_symptoms = map_symptoms_to_english(raw_symptoms)

            if tf_model and symptom_cols:
                # ───── TF Model path ─────
                try:
                    import numpy as np
                    input_vec = [1 if col in english_symptoms else 0 for col in symptom_cols]
                    input_array = np.array([input_vec], dtype=np.float32)
                    predictions = tf_model.predict(input_array, verbose=0)[0]
                    # Build top results from predictions
                    # Assumes last layer = softmax over diseases
                    disease_names = list(DISEASE_DB.keys())
                    indexed = sorted(enumerate(predictions), key=lambda x: x[1], reverse=True)[:5]
                    results = []
                    for idx, conf in indexed:
                        disease = disease_names[idx] if idx < len(disease_names) else f"Disease_{idx}"
                        info = DISEASE_DB.get(disease, {})
                        results.append({
                            "disease": disease,
                            "confidence": round(float(conf) * 100, 1),
                            "name_ar": info.get("name_ar", disease),
                            "description_ar": info.get("description_ar", ""),
                            "precautions_ar": info.get("precautions_ar", []),
                        })
                    output = {"top_results": results}
                except Exception as tf_err:
                    sys.stderr.write(f"TF inference error: {tf_err}\n")
                    results = rule_based_diagnose(english_symptoms, age, sex)
                    output = {"top_results": results}
            else:
                # ───── Rule-based path ─────
                results = rule_based_diagnose(english_symptoms, age, sex)
                output = {"top_results": results}

            sys.stdout.write(json.dumps(output, ensure_ascii=False) + "\n")
            sys.stdout.flush()

        except json.JSONDecodeError as e:
            error_out = {"error": f"Invalid JSON: {e}"}
            sys.stdout.write(json.dumps(error_out) + "\n")
            sys.stdout.flush()
        except Exception as e:
            error_out = {"error": str(e)}
            sys.stdout.write(json.dumps(error_out) + "\n")
            sys.stdout.flush()


if __name__ == "__main__":
    main()
