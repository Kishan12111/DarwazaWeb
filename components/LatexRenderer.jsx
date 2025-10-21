import React from 'react';

export default function LatexRenderer({ text }) {
  if (!text) return null;

  // Simple LaTeX rendering - replace common math symbols
  const renderLatex = (input) => {
    let rendered = input
      // Fractions
      .replace(/\\frac\{([^}]+)\}\{([^}]+)\}/g, '<span class="fraction"><span class="numerator">$1</span><span class="denominator">$2</span></span>')
      // Superscripts
      .replace(/\^(\w+|\{[^}]+\})/g, '<sup>$1</sup>')
      .replace(/\^{([^}]+)}/g, '<sup>$1</sup>')
      // Subscripts
      .replace(/_(\w+|\{[^}]+\})/g, '<sub>$1</sub>')
      .replace(/_{([^}]+)}/g, '<sub>$1</sub>')
      // Greek letters
      .replace(/\\alpha/g, 'α')
      .replace(/\\beta/g, 'β')
      .replace(/\\gamma/g, 'γ')
      .replace(/\\delta/g, 'δ')
      .replace(/\\epsilon/g, 'ε')
      .replace(/\\theta/g, 'θ')
      .replace(/\\lambda/g, 'λ')
      .replace(/\\mu/g, 'μ')
      .replace(/\\pi/g, 'π')
      .replace(/\\sigma/g, 'σ')
      .replace(/\\phi/g, 'φ')
      .replace(/\\omega/g, 'ω')
      // Math symbols
      .replace(/\\infty/g, '∞')
      .replace(/\\sum/g, '∑')
      .replace(/\\int/g, '∫')
      .replace(/\\sqrt\{([^}]+)\}/g, '√($1)')
      .replace(/\\leq/g, '≤')
      .replace(/\\geq/g, '≥')
      .replace(/\\neq/g, '≠')
      .replace(/\\approx/g, '≈')
      .replace(/\\pm/g, '±')
      .replace(/\\times/g, '×')
      .replace(/\\div/g, '÷')
      // Remove remaining backslashes for simple commands
      .replace(/\\([a-zA-Z]+)/g, '$1');

    return rendered;
  };

  return (
    <div 
      className="latex-content"
      dangerouslySetInnerHTML={{ __html: renderLatex(text) }}
      style={{
        lineHeight: '1.6'
      }}
    />
  );
}
