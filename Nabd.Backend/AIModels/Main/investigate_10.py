import sys
import os
import json

# Add path to the module
sys.path.append(r'c:\Users\muham\Desktop\Nabd\Back\AIModels\Main')

from predict import DiseasePredictor

script_dir = r'c:\Users\muham\Desktop\Nabd\Back\AIModels\Main'
paths = {
    "model": os.path.join(script_dir, 'best_disease_model.h5'),
    "cols": os.path.join(script_dir, 'symptom_cols.pkl'),
    "le": os.path.join(script_dir, 'label_encoder.pkl'),
    "aliases": os.path.join(script_dir, 'symptom_aliases.json')
}

predictor = DiseasePredictor(paths["model"], paths["cols"], paths["le"], paths["aliases"])

tests = [
    ["fever", "cough", "headache", "sore throat", "nasal congestion"],
    ["anxiety and nervousness", "palpitations", "breathing fast", "chest tightness", "dizziness"],
    ["abdominal pain", "nausea", "vomiting", "diarrhea", "flatulence"],
    ["painful urination", "blood in urine", "frequent urination", "lower abdominal pain"],
    ["headache", "nausea", "dizziness", "sensitivity to light", "vomiting"],
    ["sharp chest pain", "palpitations", "shortness of breath", "chest tightness", "sweating"],
    ["wheezing", "shortness of breath", "cough", "chest tightness", "difficulty breathing"],
    ["acne or pimples", "skin lesion", "abnormal appearing skin", "itching of skin"],
    ["eye redness", "lacrimation", "itchiness of eye", "pain in eye", "white discharge from eye"],
    ["ear pain", "diminished hearing", "fluid in ear", "fever", "itching of ear"]
]

for i, test in enumerate(tests):
    res = predictor.predict(test)
    print(f"CASE {i+1}: {test}")
    if "error" in res:
        print(f"  ERROR: {res['error']}")
    else:
        print(f"  RESULT: {res['disease']} ({res['confidence']}%)")
        print(f"  MATCHED: {res.get('matched_symptoms', [])}")
    print("-" * 50)
