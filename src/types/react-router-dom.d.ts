// Override the old React Router v5 types with v6 types
declare module "react-router-dom" {
  export * from "react-router";
  export { default as BrowserRouter } from "react-router-dom/BrowserRouter";
  export { default as HashRouter } from "react-router-dom/HashRouter";
  export { default as Link } from "react-router-dom/Link";
  export { default as NavLink } from "react-router-dom/NavLink";
  export { default as Navigate } from "react-router-dom/Navigate";
  export { default as Outlet } from "react-router-dom/Outlet";
  export { default as Route } from "react-router-dom/Route";
  export { default as Router } from "react-router-dom/Router";
  export { default as Routes } from "react-router-dom/Routes";
  export { default as useLocation } from "react-router-dom/useLocation";
  export { default as useNavigate } from "react-router-dom/useNavigate";
  export { default as useParams } from "react-router-dom/useParams";
  export { default as useSearchParams } from "react-router-dom/useSearchParams";
}
