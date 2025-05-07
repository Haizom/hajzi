import { Routes, Route } from 'react-router-dom';
import { useLanguage } from './lib/store/useLanguage';
import { HomePage } from './pages/home';
import { SignUpPage } from './pages/auth/sign-up';
import { SignInPage } from './pages/auth/sign-in';
import { VerifyAccountPage } from './pages/auth/verify-account';
import { HotelsPage } from './pages/hotels';
import { HotelDetailsPage } from './pages/hotels/[id]';
import { CityPage } from './pages/yemen/city';
import { ChaletsResortsPage } from './pages/chalets-resorts';
import { ChaletDetailsPage } from './pages/chalets-resorts/[id]';
import { WeddingHallsPage } from './pages/wedding-halls';
import { WeddingHallDetailsPage } from './pages/wedding-halls/[id]';
import { ApartmentsPage } from './pages/apartments';
import { ApartmentDetailsPage } from './pages/apartments/[id]';
import { CampsPage } from './pages/camps';
import { TermanahDetailsPage } from './pages/camps/[id]';
import { DashboardPage } from './pages/dashboard';
import { DashboardBookingsPage } from './pages/dashboard/bookings';
import { DashboardReviewsPage } from './pages/dashboard/reviews';
import { DashboardStatsPage } from './pages/dashboard/stats';
import { DashboardSettingsPage } from './pages/dashboard/settings';
import { DashboardContentPage } from './pages/dashboard/content';
import { ProfilePage } from './pages/profile';
import { OffersPage } from './pages/offers';
import { ListPropertyPage } from './pages/list-property';
import { ScrollToTop } from './components/ui/scroll-to-top';
import { AuthGuard } from './components/auth/auth-guard';

// Legal Pages
import { PaymentMethodsPage } from './pages/legal/payment-methods';
import { CancellationPolicyPage } from './pages/legal/cancellation-policy';
import { FAQsPage } from './pages/legal/faqs';
import { TermsPage } from './pages/legal/terms';
import { PrivacyPolicyPage } from './pages/legal/privacy';
import { CookiePolicyPage } from './pages/legal/cookie-policy';
import { DisclaimerPage } from './pages/legal/disclaimer';

function App() {
  const { language } = useLanguage();

  return (
    <div className={language === 'ar' ? 'font-arabic' : 'font-english'} dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/verify-account" element={<VerifyAccountPage />} />
        <Route path="/hotels" element={<HotelsPage />} />
        <Route path="/hotels/:id" element={<HotelDetailsPage />} />
        <Route path="/yemen/:cityId" element={<CityPage />} />
        <Route path="/chalets-resorts" element={<ChaletsResortsPage />} />
        <Route path="/chalets-resorts/:id" element={<ChaletDetailsPage />} />
        <Route path="/wedding-halls" element={<WeddingHallsPage />} />
        <Route path="/wedding-halls/:id" element={<WeddingHallDetailsPage />} />
        <Route path="/apartments" element={<ApartmentsPage />} />
        <Route path="/apartments/:id" element={<ApartmentDetailsPage />} />
        <Route path="/camps" element={<CampsPage />} />
        <Route path="/camps/:id" element={<TermanahDetailsPage />} />
        <Route path="/offers" element={<OffersPage />} />
        <Route 
          path="/list-property" 
          element={
            <AuthGuard requireAuth>
              <ListPropertyPage />
            </AuthGuard>
          } 
        />
        
        {/* Legal Pages */}
        <Route path="/payment-methods" element={<PaymentMethodsPage />} />
        <Route path="/cancellation-policy" element={<CancellationPolicyPage />} />
        <Route path="/faqs" element={<FAQsPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/privacy" element={<PrivacyPolicyPage />} />
        <Route path="/cookie-policy" element={<CookiePolicyPage />} />
        <Route path="/disclaimer" element={<DisclaimerPage />} />
        
        {/* User Profile */}
        <Route 
          path="/profile" 
          element={
            <AuthGuard requireAuth>
              <ProfilePage />
            </AuthGuard>
          } 
        />
        
        {/* Dashboard Routes */}
        <Route 
          path="/dashboard" 
          element={
            <AuthGuard requireAuth requireRole="owner">
              <DashboardPage />
            </AuthGuard>
          } 
        />
        <Route 
          path="/dashboard/bookings" 
          element={
            <AuthGuard requireAuth requireRole="owner">
              <DashboardBookingsPage />
            </AuthGuard>
          } 
        />
        <Route 
          path="/dashboard/reviews" 
          element={
            <AuthGuard requireAuth requireRole="owner">
              <DashboardReviewsPage />
            </AuthGuard>
          } 
        />
        <Route 
          path="/dashboard/stats" 
          element={
            <AuthGuard requireAuth requireRole="owner">
              <DashboardStatsPage />
            </AuthGuard>
          } 
        />
        <Route 
          path="/dashboard/settings" 
          element={
            <AuthGuard requireAuth requireRole="owner">
              <DashboardSettingsPage />
            </AuthGuard>
          } 
        />
        <Route 
          path="/dashboard/content" 
          element={
            <AuthGuard requireAuth requireRole="owner">
              <DashboardContentPage />
            </AuthGuard>
          } 
        />
      </Routes>
    </div>
  );
}

export default App;