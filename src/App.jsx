import { Outlet, Navigate, Route, Routes, useLocation } from "react-router-dom";
import { Footer, Navbar } from "./components";
import { About, AuthPage, Companies, CompanyProfile, FindJobs, JobDetail, UploadJob, UserProfile } from "./pages";
import { useSelector } from "react-redux";

// Layout component to handle protected routes
// function Layout() {
//   const user = useSelector((state) => state.user.user); // Updated selector to access user object correctly
//   const location = useLocation();

//   return user?.token ? (
//     <Outlet />
//   ) : (
//     <Navigate to='/user-auth' state={{ from: location }} replace />
//   );
// }

function App() {
  return (
    <main className='bg-[#f7fdfd]'>
      <Navbar />
      <Routes>
        {/* Protected routes */}
        <Route>
          <Route path='/' element={<Navigate to='/find-jobs' replace />} />
          <Route path='/find-jobs' element={<FindJobs />} />
          <Route path='/companies' element={<Companies />} />
          <Route path='/user-profile' element={<UserProfile />} />
          <Route path='/company-profile' element={<CompanyProfile />} />
          <Route path='/upload-job' element={<UploadJob />} />
          <Route path='/job-detail/:id' element={<JobDetail />} />
        </Route>
        {/* Public routes */}
        <Route path='/about-us' element={<About />} />
        <Route path='/user-auth' element={<AuthPage />} />
      </Routes>
      <Footer />
    </main>
  );
}

export default App;
