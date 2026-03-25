import { useEffect, useState } from 'react';

function App() {
  const [visitorCount, setVisitorCount] = useState<number | null>(null);

  useEffect(() => {
    const incrementVisitor = async () => {
      try {
        const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
        const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

        const response = await fetch(
          `${supabaseUrl}/functions/v1/increment_visitor`,
          {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${supabaseAnonKey}`,
              'Content-Type': 'application/json',
            },
          }
        );

        const data = await response.json();
        if (data.count) {
          setVisitorCount(data.count);
        }
      } catch (error) {
        console.error('Failed to increment visitor count:', error);
      }
    };

    incrementVisitor();
  }, []);

  const projects = [
    {
      id: 1,
      title: '智能图像识别系统',
      description: '基于深度学习的图像分类与目标检测系统，准确率达95%以上',
      image: 'https://images.pexels.com/photos/2599244/pexels-photo-2599244.jpeg?auto=compress&cs=tinysrgb&w=600'
    },
    {
      id: 2,
      title: '自然语言处理平台',
      description: '集成情感分析、文本摘要等功能的NLP综合应用平台',
      image: 'https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=600'
    },
    {
      id: 3,
      title: '智能推荐算法',
      description: '基于协同过滤和深度学习的个性化推荐系统',
      image: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=600'
    }
  ];

  const handleContact = () => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-black/30 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-xl font-semibold tracking-wide">Home</div>
          <button
            onClick={handleContact}
            className="px-6 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full border border-white/20 transition-all duration-300 hover:scale-105"
          >
            Contact
          </button>
        </div>
      </nav>

      <main className="pt-24 pb-16 px-6">
        <div className="max-w-4xl mx-auto">
          <section className="text-center mb-20">
            <div className="mb-8 flex justify-center">
              <div className="w-40 h-40 rounded-full bg-gradient-to-br from-blue-400 to-purple-600 p-1">
                <div className="w-full h-full rounded-full bg-gray-800 flex items-center justify-center text-6xl font-light">
                  许
                </div>
              </div>
            </div>

            <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              许蕙心
            </h1>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
              上海师范大学信息与机电工程学院人工智能专业学生，热爱探索AI技术的无限可能
            </p>

            <div className="flex justify-center gap-6 mt-8">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 flex items-center justify-center transition-all duration-300 hover:scale-110"
              >
                <i className="fab fa-github text-xl"></i>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 flex items-center justify-center transition-all duration-300 hover:scale-110"
              >
                <i className="fab fa-linkedin text-xl"></i>
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 flex items-center justify-center transition-all duration-300 hover:scale-110"
              >
                <i className="fab fa-twitter text-xl"></i>
              </a>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-8 text-center">作品集</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <div
                  key={project.id}
                  className="group backdrop-blur-md bg-white/5 rounded-2xl overflow-hidden border border-white/10 hover:border-white/30 transition-all duration-300 hover:transform hover:scale-105"
                >
                  <div className="aspect-video overflow-hidden bg-gray-700">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-400 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      {project.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>

      <footer className="py-8 text-center text-gray-500 text-sm backdrop-blur-md bg-black/30 border-t border-white/10">
        <p>© 2024 许蕙心. All rights reserved.</p>
        {visitorCount !== null && (
          <p className="mt-4 text-gray-400">您是第 <span className="text-blue-400 font-semibold">{visitorCount}</span> 位访客</p>
        )}
      </footer>
    </div>
  );
}

export default App;
