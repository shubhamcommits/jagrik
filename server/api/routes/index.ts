import { authRoutes } from './auth.routes';
import { classRoutes } from './class.routes';
import { userRoutes } from './user.routes';
import { taskRoutes } from './task.routes';
import { teamRoutes } from './team.routes';
import { announcementRoutes } from './announcement.routes';
import {bonusTaskRoutes} from './bonus_task.routes';

/*  =====================
 *  -- EXPORTS ROUTES --
 *  =====================
 * */
export {

  // AUTH
  authRoutes as authsRoutes,
  
  // CLASS
  classRoutes as classRoutes,

  // TASK
  taskRoutes as taskRoutes,

  // TEAM
  teamRoutes as teamRoutes,

  // USER
  userRoutes as userRoutes,

  // ANNOUNCEMENT
  announcementRoutes as announcementRoutes,

  //Bonus Task
  bonusTaskRoutes as bonusTaskRoutes

}
