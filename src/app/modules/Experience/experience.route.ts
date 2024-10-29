import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { ExperienceControllers } from './experience.controller';
import { experienceValidations } from './experience.validation';

const router = express.Router();

router.post(
  '/create-experience',
  validateRequest(experienceValidations.createExperienceValidationSchema),
  ExperienceControllers.createExperience,
);

router.patch(
  '/:id',
  validateRequest(experienceValidations.updateExperienceValidationSchema),
  ExperienceControllers.updateExperience,
);

router.get(
  '/',
  ExperienceControllers.getAllExperiences,
);

router.delete(
  '/:id',
  ExperienceControllers.deleteExperience,
);

export const ExperienceRoutes = router;
