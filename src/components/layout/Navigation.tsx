import { Link, useLocation } from 'react-router-dom';
import { Home, Calculator, BookOpen } from 'lucide-react';

export default function Navigation() {
  const location = useLocation();

  const links = [
    { path: '/', label: '首页', icon: Home },
    { path: '/calculation', label: '计算方法', icon: Calculator },
    { path: '/examples', label: '例题练习', icon: BookOpen },
  ];

  return (
    <nav className="bg-slate-900/80 backdrop-blur-sm border-b border-slate-700/50 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-yellow-400 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">×</span>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-yellow-400 bg-clip-text text-transparent">
              叉乘讲解
            </span>
          </div>

          <div className="flex space-x-1">
            {links.map(({ path, label, icon: Icon }) => {
              const isActive = location.pathname === path;
              return (
                <Link
                  key={path}
                  to={path}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                    isActive
                      ? 'bg-blue-600 text-white'
                      : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-sm font-medium">{label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}
