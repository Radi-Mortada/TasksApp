/**
 *
 * Asynchronously loads the component for TaskCard
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
