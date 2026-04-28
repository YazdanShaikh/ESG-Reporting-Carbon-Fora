import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/websitePartials/Header";
import FooterTwo from "../components/websitePartials/Footer";
import Loading from "../components/Loading";

const website = () => {
    return (
        <>  <div className="min-h-screen bg-white">

            <Header />
            <Suspense fallback={<Loading />}>
                <Outlet />
            </Suspense>
            <FooterTwo />
        </div>
        </>
    );
};

export default website;