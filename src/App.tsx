import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { WorkspaceProvider } from './context/WorkspaceContext';
import { Layout } from './components/Layout';
import { HomePage } from './pages/HomePage';
import { FeaturesPage } from './pages/FeaturesPage';
import { FeatureDetailPage } from './pages/FeatureDetailPage';
import { CommunityPage } from './pages/CommunityPage';
import { CommunityDetailPage } from './pages/CommunityDetailPage';
import { NewMeetingPage } from './pages/NewMeetingPage';
import { MeetingRoomPage } from './pages/MeetingRoomPage';
import { DashboardPage } from './pages/DashboardPage';
import { RecordingDetailPage } from './pages/RecordingDetailPage';
import { SettingsPage } from './pages/SettingsPage';
import { PricingPage } from './pages/PricingPage';
import { AuthPage } from './pages/AuthPage';
import { NotFoundPage } from './pages/NotFoundPage';

export default function App() {
  return (
    <WorkspaceProvider>
      <BrowserRouter>
        <Routes>
          {/* Pre-join lobby placed explicitly before dynamic room code route */}
          <Route
            path="/meeting/new"
            element={
              <Layout>
                <NewMeetingPage />
              </Layout>
            }
          />
          {/* Full-screen live video room without marketing chrome */}
          <Route path="/meeting/:code" element={<MeetingRoomPage />} />

          {/* Standard site pages wrapped in Kepripun Layout */}
          <Route
            path="/"
            element={
              <Layout>
                <HomePage />
              </Layout>
            }
          />
          <Route
            path="/features"
            element={
              <Layout>
                <FeaturesPage />
              </Layout>
            }
          />
          <Route
            path="/features/:slug"
            element={
              <Layout>
                <FeatureDetailPage />
              </Layout>
            }
          />
          <Route
            path="/community"
            element={
              <Layout>
                <CommunityPage />
              </Layout>
            }
          />
          <Route
            path="/community/:slug"
            element={
              <Layout>
                <CommunityDetailPage />
              </Layout>
            }
          />
          <Route
            path="/dashboard"
            element={
              <Layout>
                <DashboardPage />
              </Layout>
            }
          />
          <Route
            path="/dashboard/recording/:id"
            element={
              <Layout>
                <RecordingDetailPage />
              </Layout>
            }
          />
          <Route
            path="/settings"
            element={
              <Layout>
                <SettingsPage />
              </Layout>
            }
          />
          <Route
            path="/pricing"
            element={
              <Layout>
                <PricingPage />
              </Layout>
            }
          />
          <Route
            path="/login"
            element={
              <Layout>
                <AuthPage mode="login" />
              </Layout>
            }
          />
          <Route
            path="/signup"
            element={
              <Layout>
                <AuthPage mode="signup" />
              </Layout>
            }
          />
          <Route
            path="/404"
            element={
              <Layout>
                <NotFoundPage />
              </Layout>
            }
          />
          <Route
            path="*"
            element={
              <Layout>
                <NotFoundPage />
              </Layout>
            }
          />
        </Routes>
      </BrowserRouter>
    </WorkspaceProvider>
  );
}
