import { useState, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text, Line } from '@react-three/drei';
import * as THREE from 'three';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, CheckCircle } from 'lucide-react';
import type { Example as ExampleType, Vector3 } from '@/utils/constants';
import { COLORS } from '@/utils/constants';
import { vectorToString } from '@/utils/math';

interface ExampleCardProps {
  example: ExampleType;
}

function VectorScene({ a, b, cross }: { a: Vector3; b: Vector3; cross: Vector3 }) {
  const groupRef = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.4) * 0.3;
    }
  });

  const scale = 0.8;
  const aScaled: [number, number, number] = [a.x * scale, a.y * scale, a.z * scale];
  const bScaled: [number, number, number] = [b.x * scale, b.y * scale, b.z * scale];
  const crossScaled: [number, number, number] = [cross.x * scale, cross.y * scale, cross.z * scale];

  const makeArrow = (to: [number, number, number], color: string) => {
    const dir = new THREE.Vector3(...to).normalize();
    const arrowTip = to;
    const arrowBase: [number, number, number] = [
      to[0] - dir.x * 0.15,
      to[1] - dir.y * 0.15,
      to[2] - dir.z * 0.15,
    ];
    return (
      <>
        <Line points={[[0, 0, 0], arrowTip]} color={color} lineWidth={3} />
        <Line points={[arrowBase, arrowTip]} color={color} lineWidth={7} />
        <Line
          points={[
            [arrowBase[0] - dir.z * 0.08, arrowBase[1], arrowBase[2] + dir.x * 0.08],
            arrowTip,
          ]}
          color={color}
          lineWidth={7}
        />
        <Line
          points={[
            [arrowBase[0] + dir.z * 0.08, arrowBase[1], arrowBase[2] - dir.x * 0.08],
            arrowTip,
          ]}
          color={color}
          lineWidth={7}
        />
      </>
    );
  };

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[3, 3, 3]} intensity={1} />
      <group ref={groupRef}>
        {/* Axes */}
        <Line points={[[0, 0, 0], [2.5, 0, 0]]} color="#334155" lineWidth={1} />
        <Line points={[[0, 0, 0], [0, 2.5, 0]]} color="#334155" lineWidth={1} />
        <Line points={[[0, 0, 0], [0, 0, 2.5]]} color="#334155" lineWidth={1} />
        <Text position={[2.7, 0, 0]} fontSize={0.15} color="#64748b">x</Text>
        <Text position={[0, 2.7, 0]} fontSize={0.15} color="#64748b">y</Text>
        <Text position={[0, 0, 2.7]} fontSize={0.15} color="#64748b">z</Text>

        {makeArrow(aScaled, COLORS.vectorA)}
        {makeArrow(bScaled, COLORS.vectorB)}
        {makeArrow(crossScaled, COLORS.vectorCross)}

        <Text position={[aScaled[0] + 0.2, aScaled[1], aScaled[2]]} fontSize={0.18} color={COLORS.vectorA}>a</Text>
        <Text position={[bScaled[0], bScaled[1] + 0.2, bScaled[2]]} fontSize={0.18} color={COLORS.vectorB}>b</Text>
        <Text position={[crossScaled[0] + 0.2, crossScaled[1], crossScaled[2]]} fontSize={0.18} color={COLORS.vectorCross}>a×b</Text>
      </group>
      <OrbitControls enablePan={false} minDistance={2} maxDistance={8} />
    </>
  );
}

export default function ExampleCard({ example }: ExampleCardProps) {
  const [showSteps, setShowSteps] = useState(false);

  return (
    <div className="bg-slate-800/60 border border-slate-600/40 rounded-2xl overflow-hidden backdrop-blur-sm">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600/20 to-green-600/20 border-b border-slate-600/40 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="w-8 h-8 bg-gradient-to-br from-blue-500 to-green-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
              {example.id}
            </span>
            <h3 className="text-xl font-semibold text-slate-100">{example.title}</h3>
          </div>
          <button
            onClick={() => setShowSteps(!showSteps)}
            className="flex items-center space-x-2 px-4 py-2 bg-slate-700/50 hover:bg-slate-600/50 rounded-lg transition-colors text-slate-300"
          >
            <span className="text-sm">{showSteps ? '收起步骤' : '展开步骤'}</span>
            {showSteps ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Problem & Steps */}
          <div>
            <div className="bg-slate-900/50 rounded-xl p-5 mb-4">
              <p className="text-slate-300 text-lg">{example.description}</p>
            </div>

            <AnimatePresence>
              {showSteps && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="space-y-3">
                    {example.steps.map((step, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: i * 0.1 }}
                        className="flex items-start space-x-3 bg-slate-900/30 rounded-lg p-3"
                      >
                        <span className="flex-shrink-0 w-6 h-6 bg-blue-500/20 border border-blue-500/40 rounded-full flex items-center justify-center text-blue-400 text-xs font-bold">
                          {i + 1}
                        </span>
                        <p className="text-slate-300 text-sm">{step}</p>
                      </motion.div>
                    ))}

                    <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 mt-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <CheckCircle className="w-5 h-5 text-green-400" />
                        <span className="text-green-400 font-semibold">最终结果</span>
                      </div>
                      <p className="text-slate-200 text-lg">
                        a × b = {vectorToString(example.result)}
                      </p>
                    </div>

                    <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
                      <p className="text-yellow-400 font-semibold mb-2">验证</p>
                      <p className="text-slate-300 text-sm">{example.verification}</p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* 3D Visualization */}
          <div className="rounded-xl overflow-hidden border border-slate-600/30 bg-slate-900/50" style={{ height: '300px' }}>
            <Canvas camera={{ position: [3, 2, 3], fov: 50 }} dpr={[1, 2]}>
              <VectorScene a={example.vectorA} b={example.vectorB} cross={example.result} />
            </Canvas>
          </div>
        </div>
      </div>
    </div>
  );
}
