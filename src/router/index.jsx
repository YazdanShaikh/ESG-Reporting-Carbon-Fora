// import authRoutes from "./auth";
// import { Suspense, useEffect } from "react";
// import { Route, Routes, Navigate, useLocation } from "react-router-dom";
// import Layout from "../layout/Layout";
// import Website from "../layout/Website";
// import dashboardRoutes from "./dashboard";
// import websiteRoutes from "./website";

// const AppRoutes = () => {
//   const { pathname } = useLocation();

//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, [pathname]);

//   return (
//     <Routes>

//       {/* WEBSITE ROUTES */}
//       <Route path="/" element={<Website />}>

//         {/* 🔥 Redirect root "/" to auth home */}
//         <Route index element={<Navigate to="/home" replace />} />

//         {websiteRoutes.map(({ path, Element, index, key }) => (
//           <Route path={path} element={<Element />} index={index} key={key} />
//         ))}
//       </Route>

//       {/* AUTH ROUTES */}
//       {authRoutes.map(({ path, Element, index, key }) => (
//         <Route
//           path={path}
//           element={
//             <Suspense fallback={<div>Loading...</div>}>
//               <Element />
//             </Suspense>
//           }
//           index={index}
//           key={key}
//         />
//       ))}

//       {/* DASHBOARD ROUTES */}
//       <Route path="/dashboard" element={<Layout />}>
//         {dashboardRoutes.map(({ path, Element, index, key }) => (
//           <Route path={path} element={<Element />} index={index} key={key} />
//         ))}
//       </Route>

//     </Routes>
//   );
// };

// export default AppRoutes;

import authRoutes from "./auth";
import { Suspense, useEffect } from "react";
import { Route, Routes, Navigate, useLocation  } from "react-router-dom";
import Layout from "../layout/Layout";
import Website from "../layout/Website";
import dashboardRoutes from "./dashboard";
import websiteRoutes from "./website";

const AppRoutes = () => {
  const { pathname } = useLocation();


  useEffect(() => {
    window.scrollTo(0, 0); // always scroll to top
  }, [pathname]);

  return (
    <Routes>
      <Route path="/" element={<Website />}>
        {websiteRoutes.map(({ path, Element, index, key }) => (
          <Route path={path} element={<Element />} index={index} key={key} />
        ))}
      </Route>


      {authRoutes.map(({ path, Element, index, key }) => (
        <Route
          path={path}
          element={
            <Suspense>
              <Element />
            </Suspense>
          }
          index={index}
          key={key}
        />
      ))}

      <Route path="/dashboard" element={<Layout />}>
        {dashboardRoutes.map(({ path, Element, index, key }) => (
          <Route path={path} element={<Element />} index={index} key={key} />
        ))}
      </Route>
    </Routes>
  );
};

export default AppRoutes;
