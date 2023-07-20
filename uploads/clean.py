import json

json_data = []

with open('patient_data.txt', 'r') as file:
    for line in file:
        line = line.strip()
        if line:
            x, y = line.split("\t")
            json_obj = {"x": float(x),"y": float(y)}
            json_data.append(json_obj)

with open('patient.json', 'w') as output_file:
    json.dump(json_data, output_file, indent=4)
