import { StubDatabase } from '../types';

export const stubData: StubDatabase = {
  projects: [
    {
      id: '1',
      title: '夢幻学園物語',
      status: 'production',
      startDate: '2024-01-01',
      endDate: '2024-12-31',
      thumbnail: 'https://images.unsplash.com/photo-1580477667995-2b94f01c9516?auto=format&fit=crop&q=80',
      description: '魔法と芸術が交差する学園で、若きクリエイターたちの成長を描く物語',
      progress: {
        storyboard: 85,
        animation: 60,
        background: 70,
        sound: 45,
        editing: 30
      },
      episodes: [
        {
          id: 'ep1',
          number: 1,
          title: '魔法の学園へようこそ',
          cuts: [
            { 
              id: 'cut1', 
              number: 'A-1', 
              status: 'completed', 
              assignedTo: '1', 
              duration: 3,
              dueDate: '2024-03-15'
            },
            { 
              id: 'cut2', 
              number: 'A-2', 
              status: 'in_progress', 
              assignedTo: '1', 
              duration: 4,
              dueDate: '2024-03-10'  // 納期超過のサンプル
            },
            { 
              id: 'cut3', 
              number: 'A-3', 
              status: 'not_started', 
              assignedTo: '1', 
              duration: 2,
              dueDate: '2024-03-20'
            },
            { 
              id: 'cut4', 
              number: 'A-4', 
              status: 'pending_review', 
              assignedTo: '2', 
              duration: 5,
              dueDate: '2024-03-18'
            }
          ]
        },
        {
          id: 'ep2',
          number: 2,
          title: '新しい仲間との出会い',
          cuts: [
            { 
              id: 'cut5', 
              number: 'B-1', 
              status: 'completed', 
              assignedTo: '2', 
              duration: 3,
              dueDate: '2024-03-25'
            },
            { 
              id: 'cut6', 
              number: 'B-2', 
              status: 'in_progress', 
              assignedTo: '1', 
              duration: 6,
              dueDate: '2024-03-28'
            },
            { 
              id: 'cut7', 
              number: 'B-3', 
              status: 'not_started', 
              assignedTo: '2', 
              duration: 4,
              dueDate: '2024-03-30'
            }
          ]
        }
      ]
    }
  ],
  // ... 他のデータは変更なし
  staff: [
    {
      id: '1',
      name: '田中 優希',
      role: 'アニメーションディレクター',
      department: 'アニメーション',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80',
      workload: {
        totalCuts: 15,
        notStarted: 3,
        inProgress: 4,
        completed: 6,
        pendingReview: 2
      }
    },
    {
      id: '2',
      name: '鈴木 健一',
      role: 'キャラクターデザイナー',
      department: 'アート',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80',
      workload: {
        totalCuts: 12,
        notStarted: 4,
        inProgress: 3,
        completed: 4,
        pendingReview: 1
      }
    }
  ],
  delays: [
    {
      id: '1',
      projectId: '1',
      phase: 'animation',
      delayDays: 5,
      impact: 'medium',
      reason: 'キャラクターの動きの修正が必要',
      affectedScenes: ['A-2', 'A-3', 'A-4'],
      assignedTo: '田中 優希',
      status: 'in-progress',
      details: [
        {
          scene: 'A-2',
          description: 'アクションシーンの動きが不自然',
          estimatedRecovery: '2024-03-20'
        },
        {
          scene: 'A-3',
          description: 'キャラクターの表情修正',
          estimatedRecovery: '2024-03-22'
        },
        {
          scene: 'A-4',
          description: '背景とのマッチング調整',
          estimatedRecovery: '2024-03-25'
        }
      ]
    }
  ],
  departmentProgress: {
    animation: 75,
    background: 60,
    sound: 85,
    editing: 45,
    planning: 90
  }
};