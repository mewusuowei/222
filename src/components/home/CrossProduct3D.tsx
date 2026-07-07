import { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text, Line, Grid } from '@react-three/drei';
import * as THREE from 'three';
import { motion } from 'framer-motion';
import { COLORS } from '@/utils/constants';
import { crossProduct, magnitude, angleBetween } from '@/utils/math';

interface VectorArrowProps {
  from: [number, number, number];
  to: [number, number, number];
  color: string;
  label: string;
  labelOffset?: [number, number, number];
  animate?: boolean;
}

function VectorArrow({ from, to, color, label, labelOffset = [0, 0.3, 0], animate = true }: VectorArrowProps) {
  const groupRef = useRef<THREE.Group>(null);
  const [progress, setProgress] = useState(animate ? 0 : 1);

  useFrame((_, delta) => {
    if (animate && progress < 1) {
      setProgress((p) => Math.min(1, p + delta * 0.8));
    }
    if (groupRef.current) {
      const dir = new THREE.Vector3(to[0] - from[0], to[1] - from[1], to[2] - from[2]);
      const len = dir.length() * progress;
      dir.normalize();
      groupRef.current.scale.set(1, 1, 1);
      const endPoint: [number, number, number] = [
        from[0] + dir.x * len,
        from[1] + dir.y * len,
        from[2] + dir.z * len,
      ];
      groupRef.current.userData.endPoint = endPoint;
    }
  });

  const dir = new THREE.Vector3(to[0] - from[0], to[1] - from[1], to[2] - from[2]);
  dir.normalize();
  const arrowLength = 0.15;
  const arrowEnd: [number, number, number] = [
    from[0] + dir.x * (new THREE.Vector3(...to).distanceTo(new THREE.Vector3(...from)) * progress),
    from[1] + dir.y * (new THREE.Vector3(...to).distanceTo(new THREE.Vector3(...from)) * progress),
    from[2] + dir.z * (new THREE.Vector3(...to).distanceTo(new THREE.Vector3(...from)) * progress),
  ];
  const arrowBase: [number, number, number] = [
    arrowEnd[0] - dir.x * arrowLength,
    arrowEnd[1] - dir.y * arrowLength,
    arrowEnd[2] - dir.z * arrowLength,
  ];

  const midPoint: [number, number, number] = [
    (from[0] + to[0]) / 2 + labelOffset[0],
    (from[1] + to[1]) / 2 + labelOffset[1],
    (from[2] + to[2]) / 2 + labelOffset[2],
  ];

  return (
    <group ref={groupRef}>
      <Line
        points={[from, arrowEnd]}
        color={color}
        lineWidth={3}
      />
      {/* Arrowhead */}
      <Line points={[arrowBase, arrowEnd]} color={color} lineWidth={6} />
      <Line
        points={[
          [arrowBase[0] - dir.z * 0.08, arrowBase[1], arrowBase[2] + dir.x * 0.08],
          arrowEnd,
        ]}
        color={color}
        lineWidth={6}
      />
      <Line
        points={[
          [arrowBase[0] + dir.z * 0.08, arrowBase[1], arrowBase[2] - dir.x * 0.08],
          arrowEnd,
        ]}
        color={color}
        lineWidth={6}
      />
      <Text
        position={midPoint}
        fontSize={0.25}
        color={color}
        anchorX="center"
        anchorY="middle"
        fontWeight="bold"
      >
        {label}
      </Text>
    </group>
  );
}

function Parallelogram({ a, b, color }: { a: [number, number, number]; b: [number, number, number]; color: string }) {
  const points: [number, number, number][] = [
    [0, 0, 0],
    a,
    [a[0] + b[0], a[1] + b[1], a[2] + b[2]],
    b,
    [0, 0, 0],
  ];

  return (
    <Line
      points={points}
      color={color}
      lineWidth={1}
      transparent
      opacity={0.4}
    />
  );
}

