import React from 'react';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react';

const Schedule = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">制作スケジュール</h1>
        <div className="flex items-center gap-2">
          <button className="p-2 hover:bg-indigo-50 rounded-lg">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button className="flex items-center gap-2 px-4 py-2 border border-indigo-100 rounded-lg bg-white">
            <CalendarIcon className="w-4 h-4" />
            2024年3月
          </button>
          <button className="p-2 hover:bg-indigo-50 rounded-lg">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-indigo-50">
        <div className="grid grid-cols-7 gap-px bg-indigo-100">
          {['日', '月', '火', '水', '木', '金', '土'].map((day) => (
            <div key={day} className="bg-indigo-50 p-2 text-center text-sm font-medium text-gray-700">
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-px bg-indigo-100">
          {Array.from({ length: 35 }).map((_, i) => (
            <div key={i} className="bg-white p-4 min-h-[120px] hover:bg-indigo-50/50 transition-colors">
              <span className="text-sm text-gray-500">{i + 1}</span>
              {i === 15 && (
                <div className="mt-2 p-1 bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 text-xs rounded">
                  夢幻学園物語 - アニメーションチェック
                </div>
              )}
              {i === 22 && (
                <div className="mt-2 p-1 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800 text-xs rounded">
                  サイバーサムライ - 絵コンテ締切
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Schedule;