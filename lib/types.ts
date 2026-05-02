export interface Medicine {
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
  confidence: "high" | "medium" | "low";
  notes?: string;
}

export interface PrescriptionFlag {
  type: "warning" | "alert" | "info";
  message: string;
}

export interface PrescriptionResult {
  diagnosis?: string;
  medicines: Medicine[];
  doctorInstructions: string[];
  patientGuidance: string;
  recommendedTests: string[];
  flags: PrescriptionFlag[];
  rawText?: string;
}

export interface LabMarker {
  testName: string;
  value: string;
  unit: string;
  normalRange: string;
  status: "normal" | "high" | "low" | "critical-high" | "critical-low";
}

export interface LabReportResult {
  reportType: string;
  markers: LabMarker[];
  criticalAlerts: string[];
  lifestyleRecommendations: {
    diet: string[];
    sleep: string[];
    exercise: string[];
  };
  foodAndNutritionGuidance: string[];
  aiSummary: string;
  nextSteps: string[];
}
