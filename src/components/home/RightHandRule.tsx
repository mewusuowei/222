import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text } from '@react-three/drei';
import * as THREE from 'three';
import { motion } from 'framer-motion';

function HandModel() {
  const groupRef = useRef<THREE.Group>(null);
  const timeRef = useRef(0);

  useFrame((_, delta) => {
    timeRef.current += delta;
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(timeRef.current * 0.5) * 0.3;
    }
  });

  // Simplified hand representation using basic shapes
  const thumbColor = '#ef4444';
  const indexColor = '#22c55e';
  const middleColor = '#3b82f6';

  return (
    <group ref={groupRef}>
      {/* Palm */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[0.8, 1, 0.3]} />
        <meshStandardMaterial color="#d4a574" transparent opacity={0.7} />
      </mesh>

      {/* Thumb - points in x direction */}
      <mesh position={[0.6, 0.2, 0]} rotation={[0, 0, -Math.PI / 4]}>
        <capsuleGeometry args={[0.1, 0.6, 4, 8]} />
        <meshStandardMaterial color={thumbColor} />
      </mesh>
      <Text position={[1.1, 0.5, 0]} fontSize={0.2} color={thumbColor} fontWeight="bold">
        x (拇指)
      </Text>

      {/* Index finger - points in y direction */}
      <mesh position={[0.2, 0.8, 0]}>
        <capsuleGeometry args={[0.08, 0.7, 4, 8]} />
        <meshStandardMaterial color={indexColor} />
      </mesh>
      <Text position={[0.2, 1.4, 0]} fontSize={0.2} color={indexColor} fontWeight="bold">
        y (食指)
      </Text>

      {/* Middle finger - points in z direction (out of screen) */}
      <mesh position={[-0.1, 0.5, 0.4]} rotation={[Math.PI / 2, 0, 0]}>
        <capsuleGeometry args={[0.08, 0.6, 4, 8]} />
        <meshStandardMaterial color={middleColor} />
      </mesh>
      <Text position={[-0.1, 0.5, 1.0]} fontSize={0.2} color={middleColor} fontWeight="bold">
        z (中指)
      </Text>

      {/* Direction arrows */}
      {/* X axis */}
      <mesh position={[1.5, 0, 0]}>
        <coneGeometry args={[0.08, 0.2, 8]} />
        <meshStandardMaterial color={thumbColor} />
      </mesh>
      {/* Y axis */}
      <mesh position={[0, 1.6, 0]} rotation={[0, 0, 0]}>
        <coneGeometry args={[0.08, 0.2, 8]} />
        <meshStandardMaterial color={indexColor} />
      </mesh>
      {/* Z axis */}
      <mesh position={[0, 0, 1.2]} rotation={[Math.PI / 2, 0, 0]}>
        <coneGeometry args={[0.08, 0.2, 8]} />
        <meshStandardMaterial color={middleColor} />
      </mesh>
    </group>
  );
}

function RightHandScene() {
  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <directionalLight position={[-3, -3, -3]} intensity={0.3} />

      <HandModel />

      <OrbitControls
        enablePan={false}
        minDistance={2}
        maxDistance={6}
        autoRotate
        autoRotateSpeed={1}
      />
    </>
  );
}

export default function RightHandRule() {
  return (
    <section className="py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-6"
        >
          <h2 className="text-3xl font-bold text-slate-100 mb-2">右手定则</h2>
          <p className="text-slate-400">右手四指从 a 弯向 b，拇指指向即为 a×b 的方向</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="rounded-2xl overflow-hidden border border-slate-600/50 bg-slate-900/50"
            style={{ height: '400px' }}
          >
            <Canvas camera={{ position: [2, 2, 3], fov: 50 }} dpr={[1, 2]}>
              <RightHandScene />
            </Canvas>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-4"
          >
            <div className="bg-slate-800/60 border border-slate-600/40 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-yellow-400 mb-3">使用步骤</h3>
              <ol className="space-y-3 text-slate-300">
                <li className="flex items-start space-x-2">
                  <span className="text-red-400 font-bold">1.</span>
                  <span>将右手四指伸直，指向第一个向量 <strong className="text-red-400">a</strong> 的方向</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-blue-400 font-bold">2.</span>
                  <span>弯曲四指，使其转向第二个向量 <strong className="text-blue-400">b</strong> 的方向（沿较小夹角）</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-green-400 font-bold">3.</span>
                  <span>伸直的拇指所指方向即为叉乘结果 <strong className="text-green-400">a×b</strong> 的方向</span>
                </li>
              </ol>
            </div>

            <div className="bg-slate-800/60 border border-slate-600/40 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-yellow-400 mb-3">关键要点</h3>
              <ul className="space-y-2 text-slate-300 text-sm">
                <li>• 叉乘结果<strong className="text-green-400">垂直于</strong>两个原始向量所在的平面</li>
                <li>• 交换两向量顺序，结果方向<strong className="text-red-400">相反</strong></li>
                <li>• 当两向量平行时，叉乘结果为<strong className="text-yellow-400">零向量</strong></li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
