import { authRoutes } from './auth.routes';
import { classRoutes } from './class.routes';
import { userRoutes } from './user.routes';
import { teamRoutes } from './team.routes';

/*  =====================
 *  -- EXPORTS ROUTES --
 *  =====================
 * */
export {

  // AUTH
  authRoutes as authsRoutes,
  
  // CLASS
  classRoutes as classRoutes,

  // TEAM
  teamRoutes as teamRoutes,

  // USER
  userRoutes as userRoutes

}
