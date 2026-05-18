'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ResultsDashboard from "@/components/assessment/ResultsDashboard";
import { useAssessmentStore } from '@/store/useAssessmentStore';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export default function ResultsPage() {
  const router = useRouter();
  const { analysisData, reset } = useAssessmentStore();

  useEffect(() => {
    if (!analysisData) {
      router.push('/assess');
    }
  }, [analysisData, router]);

  const handleReset = () => {
    reset();
    router.push('/assess');
  };

  const handleExport = async () => {
    const element = document.getElementById('results-report');
    if (!element) return;

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

  if (!analysisData) return null;

  return (
    <div className="min-h-screen bg-slate-50 pt-10 pb-20 px-4">
      <div className="max-w-5xl mx-auto">
        <ResultsDashboard
          data={analysisData}
          onReset={handleReset}
          onExport={handleExport}
        />
      </div>
    </div>
  );
}
