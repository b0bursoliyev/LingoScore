'use client';

import React, { useState } from 'react';
import Hero from "@/components/home/Hero";
import AssessmentForm from "@/components/assessment/AssessmentForm";
import ResultsDashboard from "@/components/assessment/ResultsDashboard";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

interface AnalysisData {
  overallLevel: string;
  overallScore: number;
  metrics: {
    reading: number;
    listening: number;
    writing: number;
    speaking: number;
  };
  vocabulary: {
    variety: string;
    complexity: string;
  };
  grammar: {
    errorCount: number;
    errors: Array<{ original: string; suggestion: string; type: string }>;
  };
  feedback: {
    strengths: string[];
    improvements: string[];
  };
  wordCount: number;
}

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [analysisData, setAnalysisData] = useState<AnalysisData | null>(null);

  const handleAnalyze = async (text: string) => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      });

      const data = await response.json();
      if (response.ok) {
        setAnalysisData(data);
        // Scroll to results
        setTimeout(() => {
          document.getElementById('results-report')?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else {
        alert(data.error || 'Something went wrong');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to analyze text.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setAnalysisData(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleExport = async () => {
    const element = document.getElementById('results-report');
    if (!element) return;

    // Hide export buttons and back button during export
    const buttons = element.querySelectorAll<HTMLElement>('.no-export');
    buttons.forEach((btn) => {
      btn.style.display = 'none';
    });

    try {
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save('LingoScore-Report.pdf');
    } catch (error) {
      console.error('PDF export error:', error);
    } finally {
      buttons.forEach((btn) => {
        btn.style.display = '';
      });
    }
  };

  return (
    <div className="bg-white">
      {!analysisData && <Hero />}

      <div id="assess" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-4xl mx-auto">
          {!analysisData ? (
            <>
              <h2 className="text-3xl font-bold text-primary mb-8 text-center">English Proficiency Assessment</h2>
              <div className="bg-white rounded-3xl p-1 shadow-2xl shadow-blue-100">
                <AssessmentForm onAnalyze={handleAnalyze} isLoading={isLoading} />
              </div>
            </>
          ) : (
            <ResultsDashboard
              data={analysisData}
              onReset={handleReset}
              onExport={handleExport}
            />
          )}
        </div>
      </div>
    </div>
  );
}
