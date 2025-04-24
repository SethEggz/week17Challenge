import { Router } from 'express';
const router = Router();
import {
getAllThoughts,
getThoughtById,
createThought,
updateThought,
deleteThought,
} from '../../controllers/thoughtController.js';


// /api/courses
router.route('/').get().post();

// /api/courses/:courseId
router
  .route('/:getThoughtById')
  .get(getAllThoughts)
  .get(getThoughtById)
  .post(createThought)
  .put(updateThought)
  .delete(deleteThought);
  
 

export { router as thoughtRouter };
