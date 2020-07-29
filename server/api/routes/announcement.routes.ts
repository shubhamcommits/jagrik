import express, { Request } from 'express'
import { AnnouncementController } from "../controllers";
import multer from 'multer';

// Multer Middleware
const upload = multer({
    dest: '../../uploads',
    filename: (req: Request, file: any, cb: any) => {
      const ext = file.mimetype.split('/')[1]
      cb(null, `Announcement-${req.headers.authorization}-${Date.now()}.${ext}`)
    },
  })

// Announcement Controller with all the functions
const announcementController = new AnnouncementController();

// Routes List
const routes = express.Router();

routes.post('/create-announcement',upload.single('announcement_doc'), announcementController.createAnnouncement);

routes.get('/get-class-announcements', announcementController.getAnnouncements);

routes.put('/edit-announcement',upload.single('announcement_doc'), announcementController.editAnnouncement);

routes.delete('/delete-announcement', announcementController.deleteAnnouncement);

/*  ===================
 *  -- EXPORT ROUTES --
 *  ===================
 * */
export { routes as announcementRoutes }