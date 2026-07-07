import { useMemo } from 'react';
import { renderMath } from '@/utils/katex';

interface MathFormulaProps {
  tex: string;
  display?: boolean;
  className?: string;
}

export default function MathFormula({ tex, display = false, className = '' }: MathFormulaProps) {
  const html = useMemo(() => renderMath(tex, display), [tex, display]);
  return <span className={className} dangerouslySetInnerHTML={{ __html: html }} />;
}
