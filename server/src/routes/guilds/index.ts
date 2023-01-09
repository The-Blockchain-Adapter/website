import { Router } from "express";
import { isAuthenticated } from "../../utils/middlewares";
import { getGuildsController } from "../../controllers/guilds";
const router = Router();

router.get("/", isAuthenticated, getGuildsController, (req, res) => {
	res.send(200);
});

export default router;
