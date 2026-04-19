#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Main Disease Diagnosis Model - Scikit-Learn Inference Script (Optimized)
======================================================================
This script handles the inference for the new RandomForest model.
It supports the persistent READY signal and stdin/stdout JSON interface.
"""

import sys
import os
import json
import joblib
import warnings
import numpy as np
from datetime import datetime

# Hide warnings and TF noise (if any lingers)
warnings.filterwarnings('ignore')
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '3'

# Logging for debug
LOG_FILE = os.path.join(os.path.dirname(os.path.abspath(__file__)), "python_debug.log")
def log_debug(msg):
    with open(LOG_FILE, "a", encoding="utf-8") as f:
        f.write(f"[{datetime.now()}] {msg}\n")

class DiseasePredictor:
    def __init__(self, model_path, map_path, features_path, translation_path, symptom_map_path):
        # 1. Load Model
        self.model = joblib.load(model_path)
        
        # 2. Load Evidence Map
        self.evidence_name_map = joblib.load(map_path)
        
        # 3. Load Feature Order
        self.features = list(joblib.load(features_path)) # List of E_codes
        
        # Ensure AGE and SEX are in the features if not present in pkl
        if "AGE" not in self.features: self.features.append("AGE")
        if "SEX" not in self.features: self.features.append("SEX")
        
        # 4. Load Symptom to E-code map
        self.symptom_to_ecode = {}
        if os.path.exists(symptom_map_path):
            with open(symptom_map_path, 'r', encoding='utf-8') as f:
                self.symptom_to_ecode = json.load(f)
        
        # 5. Load Translations
        self.translations = {}
        if os.path.exists(translation_path):
            with open(translation_path, 'r', encoding='utf-8') as f:
                self.translations = json.load(f)

    def predict(self, input_data):
        # Create input vector (517 features)
        input_vector = np.zeros((1, len(self.features)))
        
        # Handle both list of symptoms or dict with additional info
        if isinstance(input_data, dict):
            # Check for symptoms names or direct evidence codes
            raw_symptoms = input_data.get("symptoms", [])
            evidence_codes = input_data.get("evidence_codes", [])
            age = input_data.get("age", 30)
            
            # Sex mapping (M -> 0, F -> 1)
            sex_val = input_data.get("sex", 0)
            if isinstance(sex_val, str):
                sex = 1 if sex_val.upper() == "F" else 0
            else:
                sex = sex_val
        else:
            raw_symptoms = input_data
            evidence_codes = []
            age = 30
            sex = 0

        # Set AGE and SEX
        if "AGE" in self.features:
            input_vector[0, self.features.index("AGE")] = age
        if "SEX" in self.features:
            input_vector[0, self.features.index("SEX")] = sex

        matched_ecodes = []
        
        # 1. Process direct evidence codes (E_codes)
        for e in evidence_codes:
            if e in self.features:
                matched_ecodes.append(e)
            else:
                # Some codes might be categorical e.g. E_55_@_V_101
                if e in self.features: # (redundant but safe)
                     matched_ecodes.append(e)
                else:
                    # check if it's a valid code even if not in features (for logging)
                    pass

        # 2. Process symptom names (Search/Map)
        for s in raw_symptoms:
            if not s: continue
            s_norm = str(s).strip()
            
            # Check if this single symptom string is actually a JSON object (fallback)
            if s_norm.startswith("{"):
                try:
                    js = json.loads(s_norm)
                    if isinstance(js, list):
                        raw_symptoms.extend(js)
                        continue
                    if isinstance(js, dict):
                        if "evidence_codes" in js: evidence_codes.extend(js["evidence_codes"])
                        if "symptoms" in js: raw_symptoms.extend(js["symptoms"])
                        continue
                except: pass

            # Exact match from schema
            if s_norm in self.symptom_to_ecode:
                matched_ecodes.append(self.symptom_to_ecode[s_norm])
            elif s_norm.startswith("E_") and s_norm in self.features:
                # Direct E-code passed in symptoms list
                matched_ecodes.append(s_norm)
            else:
                # Fallback: Fuzzy search in questions/meanings
                for q, e in self.symptom_to_ecode.items():
                    if s_norm.lower() in q.lower() or q.lower() in s_norm.lower():
                        matched_ecodes.append(e)
                        break
        
        # Remove duplicates
        matched_ecodes = list(set(matched_ecodes))
        
        if not matched_ecodes:
            return {"error": "No recognizable symptoms found", "disease": "Unknown", "confidence": 0}

        # Populate input vector (Multi-hot)
        for ecode in matched_ecodes:
            if ecode in self.features:
                idx = self.features.index(ecode)
                input_vector[0, idx] = 1

        try:
            # Predict probabilities
            probs = self.model.predict_proba(input_vector)[0]
            classes = self.model.classes_
            
            # Get top 3 indices
            top_indices = np.argsort(probs)[-3:][::-1]
            
            top_results = []
            for idx in top_indices:
                conf = float(probs[idx]) * 100
                name_id = classes[idx]
                
                # Get translation info from diseases_ar.json
                trans = self.translations.get(name_id, {})
                
                top_results.append({
                    "disease": name_id,
                    "name_ar": trans.get("name_ar", name_id),
                    "description_ar": trans.get("description_ar", ""),
                    "precautions_ar": trans.get("precautions_ar", []),
                    "confidence": round(conf, 2)
                })

            return {
                "disease": top_results[0]["disease"],
                "name_ar": top_results[0]["name_ar"],
                "confidence": top_results[0]["confidence"],
                "top_results": top_results,
                "matched_count": len(matched_ecodes)
            }
        except Exception as e:
            log_debug(f"INFERENCE ERROR: {str(e)}")
            return {"error": str(e), "disease": "Error", "confidence": 0}

def main():
    # Setup UTF-8 for IO
    import sys
    import io
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
    sys.stdin = io.TextIOWrapper(sys.stdin.buffer, encoding='utf-8-sig')

    script_dir = os.path.dirname(os.path.abspath(__file__))
    paths = {
        "model": os.path.join(script_dir, 'medical_model.pkl'),
        "map": os.path.join(script_dir, 'evidences_map.pkl'),
        "features": os.path.join(script_dir, 'symptoms_features.pkl'),
        "trans": os.path.join(script_dir, 'diseases_ar.json'),
        "symmap": os.path.join(script_dir, 'symptom_to_ecode.json')
    }

    try:
        predictor = DiseasePredictor(paths["model"], paths["map"], paths["features"], paths["trans"], paths["symmap"])
        
        # CLI Argument Mode
        if len(sys.argv) > 1:
            try:
                symptoms = json.loads(sys.argv[1])
                print(json.dumps(predictor.predict(symptoms), ensure_ascii=False))
            except:
                print(json.dumps({"error": "Invalid JSON input"}))
            return

        # Interactive Mode (Persistent Process)
        print("READY")
        sys.stdout.flush()

        while True:
            line = sys.stdin.readline()
            if not line: break
            line = line.strip()
            if not line: continue
            if line.upper() == "EXIT": break

            try:
                symptoms = json.loads(line)
                result = predictor.predict(symptoms)
                print(json.dumps(result, ensure_ascii=False))
                sys.stdout.flush()
            except Exception as e:
                print(json.dumps({"error": f"JSON or Inference error: {str(e)}"}))
                sys.stdout.flush()

    except Exception as e:
        log_debug(f"STARTUP ERROR: {str(e)}")
        print(json.dumps({"error": f"Startup Error: {str(e)}"}))

if __name__ == "__main__":
    main()
