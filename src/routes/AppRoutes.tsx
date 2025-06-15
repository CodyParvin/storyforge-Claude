
import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import LoadingScreen from '../components/LoadingScreen';

// Lazy load components for better performance
const HomePage = lazy(() => import('../pages/HomePage'));
const CreatePage = lazy(() => import('../pages/CreatePage'));
const OutlinePage = lazy(() => import('../pages/OutlinePage'));
const ChapterPage = lazy(() => import('../pages/ChapterPage'));
const ExportPage = lazy(() => import('../pages/ExportPage'));
const StoriesPage = lazy(() => import('../pages/StoriesPage'));
const ProfilePage = lazy(() => import('../pages/ProfilePage'));
const SettingsPage = lazy(() => import('../pages/SettingsPage'));
const NotFound = lazy(() => import('../pages/NotFound'));

const AppRoutes = () => {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/outline" element={<OutlinePage />} />
        <Route path="/chapters" element={<ChapterPage />} />
        <Route path="/export" element={<ExportPage />} />
        <Route path="/stories" element={<StoriesPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
