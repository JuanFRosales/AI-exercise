import express from 'express';
import {body} from 'express-validator';
import {validate} from '../../middlewares';
import { AiImage } from '../controllers/imageController';


const router = express.Router();

router.route('/').post(body('text').notEmpty().escape(), validate, AiImage) ;

export default router;