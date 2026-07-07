import { motion } from 'framer-motion';
import MathFormula from '../MathFormula';

export default function ConceptIntro() {
  const properties = [
    {
      title: '反交换律',
      tex: '\\vec{a} \\times \\vec{b} = -\\vec{b} \\times \\vec{a}',
    },
    {
      title: '标量乘法',
      tex: '(k\\vec{a}) \\times \\vec{b} = k(\\vec{a} \\times \\vec{b})',
    },
    {
      title: '分配律',
      tex: '\\vec{a} \\times (\\vec{b} + \\vec{c}) = \\vec{a} \\times \\vec{b} + \\vec{a} \\times \\vec{c}',
    },
    {
      title: '自身叉乘',
      tex: '\\vec{a} \\times \\vec{a} = \\vec{0}',
    },
  ];

  return (
    <section className="py-16 px-4">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-cyan-300 to-yellow-400 bg-clip-text text-transparent">
            向量的叉乘
          </h1>
          <p className="text-xl text-slate-300 mb-6">Cross Product of Vectors</p>
          <div className="inline-block bg-slate-800/80 border border-slate-600/50 rounded-2xl px-8 py-6">
            <MathFormula
              tex="\\vec{a} \\times \\vec{b} = |\\vec{a}| \\cdot |\\vec{b}| \\cdot \\sin\\theta \\cdot \\hat{n}"
              display
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12"
        >
          <div className="bg-slate-800/60 border border-slate-600/40 rounded-xl p-6 backdrop-blur-sm">
            <h3 className="text-lg font-semibold text-yellow-400 mb-3">定义</h3>
            <p className="text-slate-300 leading-relaxed">
              叉乘（又称向量积、外积）是两个向量在三维空间中的二元运算，
              结果是一个<strong className="text-green-400">垂直于两个原始向量</strong>的新向量。
              其模长等于以两向量为邻边的平行四边形面积。
            </p>
          </div>
          <div className="bg-slate-800/60 border border-slate-600/40 rounded-xl p-6 backdrop-blur-sm">
            <h3 className="text-lg font-semibold text-yellow-400 mb-3">几何意义</h3>
            <p className="text-slate-300 leading-relaxed">
              <MathFormula tex="|\\vec{a} \\times \\vec{b}|" /> 等于以 <MathFormula tex="\\vec{a}" /> 和{' '}
              <MathFormula tex="\\vec{b}" /> 为邻边的平行四边形的面积。
              方向由<strong className="text-blue-400">右手定则</strong>确定。
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <h3 className="text-xl font-semibold text-center text-slate-200 mb-6">基本性质</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {properties.map((prop, i) => (
              <motion.div
                key={prop.title}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.6 + i * 0.1 }}
                className="bg-slate-800/50 border border-slate-600/30 rounded-lg p-4 text-center hover:border-blue-500/50 transition-colors"
              >
                <p className="text-sm text-blue-400 mb-2">{prop.title}</p>
                <MathFormula tex={prop.tex} />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
