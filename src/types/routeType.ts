import { RoutePath } from "./enum";

export interface IRoute {
  path: RoutePath | String;
  element: Element;
}