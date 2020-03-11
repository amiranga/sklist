import * as express from 'express';

import SchoolCtrl from './controllers/school';

function setRoutes(app) {
  const router = express.Router();
  const schoolCtrl = new SchoolCtrl();

  router.route('/schools').get(schoolCtrl.getAll);
  router.route('/schools/count').get(schoolCtrl.count);
  router.route('/school').post(schoolCtrl.insert);
  router.route('/school/:id').get(schoolCtrl.get);
  router.route('/school/:id').put(schoolCtrl.update);
  router.route('/school/:id').delete(schoolCtrl.delete);

  // Apply the routes to our applischoolion with the prefix /api
  app.use('/api', router);

}

export default setRoutes;
