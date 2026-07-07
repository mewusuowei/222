export interface Vector3 {
  x: number;
  y: number;
  z: number;
}

export interface Example {
  id: number;
  title: string;
  description: string;
  vectorA: Vector3;
  vectorB: Vector3;
  steps: string[];
  result: Vector3;
  verification: string;
}

export const COLORS = {
  vectorA: '#ef4444',
  vectorB: '#3b82f6',
  vectorCross: '#22c55e',
  bg: '#0f172a',
  bgMid: '#1e293b',
  accent: '#fbbf24',
  text: '#f1f5f9',
  textMuted: '#94a3b8',
  card: 'rgba(30, 41, 59, 0.8)',
  cardBorder: 'rgba(71, 85, 105, 0.5)',
} as const;

export const EXAMPLES: Example[] = [
  {
    id: 1,
    title: '基础叉乘计算',
    description: '已知向量 a = (1, 2, 0)，b = (0, 1, 2)，求 a × b',
    vectorA: { x: 1, y: 2, z: 0 },
    vectorB: { x: 0, y: 1, z: 2 },
    steps: [
      '写出叉乘的行列式形式：a × b = |i  j  k; 1  2  0; 0  1  2|',
      '计算 i 分量：(2)(2) - (0)(1) = 4',
      '计算 j 分量：-[(1)(2) - (0)(0)] = -2',
      '计算 k 分量：(1)(1) - (2)(0) = 1',
      '最终结果：a × b = (4, -2, 1)',
    ],
    result: { x: 4, y: -2, z: 1 },
    verification: '验证：(a×b)·a = 4×1+(-2)×2+1×0 = 0 ✓，(a×b)·b = 4×0+(-2)×1+1×2 = 0 ✓',
  },
  {
    id: 2,
    title: '求垂直于两向量的单位向量',
    description: '已知 a = (2, -1, 1)，b = (1, 0, -1)，求同时垂直于 a 和 b 的单位向量',
    vectorA: { x: 2, y: -1, z: 1 },
    vectorB: { x: 1, y: 0, z: -1 },
    steps: [
      '先计算 a × b = |i  j  k; 2  -1  1; 1  0  -1|',
      'i 分量：(-1)(-1) - (1)(0) = 1',
      'j 分量：-[(2)(-1) - (1)(1)] = 3',
      'k 分量：(2)(0) - (-1)(1) = 1',
      'a × b = (1, 3, 1)',
      '求模长：|a×b| = √(1²+3²+1²) = √11',
      '单位向量 n = (1/√11, 3/√11, 1/√11)',
    ],
    result: { x: 1, y: 3, z: 1 },
    verification: '验证：n·a = 2-3+1 = 0 ✓，n·b = 1+0-1 = 0 ✓',
  },
  {
    id: 3,
    title: '计算平行四边形面积',
    description: '已知平行四边形相邻两边为 a = (3, 1, -1) 和 b = (1, -1, 2)，求面积',
    vectorA: { x: 3, y: 1, z: -1 },
    vectorB: { x: 1, y: -1, z: 2 },
    steps: [
      '平行四边形面积 S = |a × b|',
      '计算 a × b = |i  j  k; 3  1  -1; 1  -1  2|',
      'i 分量：(1)(2) - (-1)(-1) = 2 - 1 = 1',
      'j 分量：-[(3)(2) - (-1)(1)] = -(6+1) = -7',
      'k 分量：(3)(-1) - (1)(1) = -3 - 1 = -4',
      'a × b = (1, -7, -4)',
      '面积 S = |a×b| = √(1²+7²+4²) = √(1+49+16) = √66',
    ],
    result: { x: 1, y: -7, z: -4 },
    verification: '面积 S = √66 ≈ 8.12',
  },
];
