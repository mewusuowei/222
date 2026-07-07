import { motion } from 'framer-motion';
import MathFormula from '@/components/MathFormula';

export default function CalculationPage() {
  const derivationSteps = [
    {
      title: '定义式',
      tex: '\\vec{a} \\times \\vec{b} = |\\vec{a}| \\cdot |\\vec{b}| \\cdot \\sin\\theta \\cdot \\hat{n}',
      description: '其中 θ 是两向量夹角，n̂ 是垂直于两向量的单位向量',
    },
    {
      title: '基向量叉乘',
      tex: '\\hat{i} \\times \\hat{j} = \\hat{k}, \\quad \\hat{j} \\times \\hat{k} = \\hat{i}, \\quad \\hat{k} \\times \\hat{i} = \\hat{j}',
      description: '基本单位向量的叉乘关系',
    },
    {
      title: '展开计算',
      tex: '\\vec{a} \\times \\vec{b} = (a_1\\hat{i} + a_2\\hat{j} + a_3\\hat{k}) \\times (b_1\\hat{i} + b_2\\hat{j} + b_3\\hat{k})',
      description: '将向量按基向量展开',
    },
    {
      title: '行列式形式',
      tex: '\\vec{a} \\times \\vec{b} = \\begin{vmatrix} \\hat{i} & \\hat{j} & \\hat{k} \\\\ a_1 & a_2 & a_3 \\\\ b_1 & b_2 & b_3 \\end{vmatrix}',
      description: '用行列式表示叉乘',
    },
    {
      title: '坐标分量',
      tex: '\\vec{a} \\times \\vec{b} = (a_2b_3 - a_3b_2)\\hat{i} - (a_1b_3 - a_3b_1)\\hat{j} + (a_1b_2 - a_2b_1)\\hat{k}',
      description: '展开行列式得到各分量',
    },
  ];

  const calculationSteps = [
    {
      step: 1,
      title: '写出向量坐标',
      content: '设 a = (a₁, a₂, a₃)，b = (b₁, b₂, b₃)',
    },
    {
      step: 2,
      title: '构建行列式',
      content: '第一行：i, j, k；第二行：a 的分量；第三行：b 的分量',
    },
    {
      step: 3,
      title: '计算 i 分量',
      content: '划去 i 所在列，计算 2×2 行列式：a₂b₃ - a₃b₂',
    },
    {
      step: 4,
      title: '计算 j 分量',
      content: '划去 j 所在列，计算 2×2 行列式并取负：-(a₁b₃ - a₃b₁)',
    },
    {
      step: 5,
      title: '计算 k 分量',
      content: '划去 k 所在列，计算 2×2 行列式：a₁b₂ - a₂b₁',
    },
    {
      step: 6,
      title: '组合结果',
      content: '将三个分量组合成向量：(a₂b₃-a₃b₂, -(a₁b₃-a₃b₁), a₁b₂-a₂b₁)',
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-yellow-400 bg-clip-text text-transparent">
          叉乘的计算方法
        </h1>
        <p className="text-lg text-slate-300">从定义到坐标计算的完整推导</p>
      </motion.div>

      {/* Formula Derivation */}
      <motion.section
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mb-16"
      >
        <h2 className="text-2xl font-semibold text-slate-100 mb-6 flex items-center">
          <span className="w-1 h-6 bg-blue-500 rounded mr-3"></span>
          公式推导
        </h2>
        <div className="space-y-4">
          {derivationSteps.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
              className="bg-slate-800/60 border border-slate-600/40 rounded-xl p-6 hover:border-blue-500/50 transition-colors"
            >
              <h3 className="text-lg font-semibold text-yellow-400 mb-3">{item.title}</h3>
              <div className="bg-slate-900/50 rounded-lg p-4 mb-3 overflow-x-auto">
                <MathFormula tex={item.tex} display />
              </div>
              <p className="text-slate-400 text-sm">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Calculation Steps */}
      <motion.section
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <h2 className="text-2xl font-semibold text-slate-100 mb-6 flex items-center">
          <span className="w-1 h-6 bg-green-500 rounded mr-3"></span>
          计算步骤
        </h2>
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-green-500 to-yellow-500"></div>

          <div className="space-y-6">
            {calculationSteps.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.5 + i * 0.1 }}
                className="relative flex items-start space-x-4"
              >
                <div className="relative z-10 flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-500 to-green-500 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                  {item.step}
                </div>
                <div className="flex-1 bg-slate-800/60 border border-slate-600/40 rounded-xl p-5 hover:border-green-500/50 transition-colors">
                  <h3 className="text-lg font-semibold text-slate-100 mb-2">{item.title}</h3>
                  <p className="text-slate-300">{item.content}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Quick Reference */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="mt-16"
      >
        <h2 className="text-2xl font-semibold text-slate-100 mb-6 flex items-center">
          <span className="w-1 h-6 bg-yellow-500 rounded mr-3"></span>
          快速记忆
        </h2>
        <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 border border-yellow-500/30 rounded-2xl p-8">
          <div className="text-center mb-6">
            <p className="text-slate-300 mb-4">对于向量 a = (a₁, a₂, a₃) 和 b = (b₁, b₂, b₃)</p>
            <div className="bg-slate-900/50 rounded-lg p-6 inline-block">
              <MathFormula
                tex="\\vec{a} \\times \\vec{b} = \\begin{vmatrix} \\hat{i} & \\hat{j} & \\hat{k} \\\\ a_1 & a_2 & a_3 \\\\ b_1 & b_2 & b_3 \\end{vmatrix}"
                display
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 text-center">
              <p className="text-red-400 font-semibold mb-2">i 分量</p>
              <MathFormula tex="a_2b_3 - a_3b_2" />
            </div>
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 text-center">
              <p className="text-blue-400 font-semibold mb-2">j 分量</p>
              <MathFormula tex="-(a_1b_3 - a_3b_1)" />
            </div>
            <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 text-center">
              <p className="text-green-400 font-semibold mb-2">k 分量</p>
              <MathFormula tex="a_1b_2 - a_2b_1" />
            </div>
          </div>
        </div>
      </motion.section>
    </div>
  );
}
