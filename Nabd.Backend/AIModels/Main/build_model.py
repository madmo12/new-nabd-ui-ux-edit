#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Build Model Script
==================
Generates medical_model.pkl, evidences_map.pkl, symptoms_features.pkl
from the available data files in this directory.

Run: python build_model.py
"""

import os, sys, json, warnings
import numpy as np
warnings.filterwarnings('ignore')

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))

print("[1/5] Loading symptom_to_ecode.json ...")
with open(os.path.join(SCRIPT_DIR, 'symptom_to_ecode.json'), 'r', encoding='utf-8') as f:
    symptom_map = json.load(f)

print("[2/5] Loading golden_symptoms.txt ...")
with open(os.path.join(SCRIPT_DIR, 'golden_symptoms.txt'), 'r', encoding='utf-8') as f:
    golden = [line.strip() for line in f if line.strip()]

print("[3/5] Building disease<->symptom knowledge ...")

# Disease symptom groups - comprehensive medical knowledge
DISEASE_SYMPTOMS = {
    "URTI":              ["cough","nasal congestion","sore throat","fever","headache","fatigue","sneezing"],
    "Influenza":         ["fever","cough","muscle pain","headache","fatigue","chills","sore throat","nasal congestion"],
    "Pneumonia":         ["cough","fever","shortness of breath","chest tightness","fatigue","pus in sputum"],
    "Bronchitis":        ["cough","pus in sputum","chest tightness","fatigue","fever","wheezing"],
    "Bronchiectasis":    ["cough","pus in sputum","hemoptysis","shortness of breath","fatigue"],
    "Asthma":            ["wheezing","shortness of breath","chest tightness","cough","difficulty breathing"],
    "Anemia":            ["fatigue","weakness","pallor","dizziness","palpitations","shortness of breath"],
    "Migraine":          ["headache","nausea","dizziness","vomiting","fatigue"],
    "Atrial fibrillation":["palpitations","irregular heartbeat","shortness of breath","fatigue","dizziness","fainting"],
    "GERD":              ["heartburn","burning chest pain","regurgitation","nausea","stomach bloating"],
    "Stable angina":     ["chest tightness","shortness of breath","fatigue","dizziness"],
    "Unstable angina":   ["sharp chest pain","shortness of breath","sweating","nausea","dizziness"],
    "Possible NSTEMI / STEMI": ["sharp chest pain","shortness of breath","sweating","vomiting","palpitations","jaw swelling"],
    "Pericarditis":      ["sharp chest pain","fever","chills","fatigue","shortness of breath"],
    "Myocarditis":       ["chest tightness","shortness of breath","fatigue","fever","palpitations"],
    "Panic attack":      ["palpitations","shortness of breath","dizziness","chills","sweating","anxiety and nervousness"],
    "SLE":               ["joint pain","joint stiffness or tightness","fatigue","fever","skin rash","pallor"],
    "Acute otitis media":["ear pain","fever","hearing loss","fluid in ear","irritable infant"],
    "Viral pharyngitis": ["sore throat","fever","headache","fatigue","cough","nasal congestion"],
    "Chronic rhinosinusitis":["nasal congestion","sinus congestion","painful sinuses","headache","cough","drainage in throat"],
    "Allergic sinusitis":["nasal congestion","sneezing","itchiness of eye","eye redness","sinus congestion"],
    "Cluster headache":  ["headache","eye redness","lacrimation","nasal congestion","facial pain"],
    "Tuberculosis":      ["cough","hemoptysis","fever","night sweats","recent weight loss","fatigue"],
    "Anaphylaxis":       ["shortness of breath","skin rash","allergic reaction","swollen tongue","throat swelling"],
    "Guillain-Barré syndrome": ["weakness","focal weakness","leg pain","back weakness","difficulty breathing"],
    "Localized edema":   ["skin swelling","leg swelling","ankle swelling","peripheral edema","fluid retention"],
    "Pulmonary embolism":["shortness of breath","chest tightness","hemoptysis","leg swelling","leg pain"],
    "Pancreatic neoplasm":["upper abdominal pain","recent weight loss","jaundice","decreased appetite","fatigue"],
    "Bronchospasm / acute asthma exacerbation":["wheezing","shortness of breath","chest tightness","cough","difficulty breathing"],
    "Whooping cough":    ["cough","fever","chills","vomiting","nausea"],
    "Epiglottitis":      ["sore throat","difficulty in swallowing","fever","hoarse voice","shortness of breath"],
    "HIV (initial infection)":["fever","fatigue","sore throat","skin rash","swollen lymph nodes"],
    "Spontaneous pneumothorax":["sharp chest pain","shortness of breath","hurts to breath"],
    "Myasthenia gravis": ["weakness","focal weakness","difficulty in swallowing","difficulty speaking","fatigue"],
}

# Map symptom names to E-codes using symptom_to_ecode
print("[4/5] Building feature vector and training model ...")

# Collect all unique E-codes used
all_ecodes = set()
disease_vectors = {}

for disease, syms in DISEASE_SYMPTOMS.items():
    ecodes = set()
    for sym in syms:
        # Direct lookup
        if sym in symptom_map:
            ecodes.add(symptom_map[sym])
        else:
            # Fuzzy match
            for q, e in symptom_map.items():
                if sym.lower() in q.lower() or q.lower() in sym.lower():
                    ecodes.add(e)
                    break
    disease_vectors[disease] = list(ecodes)
    all_ecodes.update(ecodes)

all_ecodes = sorted(list(all_ecodes))
features = all_ecodes + ["AGE", "SEX"]

# Build training data
X, y = [], []
np.random.seed(42)

for disease, ecodes in disease_vectors.items():
    # Generate 200 synthetic samples per disease
    for _ in range(200):
        vec = np.zeros(len(features))
        
        # Set E-codes (with some noise)
        for e in ecodes:
            if e in features:
                if np.random.random() > 0.15:  # 85% chance to include each symptom
                    vec[features.index(e)] = 1
        
        # Add 1-2 random symptoms for noise
        n_noise = np.random.randint(0, 3)
        for _ in range(n_noise):
            rand_idx = np.random.randint(0, len(all_ecodes))
            vec[rand_idx] = 1
        
        # Set AGE and SEX
        vec[features.index("AGE")] = np.random.uniform(20, 70)
        vec[features.index("SEX")] = np.random.choice([0, 1])
        
        X.append(vec)
        y.append(disease)

X = np.array(X)
y = np.array(y)

from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import LabelEncoder
import joblib

clf = RandomForestClassifier(n_estimators=100, max_depth=20, random_state=42, n_jobs=-1)
clf.fit(X, y)

# Save files
print("[5/5] Saving .pkl files ...")

joblib.dump(clf, os.path.join(SCRIPT_DIR, 'medical_model.pkl'))
print("  [DONE] medical_model.pkl saved")

# evidences_map.pkl = dict from question text to E-code (same as symptom_to_ecode but as pkl)
joblib.dump(symptom_map, os.path.join(SCRIPT_DIR, 'evidences_map.pkl'))
print("  [DONE] evidences_map.pkl saved")

# symptoms_features.pkl = list of feature names (E-codes + AGE + SEX)
joblib.dump(features, os.path.join(SCRIPT_DIR, 'symptoms_features.pkl'))
print("  [DONE] symptoms_features.pkl saved")

print("\nModel built successfully!")
print(f"   Classes: {len(DISEASE_SYMPTOMS)} diseases")
print(f"   Features: {len(features)} E-codes + AGE + SEX")
print(f"   Training samples: {len(X)}")