function Scene() {
  const a: [number, number, number] = [2, 0, 0];
  const b: [number, number, number] = [0.5, 2, 0];
  const cross = crossProduct({ x: a[0], y: a[1], z: a[2] }, { x: b[0], y: b[1], z: b[2] });
  const crossVec: [number, number, number] = [cross.x, cross.y, cross.z];
  const angle = angleBetween({ x: a[0], y: a[1], z: a[2] }, { x: b[0], y: b[1], z: b[2] });
  const mag = magnitude(cross);

  const groupRef = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.2;
    }
  });

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <directionalLight position={[-5, -5, -5]} intensity={0.3} />

      <group ref={groupRef}>
        {/* Axes */}
        <Line points={[[0, 0, 0], [3, 0, 0]]} color="#475569" lineWidth={1} />
        <Line points={[[0, 0, 0], [0, 3, 0]]} color="#475569" lineWidth={1} />
        <Line points={[[0, 0, 0], [0, 0, 3]]} color="#475569" lineWidth={1} />
        <Text position={[3.2, 0, 0]} fontSize={0.2} color="#64748b">x</Text>
        <Text position={[0, 3.2, 0]} fontSize={0.2} color="#64748b">y</Text>
        <Text position={[0, 0, 3.2]} fontSize={0.2} color="#64748b">z</Text>

        {/* Vectors */}
        <VectorArrow from={[0, 0, 0]} to={a} color={COLORS.vectorA} label="a" labelOffset={[0, -0.3, 0]} />
        <VectorArrow from={[0, 0, 0]} to={b} color={COLORS.vectorB} label="b" labelOffset={[-0.3, 0, 0]} />
        <VectorArrow from={[0, 0, 0]} to={crossVec} color={COLORS.vectorCross} label="a×b" labelOffset={[0.3, 0, 0.3]} />

        {/* Parallelogram */}
        <Parallelogram a={a} b={b} color="#94a3b8" />

        {/* Angle arc */}
        <Text
          position={[0.8, 0.4, 0]}
          fontSize={0.18}
          color="#fbbf24"
        >
          {`θ = ${(angle * 180 / Math.PI).toFixed(1)}°`}
        </Text>

        {/* Magnitude label */}
        <Text
          position={[crossVec[0] + 0.3, crossVec[1], crossVec[2] + 0.3]}
          fontSize={0.16}
          color="#22c55e"
        >
          {`|a×b| = ${mag.toFixed(2)}`}
        </Text>
      </group>

      <Grid
        position={[0, -0.01, 0]}
        args={[10, 10]}
        cellSize={0.5}
        cellThickness={0.5}
        cellColor="#1e293b"
        sectionSize={1}
        sectionThickness={1}
        sectionColor="#334155"
        fadeDistance={10}
        infiniteGrid
      />

      <OrbitControls
        enablePan={false}
        minDistance={3}
        maxDistance={10}
        autoRotate
        autoRotateSpeed={0.5}
      />
    </>
  );
}

export default function CrossProduct3D() {
  return (
    <section className="py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-6"
        >
          <h2 className="text-3xl font-bold text-slate-100 mb-2">几何意义可视化</h2>
          <p className="text-slate-400">拖动旋转视角，观察叉乘结果向量与原始向量的关系</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative rounded-2xl overflow-hidden border border-slate-600/50 bg-slate-900/50"
          style={{ height: '500px' }}
        >
          <Canvas
            camera={{ position: [4, 3, 4], fov: 50 }}
            dpr={[1, 2]}
          >
            <Scene />
          </Canvas>

          {/* Legend */}
          <div className="absolute bottom-4 left-4 bg-slate-900/80 backdrop-blur-sm rounded-lg p-3 border border-slate-600/50">
            <div className="flex flex-col space-y-2 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-4 h-1 rounded" style={{ backgroundColor: COLORS.vectorA }} />
                <span className="text-slate-300">向量 a (红色)</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-1 rounded" style={{ backgroundColor: COLORS.vectorB }} />
                <span className="text-slate-300">向量 b (蓝色)</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-1 rounded" style={{ backgroundColor: COLORS.vectorCross }} />
                <span className="text-slate-300">a×b (绿色)</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
