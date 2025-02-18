import { Episode, Part, StaffEntry, Studio, Character, MaterialInfo } from '../types/koubanhyou';

export const defaultParts: Part[] = [
  {
    id: '1',
    name: 'パートA',
    description: '学校シーン',
    color: '#FFE4E1'
  },
  {
    id: '2',
    name: 'パートB',
    description: '公園シーン',
    color: '#E0FFFF'
  },
  {
    id: '3',
    name: 'パートC',
    description: '自宅シーン',
    color: '#F0FFF0'
  }
];

export const characters: Character[] = [
  { id: 'char1', name: '佐藤 美咲', code: 'MISAKI' },
  { id: 'char2', name: '田中 翔太', code: 'SHOTA' },
  { id: 'char3', name: '山本 花子', code: 'HANAKO' },
  { id: 'char4', name: '鈴木 健一', code: 'KENICHI' },
  { id: 'char5', name: '高橋 優子', code: 'YUKO' }
];

const sampleMaterials: MaterialInfo[] = [
  {
    id: 'mat1',
    type: '3D',
    title: '学校前背景モデル',
    url: 'https://example.com/3d/school.fbx',
    thumbnail: 'https://images.unsplash.com/photo-1519452635265-7b1fbfd1e4e0?auto=format&fit=crop&q=80',
    metadata: {
      createdAt: '2024-01-06 14:05',
      updatedAt: '2024-01-06 14:05',
      size: '331 KB',
      dimensions: '2335 x 1647',
      author: '山田モデラー',
      tags: ['学校', '外観', '朝'],
      rating: 5,
      comments: 'ライティング調整済み',
      availability: 'オンラインのみ',
      cameraInfo: '標準カメラ',
      cameraModel: 'Canon EOS R5',
      conditions: '最終確認済み'
    }
  },
  {
    id: 'mat2',
    type: '2D',
    title: '教室内背景',
    url: 'https://example.com/bg/classroom.psd',
    thumbnail: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&q=80',
    metadata: {
      createdAt: '2024-01-07 09:30',
      updatedAt: '2024-01-07 15:45',
      size: '245 MB',
      dimensions: '3840 x 2160',
      author: '鈴木背景',
      tags: ['教室', '室内', '昼'],
      rating: 4.5,
      comments: '窓からの光の調整が必要かも',
      availability: 'ローカル保存',
      conditions: '確認待ち'
    }
  },
  {
    id: 'mat3',
    type: '3D_ROUGH',
    title: '公園ベンチ',
    url: 'https://example.com/3d/park_bench.fbx',
    thumbnail: 'https://images.unsplash.com/photo-1519331379826-f10be5486c6f?auto=format&fit=crop&q=80',
    metadata: {
      createdAt: '2024-01-08 10:15',
      updatedAt: '2024-01-08 10:15',
      size: '156 KB',
      dimensions: '1920 x 1080',
      author: '高橋モデラー',
      tags: ['公園', '小物', '屋外'],
      rating: 4,
      comments: '簡易版なので詳細な調整が必要',
      availability: 'オンラインのみ',
      conditions: '確認中'
    }
  },
  {
    id: 'mat4',
    type: '2D',
    title: '夕暮れの街並み',
    url: 'https://example.com/bg/sunset_city.psd',
    thumbnail: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&q=80',
    metadata: {
      createdAt: '2024-01-09 16:20',
      updatedAt: '2024-01-09 16:20',
      size: '189 MB',
      dimensions: '4096 x 2160',
      author: '佐々木背景',
      tags: ['街', '夕方', '都市'],
      rating: 5,
      comments: '色調整完了',
      availability: 'ローカル保存',
      conditions: '最終確認済み'
    }
  }
];

