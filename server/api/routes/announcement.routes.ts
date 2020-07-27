import express from "express";
import { AnnouncementController } from "../controllers";

// Announcement Controller with all the functions
const announcementController = new AnnouncementController();

// Routes List
const routes = express.Router();

routes.post('/create-announcement', announcementController.createAnnouncement);

routes.get('/get-class-announcements', announcementController.getAnnouncements);

routes.put('/edit-announcement', announcementController.editAnnouncement);

routes.delete('/delete-announcement', announcementController.deleteAnnouncement);

/*  ===================
 *  -- EXPORT ROUTES --
 *  ===================
 * */
export { routes as announcementRoutes }