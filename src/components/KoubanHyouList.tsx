import React from 'react';
import { Plus, FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { sampleEpisodes } from '../data/sampleData';

const KoubanHyouList: React.FC = () => {
  const navigate = useNavigate();

  const getStatusBadge = (status: 'draft' | 'in_progress' | 'completed') => {
    const styles = {
      draft: 'bg-gray-100 text-gray-800',
      in_progress: 'bg-blue-100 text-blue-800',
      completed: 'bg-green-100 text-green-800'
    };
    
    const labels = {
      draft: '下書き',
      in_progress: '作業中',
      completed: '完了'
    };

    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${styles[status]}`}>
        {labels[status]}
      </span>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">香盤表</h1>
        <button
          onClick={() => navigate('/kouban-hyou/new')}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
        >
          <Plus className="w-4 h-4" />
          新規作成
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200 text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">話数</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">タイトル</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">カット数</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ステータス</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">最終更新</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sampleEpisodes.map((episode) => (
                <tr key={episode.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className="font-medium">第{episode.number}話</span>
                  </td>
                  <td className="px-4 py-3">{episode.title}</td>
                  <td className="px-4 py-3 whitespace-nowrap">{episode.totalCuts}カット</td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    {getStatusBadge(episode.status)}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-gray-500">
                    {new Date(episode.lastModified).toLocaleDateString('ja-JP')}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-right">
                    <button
                      onClick={() => navigate(`/kouban-hyou/${episode.id}`)}
                      className="text-indigo-600 hover:text-indigo-900"
                    >
                      <FileText className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default KoubanHyouList;