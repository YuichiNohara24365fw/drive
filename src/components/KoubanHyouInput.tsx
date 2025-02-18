import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { CutEntry, Studio } from '../types/koubanhyou';
import { sampleEpisodes, characters } from '../data/sampleData';
import { Copy, Plus, Save, Palette, FileText, Users, Link2, FileSpreadsheet } from 'lucide-react';
import StaffKoubanHyou from './StaffKoubanHyou';
import MaterialInfoModal from './MaterialInfoModal';
import * as XLSX from 'xlsx';

interface KoubanHyouInputProps {
  episodeId?: string;
}

const KoubanHyouInput: React.FC<KoubanHyouInputProps> = ({ episodeId }) => {
  const { id } = useParams();
  const episode = id ? sampleEpisodes.find(ep => ep.id === id) : null;
  const [entries, setEntries] = useState<CutEntry[]>(episode?.cuts || []);
  const [editingColor, setEditingColor] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'setting' | 'staff'>('setting');
  const [selectedMaterial, setSelectedMaterial] = useState<MaterialInfo | null>(null);
  const [isEditingMaterial, setIsEditingMaterial] = useState(false);
  const [editingEntry, setEditingEntry] = useState<string | null>(null);

  const seasons = ['春', '夏', '秋', '冬'];
  const timeOfDays = ['朝', '昼', '夕方', '夜', '深夜', '未明'];
  const weathers = ['晴れ', '曇り', '雨', '雪', '霧', '嵐'];

  const addNewEntry = () => {
    const maxId = Math.max(...entries.map(entry => parseInt(entry.id)), 0);
    setEntries([...entries, {
      id: (maxId + 1).toString(),
      partId: '',
      cutNo: '',
      rangeStart: '',
      rangeEnd: '',
      season: '春',
      timeOfDay: '朝',
      weather: '晴れ',
      location: '',
      board: '',
      characters: [],
      costume: '',
      costumeNotes: '',
      props: '',
      notes: '',
      materials: [],
      remarks: '',
      status: 'default',
      backgroundColor: '#ffffff'
    }]);
  };

  const copyEntry = (id: string) => {
    const entryToCopy = entries.find(entry => entry.id === id);
    if (!entryToCopy) return;

    const maxId = Math.max(...entries.map(entry => parseInt(entry.id)), 0);
    const newEntry = {
      ...entryToCopy,
      id: (maxId + 1).toString(),
    };

    const index = entries.findIndex(entry => entry.id === id);
    const newEntries = [...entries];
    newEntries.splice(index + 1, 0, newEntry);
    setEntries(newEntries);
  };

  const updateEntry = (id: string, field: keyof CutEntry, value: any) => {
    setEntries(entries.map(entry =>
      entry.id === id ? { ...entry, [field]: value } : entry
    ));
  };

  const handleAddMaterial = (cutId: string) => {
    setEditingEntry(cutId);
    setIsEditingMaterial(true);
    setSelectedMaterial({
      id: `mat${Date.now()}`,
      type: '2D',
      title: '',
      url: '',
      metadata: {
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
    });
  };

  const handleUpdateMaterial = (updatedMaterial: MaterialInfo) => {
    if (editingEntry) {
      setEntries(entries.map(entry => {
        if (entry.id === editingEntry) {
          if (selectedMaterial?.id) {
            // Update existing material
            return {
              ...entry,
              materials: entry.materials.map(m => 
                m.id === selectedMaterial.id ? updatedMaterial : m
              )
            };
          } else {
            // Add new material
            return {
              ...entry,
              materials: [...entry.materials, updatedMaterial]
            };
          }
        }
        return entry;
      }));
    }
    setSelectedMaterial(null);
    setIsEditingMaterial(false);
    setEditingEntry(null);
  };

  const handleEditMaterial = (material: MaterialInfo, cutId: string) => {
    setEditingEntry(cutId);
    setSelectedMaterial(material);
    setIsEditingMaterial(true);
  };

  const renderMaterialLinks = (materials: MaterialInfo[], cutId: string) => {
    return (
      <div className="flex items-center gap-1 flex-wrap">
        {materials.map((material, index) => (
          <button
            key={index}
            onClick={() => handleEditMaterial(material, cutId)}
            className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 hover:bg-gray-200 rounded text-xs"
            title={material.title}
          >
            <Link2 className="w-3 h-3" />
            <span className="truncate max-w-[100px]">{material.title || material.type}</span>
          </button>
        ))}
        <button
          onClick={() => handleAddMaterial(cutId)}
          className="inline-flex items-center gap-1 px-2 py-1 bg-indigo-100 hover:bg-indigo-200 text-indigo-700 rounded text-xs"
        >
          <Plus className="w-3 h-3" />
          追加
        </button>
      </div>
    );
  };

  const exportToExcel = () => {
    const exportData = entries.map(entry => ({
      'カット番号': entry.cutNo,
      '範囲開始': entry.rangeStart,
      '範囲終了': entry.rangeEnd,
      '季節': entry.season,
      '時間帯': entry.timeOfDay,
      '天気': entry.weather,
      '場所': entry.location,
      'ボード': entry.board,
      'キャラクター': entry.characters.join(', '),
      '衣装': entry.costume,
      '衣装メモ': entry.costumeNotes,
      '小物': entry.props,
      '備考': entry.remarks
    }));

    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(exportData);

    const columnWidths = [
      { wch: 12 }, // カット番号
      { wch: 10 }, // 範囲開始
      { wch: 10 }, // 範囲終了
      { wch: 8 },  // 季節
      { wch: 10 }, // 時間帯
      { wch: 8 },  // 天気
      { wch: 20 }, // 場所
      { wch: 12 }, // ボード
      { wch: 30 }, // キャラクター
      { wch: 20 }, // 衣装
      { wch: 30 }, // 衣装メモ
      { wch: 20 }, // 小物
      { wch: 30 }  // 備考
    ];
    ws['!cols'] = columnWidths;

    XLSX.utils.book_append_sheet(wb, ws, '香盤表');

    const fileName = episode 
      ? `香盤表_第${episode.number}話_${new Date().toISOString().split('T')[0]}.xlsx`
      : `香盤表_${new Date().toISOString().split('T')[0]}.xlsx`;
    XLSX.writeFile(wb, fileName);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900">
            {episode ? `第${episode.number}話「${episode.title}」香盤表` : '新規香盤表'}
          </h1>
          {episode && (
            <p className="mt-0.5 text-xs text-gray-500">
              最終更新: {new Date(episode.lastModified).toLocaleDateString('ja-JP')} | 
              総カット数: {episode.totalCuts}カット
            </p>
          )}
        </div>
        <div className="flex items-center gap-4">
          <div className="flex rounded-lg border border-gray-200 p-1 bg-white">
            <button
              onClick={() => setActiveTab('setting')}
              className={`px-4 py-1.5 rounded-md text-sm font-medium flex items-center gap-1 ${
                activeTab === 'setting'
                  ? 'bg-indigo-100 text-indigo-800'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <FileText className="w-4 h-4" />
              設定・背景
            </button>
            <button
              onClick={() => setActiveTab('staff')}
              className={`px-4 py-1.5 rounded-md text-sm font-medium flex items-center gap-1 ${
                activeTab === 'staff'
                  ? 'bg-indigo-100 text-indigo-800'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <Users className="w-4 h-4" />
              スタッフ
            </button>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={exportToExcel}
              className="flex items-center gap-1 px-3 py-1.5 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700"
            >
              <FileSpreadsheet className="w-3.5 h-3.5" />
              Excel出力
            </button>
            <button
              onClick={addNewEntry}
              className="flex items-center gap-1 px-3 py-1.5 bg-indigo-600 text-white text-sm rounded-lg hover:bg-indigo-700"
            >
              <Plus className="w-3.5 h-3.5" />
              新規行
            </button>
            <button className="flex items-center gap-1 px-3 py-1.5 border border-indigo-600 text-indigo-600 text-sm rounded-lg hover:bg-indigo-50">
              <Save className="w-3.5 h-3.5" />
              保存
            </button>
          </div>
        </div>
      </div>

      {activeTab === 'setting' ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr className="text-[11px] text-gray-500 uppercase tracking-wider">
                <th className="px-2 py-1.5">操作</th>
                <th className="px-2 py-1.5">カットNo</th>
                <th className="px-2 py-1.5">範囲</th>
                <th className="px-2 py-1.5">季節</th>
                <th className="px-2 py-1.5">時間帯</th>
                <th className="px-2 py-1.5">天気</th>
                <th className="px-2 py-1.5">場所</th>
                <th className="px-2 py-1.5">ボード</th>
                <th className="px-2 py-1.5">キャラクター</th>
                <th className="px-2 py-1.5">衣装</th>
                <th className="px-2 py-1.5">衣装メモ</th>
                <th className="px-2 py-1.5">小物</th>
                <th className="px-2 py-1.5">備考</th>
                <th className="px-2 py-1.5">素材</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 text-xs">
              {entries.map((entry) => (
                <tr 
                  key={entry.id} 
                  style={{ backgroundColor: entry.backgroundColor || 'transparent' }}
                >
                  <td className="px-2 py-1.5">
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => copyEntry(entry.id)}
                        className="p-1 hover:bg-gray-100 rounded"
                        title="行をコピー"
                      >
                        <Copy className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => setEditingColor(entry.id)}
                        className="p-1 hover:bg-gray-100 rounded"
                        title="背景色を設定"
                      >
                        <Palette className="w-3.5 h-3.5" />
                      </button>
                      {editingColor === entry.id && (
                        <input
                          type="color"
                          value={entry.backgroundColor || '#ffffff'}
                          onChange={(e) => {
                            updateEntry(entry.id, 'backgroundColor', e.target.value);
                            setEditingColor(null);
                          }}
                          className="w-6 h-6"
                        />
                      )}
                    </div>
                  </td>
                  <td className="px-2 py-1.5">
                    <input
                      type="text"
                      value={entry.cutNo}
                      onChange={(e) => updateEntry(entry.id, 'cutNo', e.target.value)}
                      className="w-16 px-1.5 py-0.5 border rounded text-xs"
                    />
                  </td>
                  <td className="px-2 py-1.5">
                    <div className="flex items-center gap-1">
                      <input
                        type="text"
                        value={entry.rangeStart}
                        onChange={(e) => updateEntry(entry.id, 'rangeStart', e.target.value)}
                        className="w-12 px-1.5 py-0.5 border rounded text-xs"
                      />
                      <span>-</span>
                      <input
                        type="text"
                        value={entry.rangeEnd}
                        onChange={(e) => updateEntry(entry.id, 'rangeEnd', e.target.value)}
                        className="w-12 px-1.5 py-0.5 border rounded text-xs"
                      />
                    </div>
                  </td>
                  <td className="px-2 py-1.5">
                    <select
                      value={entry.season}
                      onChange={(e) => updateEntry(entry.id, 'season', e.target.value)}
                      className="w-16 px-1.5 py-0.5 border rounded text-xs"
                    >
                      {seasons.map(season => (
                        <option key={season} value={season}>{season}</option>
                      ))}
                    </select>
                  </td>
                  <td className="px-2 py-1.5">
                    <select
                      value={entry.timeOfDay}
                      onChange={(e) => updateEntry(entry.id, 'timeOfDay', e.target.value)}
                      className="w-16 px-1.5 py-0.5 border rounded text-xs"
                    >
                      {timeOfDays.map(time => (
                        <option key={time} value={time}>{time}</option>
                      ))}
                    </select>
                  </td>
                  <td className="px-2 py-1.5">
                    <select
                      value={entry.weather}
                      onChange={(e) => updateEntry(entry.id, 'weather', e.target.value)}
                      className="w-16 px-1.5 py-0.5 border rounded text-xs"
                    >
                      {weathers.map(weather => (
                        <option key={weather} value={weather}>{weather}</option>
                      ))}
                    </select>
                  </td>
                  <td className="px-2 py-1.5">
                    <input
                      type="text"
                      value={entry.location}
                      onChange={(e) => updateEntry(entry.id, 'location', e.target.value)}
                      className="w-32 px-1.5 py-0.5 border rounded text-xs"
                    />
                  </td>
                  <td className="px-2 py-1.5">
                    <input
                      type="text"
                      value={entry.board}
                      onChange={(e) => updateEntry(entry.id, 'board', e.target.value)}
                      className="w-20 px-1.5 py-0.5 border rounded text-xs"
                    />
                  </td>
                  <td className="px-2 py-1.5">
                    <select
                      multiple
                      value={entry.characters}
                      onChange={(e) => {
                        const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
                        updateEntry(entry.id, 'characters', selectedOptions);
                      }}
                      className="w-32 px-1.5 py-0.5 border rounded text-xs"
                      size={3}
                    >
                      {characters.map(char => (
                        <option key={char.id} value={char.code}>
                          {char.name}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="px-2 py-1.5">
                    <input
                      type="text"
                      value={entry.costume}
                      onChange={(e) => updateEntry(entry.id, 'costume', e.target.value)}
                      className="w-32 px-1.5 py-0.5 border rounded text-xs"
                    />
                  </td>
                  <td className="px-2 py-1.5">
                    <input
                      type="text"
                      value={entry.costumeNotes}
                      onChange={(e) => updateEntry(entry.id, 'costumeNotes', e.target.value)}
                      className="w-32 px-1.5 py-0.5 border rounded text-xs"
                    />
                  </td>
                  <td className="px-2 py-1.5">
                    <input
                      type="text"
                      value={entry.props}
                      onChange={(e) => updateEntry(entry.id, 'props', e.target.value)}
                      className="w-32 px-1.5 py-0.5 border rounded text-xs"
                    />
                  </td>
                  <td className="px-2 py-1.5">
                    <input
                      type="text"
                      value={entry.remarks}
                      onChange={(e) => updateEntry(entry.id, 'remarks', e.target.value)}
                      className="w-32 px-1.5 py-0.5 border rounded text-xs"
                    />
                  </td>
                  <td className="px-2 py-1.5">
                    {renderMaterialLinks(entry.materials, entry.id)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <StaffKoubanHyou episodeId={id} />
      )}

      {selectedMaterial && (
        <MaterialInfoModal
          material={selectedMaterial}
          onClose={() => {
            setSelectedMaterial(null);
            setIsEditingMaterial(false);
            setEditingEntry(null);
          }}
          onUpdate={handleUpdateMaterial}
          isEditing={isEditingMaterial}
        />
      )}
    </div>
  );
};

export default KoubanHyouInput;