import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import Projects from './pages/Projects';
import Staff from './pages/Staff';
import Schedule from './pages/Schedule';
import Settings from './pages/Settings';
import CutSheetPage from './pages/CutSheetPage';
import CutManagementPage from './pages/CutManagementPage';
import CutProgressPage from './pages/CutProgressPage';
import StaffDetailPage from './pages/StaffDetailPage';
import KoubanHyouList from './components/KoubanHyouList';
import KoubanHyouInput from './components/KoubanHyouInput';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-horizon-50 flex">
        <Sidebar />
        <div className="flex-1 transition-all duration-300 ease-in-out">
          <Header />
          <main className="pt-16 p-6">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/staff" element={<Staff />} />
              <Route path="/staff/:staffId" element={<StaffDetailPage />} />
              <Route path="/schedule" element={<Schedule />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/cut-sheet" element={<CutSheetPage />} />
              <Route path="/cut-management" element={<CutManagementPage />} />
              <Route path="/cut-progress" element={<CutProgressPage />} />
              <Route path="/kouban-hyou" element={<KoubanHyouList />} />
              <Route path="/kouban-hyou/new" element={<KoubanHyouInput />} />
              <Route path="/kouban-hyou/:id" element={<KoubanHyouInput />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;