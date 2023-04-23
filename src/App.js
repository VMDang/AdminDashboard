import React from "react";
import {BrowserRouter, Router, Route, Routes} from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { FiSettings} from "react-icons/fi";
import { TooltipComponent} from "@syncfusion/ej2-react-popups";

import { Navbar, Footer, Sidebar, ThemeSetting } from "./components";
import { Ecommerce, Orders, Calendar, Employees, Stacked, Pyramid, Customers,
    Kanban, Pie, Line, Area, Bar, Financial, ColorMapping, ColorPicker, Editor} from "./pages";

import './App.css'
const App = () => {
    const activeMenu = true;

    return (
        <HelmetProvider>
            <Helmet>
                <title>Dashboard</title>
            </Helmet>

            <div>
                <BrowserRouter>
                    <div className= "flex relative dark:bg-main-dark-ng">
                        <div className="fixed right-4 bottom-4" style={{zIndex: '1000'}}>
                            <TooltipComponent content="Settings" position="Top">
                                <button type={"button"} className={"text-3xl p-3 hover:drop-shadow-xl " +
                                    "hover:bg-light-gray text-white"} style={{ background: 'blue', borderRadius: '50%'}}>
                                    <FiSettings/>
                                </button>
                            </TooltipComponent>
                        </div>
                        {activeMenu ? (
                            <div className={"w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white"}>
                                <Sidebar />
                            </div>
                        ) : (
                            <div className={"w-0 dark:bg-secondary-dark-bg"}>
                                <Sidebar />
                            </div>
                        )}
                        <div className={
                            `dark:bg-main-bg bg-main-bg min-h-screen w-full ${ activeMenu ? "md:ml-72" : "flex-2" }`}>
                            <div className={"fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full"}>
                                <Navbar />
                            </div>
                            <div>
                                <Routes>
                                    {/* Dashboard Routes */}
                                    <Route path={"/"} element={<Ecommerce/>} />
                                    <Route path={"/ecommerce"} element={<Ecommerce/>} />

                                    {/* Pages Routes */}
                                    <Route path={"/orders"} element={<Orders/>} />
                                    <Route path={"/employees"} element={<Employees/>} />
                                    <Route path={"/customers"} element={<Customers/>} />

                                    {/* App Routes */}
                                    <Route path={"/kanban"} element={<Kanban/>} />
                                    <Route path={"/editor"} element={<Editor/>} />
                                    <Route path={"/calendar"} element={<Calendar/>} />
                                    <Route path={"/color-picker"} element={<ColorPicker/>} />

                                    {/*  Charts Routes  */}
                                    <Route path={"/line"} element={<Line/>} />
                                    <Route path={"/area"} element={<Area/>} />
                                    <Route path={"/bar"} element={<Bar/>} />
                                    <Route path={"/pie"} element={<Pie/>} />
                                    <Route path={"/financial"} element={<Financial/>} />
                                    <Route path={"/color-mapping"} element={<ColorMapping/>} />
                                    <Route path={"/pyramid"} element={<Pyramid/>} />
                                    <Route path={"/stacked"} element={<Stacked/>} />

                                </Routes>
                            </div>
                        </div>
                    </div>
                </BrowserRouter>
            </div>
        </HelmetProvider>
    )
};

export default App