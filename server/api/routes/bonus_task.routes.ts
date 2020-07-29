import express, { Request } from 'express'
import { BonusTaskController } from "../controllers";
import multer from 'multer';

// Multer Middleware
const upload = multer({
    dest: '../../uploads',
    filename: (req: Request, file: any, cb: any) => {
      const ext = file.mimetype.split('/')[1]
      cb(null, `BonusTask-${req.headers.authorization}-${Date.now()}.${ext}`)
    },
  })

// BonusTask Controller with all the functions
const bonusTaskController = new BonusTaskController();

// Routes List
const routes = express.Router();

routes.post('/create-bonus-task',bonusTaskController.createBonusTask);

routes.post('/assign-user-bonus-task', bonusTaskController.assignUserBonusTask);

routes.post('/user-submit-bonus-task',upload.single('supporting_doc'),bonusTaskController.assignUserBonusTask);

routes.get('/get-class-bonus-tasks', bonusTaskController.getBonusTasks);

routes.put('/edit-bonus-task', bonusTaskController.editBonusTask);

routes.delete('/delete-bonus-task', bonusTaskController.deleteBonusTask);


/*  ===================
 *  -- EXPORT ROUTES --
 *  ===================
 * */
export { routes as bonusTaskRoutes }