export const sampleEpisodes: Episode[] = [
  {
    id: '1',
    number: 1,
    title: '新しい仲間',
    totalCuts: 220,
    status: 'in_progress',
    lastModified: '2024-03-10',
    parts: defaultParts,
    cuts: [
      {
        id: '1',
        partId: '1',
        cutNo: 'A-1',
        rangeStart: '1',
        rangeEnd: '24',
        season: '春',
        timeOfDay: '朝',
        weather: '晴れ',
        location: '学校前',
        board: 'A-1',
        characters: ['MISAKI', 'SHOTA'],
        costume: '制服',
        costumeNotes: '新品',
        props: '通学バッグ',
        notes: '',
        materials: [sampleMaterials[0]],
        remarks: '',
        status: 'default',
        backgroundColor: '#FFE4E1'
      },
      {
        id: '2',
        partId: '1',
        cutNo: 'A-2',
        rangeStart: '25',
        rangeEnd: '48',
        season: '春',
        timeOfDay: '朝',
        weather: '晴れ',
        location: '教室',
        board: 'A-2',
        characters: ['MISAKI', 'SHOTA', 'HANAKO'],
        costume: '制服',
        costumeNotes: '',
        props: '教科書、筆記用具',
        notes: '窓際の席に座る生徒たち',
        materials: [sampleMaterials[1]],
        remarks: '',
        status: 'default',
        backgroundColor: '#FFE4E1'
      }
    ]
  },
  {
    id: '2',
    number: 2,
    title: '放課後の約束',
    totalCuts: 195,
    status: 'in_progress',
    lastModified: '2024-03-11',
    parts: defaultParts,
    cuts: [
      {
        id: '3',
        partId: '2',
        cutNo: 'B-1',
        rangeStart: '1',
        rangeEnd: '36',
        season: '春',
        timeOfDay: '夕方',
        weather: '晴れ',
        location: '公園',
        board: 'B-1',
        characters: ['MISAKI', 'HANAKO'],
        costume: '制服',
        costumeNotes: '',
        props: 'ベンチ',
        notes: '夕暮れの公園でのシーン',
        materials: [sampleMaterials[2], sampleMaterials[3]],
        remarks: '',
        status: 'default',
        backgroundColor: '#E0FFFF'
      }
    ]
  },
  {
    id: '3',
    number: 3,
    title: '雨の日の出来事',
    totalCuts: 210,
    status: 'draft',
    lastModified: '2024-03-12',
    parts: defaultParts,
    cuts: [
      {
        id: '4',
        partId: '1',
        cutNo: 'A-1',
        rangeStart: '1',
        rangeEnd: '24',
        season: '春',
        timeOfDay: '朝',
        weather: '雨',
        location: '学校前',
        board: 'A-1',
        characters: ['MISAKI', 'KENICHI'],
        costume: '制服',
        costumeNotes: '雨具あり',
        props: '傘、レインコート',
        notes: '雨の中の登校シーン',
        materials: [sampleMaterials[0]],
        remarks: '',
        status: 'default',
        backgroundColor: '#FFE4E1'
      }
    ]
  },
  {
    id: '4',
    number: 4,
    title: '夕暮れの決意',
    totalCuts: 230,
    status: 'draft',
    lastModified: '2024-03-13',
    parts: defaultParts,
    cuts: [
      {
        id: '5',
        partId: '2',
        cutNo: 'B-1',
        rangeStart: '1',
        rangeEnd: '36',
        season: '春',
        timeOfDay: '夕方',
        weather: '晴れ',
        location: '街並み',
        board: 'B-1',
        characters: ['MISAKI', 'YUKO'],
        costume: '制服',
        costumeNotes: '',
        props: 'スマートフォン',
        notes: '夕暮れの街を歩くシーン',
        materials: [sampleMaterials[3]],
        remarks: '',
        status: 'default',
        backgroundColor: '#E0FFFF'
      }
    ]
  }
];

export const sampleStaffEntries: StaffEntry[] = [
  {
    id: 'director1',
    name: '山田 太郎',
    nameEn: 'Taro Yamada',
    role: '監督',
    roleEn: 'Director',
    studio: 'スタジオA',
    department: '演出',
    order: 1,
    status: 'active'
  },
  {
    id: 'animator1',
    name: '佐藤 一郎',
    nameEn: 'Ichiro Sato',
    role: '作画監督',
    roleEn: 'Animation Director',
    studio: 'スタジオB',
    department: 'アニメーション',
    order: 2,
    status: 'active'
  },
  {
    id: 'bg1',
    name: '鈴木 花子',
    nameEn: 'Hanako Suzuki',
    role: '美術監督',
    roleEn: 'Art Director',
    studio: 'アートスタジオC',
    department: '美術',
    order: 3,
    status: 'active'
  }
];

export const sampleStudios: Studio[] = [
  {
    id: 'studio1',
    name: 'スタジオA',
    departments: ['演出', 'アニメーション']
  },
  {
    id: 'studio2',
    name: 'スタジオB',
    departments: ['アニメーション', '動画']
  },
  {
    id: 'studio3',
    name: 'アートスタジオC',
    departments: ['美術', '背景']
  }
];