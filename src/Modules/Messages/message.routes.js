import { Router } from "express";
import { isAuth } from "../../middelware/auth.js";
import { asynchandler } from "../../units/errorhandling.js";
const router = Router()

import * as mc from "./message.controller.js"

router.post('/', asynchandler(mc.SendMessage))
router.get('/',isAuth() , asynchandler(mc.getAllMessage))

export default router