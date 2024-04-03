# Remote Arrhythmia Diagnosis

A remote cardiac monitoring system for early detection of arrhythmia by using an electrocardiogram like data acquisition model and irregularity prediction using classification models (based on decision trees), backed by full-stack web application to collect, analyse, store and transmit data to doctors for final evaluation without the need for appointments and allowing constant surveillance on heart patients.
The system starts by collecting ECG signals from the patient by using a device made by AD-8232. These signals are then converted into Digital form by using a Analog to Digital Convertor. This data is then processed in MATLAB to calculate entities like speed of the wave, amplitude of the wave and the R-R wave distance, which in turn are used as input for the Machine Learning model which we have trained to detect arrythmia. This model is trained using Classification Learner in MATLAB and uses the Decision Tree training model. Once processed, if there is any abnormality is found, the same is notfied to the patient and the doctor through a web software that we have created using JavaScript.

## Sensors/Tech Used
<ul>
  <li> LM-35 Temperature Sensor </li>
  <li> Pulse Rate Sensor </li>
  <li> Flex Sensor LCD </li>
  <li> Arduino Wifi </li>
  <li> <a href="https://blynk.io/getting-started"> Blynk</a> </li>
  <li> <a href="https://docs.arduino.cc/software/ide/"> Arduino IDE </a> </li>
</ul>

### [User Interface](https://github.com/lazybug19/Arrhythmia-Predictor/blob/main/cardio.jpeg)



