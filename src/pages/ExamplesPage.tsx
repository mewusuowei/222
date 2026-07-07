import { motion } from 'framer-motion';
import { EXAMPLES } from '@/utils/constants';
import ExampleCard from '@/components/examples/ExampleCard';

export default function ExamplesPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-green-400 to-yellow-400 bg-clip-text text-transparent">
          例题练习
        </h1>
        <p className="text-lg text-slate-300">通过三道典型例题巩固叉乘知识</p>
      </motion.div>

      <div className="space-y-8">
        {EXAMPLES.map((example, i) => (
          <motion.div
            key={example.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: i * 0.2 }}
          >
            <ExampleCard example={example} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
