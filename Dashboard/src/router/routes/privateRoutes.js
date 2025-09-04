import { adminRoutes } from "./adminRouter";
import { sellerRoutes } from "./sellerRoutes";

export const privateRoutes = [
    ...adminRoutes,
    ...sellerRoutes
]